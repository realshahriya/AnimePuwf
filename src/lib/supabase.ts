import { SupabaseClient } from "@supabase/supabase-js";

// ── Typed row ──────────────────────────────────────────────────────────────────

export interface PuwfResultRow {
  id?: string;
  created_at?: string;
  universe: string;
  user_name: string;
  handle?: string;        // X / Telegram handle — used as user identifier
  result_class: string;
  outcome: string;
  rank?: string;
  trivia_score?: number;
  trivia_total?: number;
  tier?: number;
  user_image?: string;   // Base64 or public URL
  bounty?: number;       // Referral bonus tracking
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Submit a result. If the same handle+universe already exists, updates it instead of inserting a duplicate. */
export async function submitResult(
  supabase: SupabaseClient, 
  row: Omit<PuwfResultRow, "id" | "created_at">
): Promise<{ success: boolean; error?: string }> {
  try {
    const table = supabase.from("puwf_results");
    let query;

    if (row.handle) {
      // Named user: upsert so same handle+universe is always one row
      // REQUIREMENT: the table must have a unique constraint on (handle, universe)
      query = table.upsert([row], { 
        onConflict: "handle,universe", 
        ignoreDuplicates: false 
      });
    } else {
      // Anonymous (no handle): always insert a fresh row
      query = table.insert([row]);
    }

    const { error } = await query;
    
    if (error) {
      console.error("[Supabase] Submission failed:", error.message, error.details);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("[Supabase] submitResult exception:", msg);
    return { success: false, error: msg };
  }
}

/**
 * Look up a user's most recent result by handle + universe.
 * Returns null if not found. Used to offer "Load Previous" on the quiz.
 */
export async function fetchByHandle(
  supabase: SupabaseClient,
  handle: string,
  universe: string
): Promise<PuwfResultRow | null> {
  try {
    const { data, error } = await supabase
      .from("puwf_results")
      .select("*")
      .eq("universe", universe)
      .ilike("handle", handle.replace(/^@/, ""))  // strip @ if present
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) { console.warn("[Supabase] fetchByHandle:", error.message); return null; }
    return data ?? null;
  } catch {
    return null;
  }
}

/** Fetch the latest N results across all universes. */
export async function fetchGlobalLeaderboard(
  supabase: SupabaseClient, 
  limit = 50
): Promise<PuwfResultRow[]> {
  const { data, error } = await supabase
    .from("puwf_results")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) { console.warn("[Supabase] fetchGlobalLeaderboard:", error.message); return []; }
  return data ?? [];
}

/** Fetch results filtered by universe. */
export async function fetchUniverseLeaderboard(
  supabase: SupabaseClient, 
  universe: string, 
  limit = 50
): Promise<PuwfResultRow[]> {
  const { data, error } = await supabase
    .from("puwf_results")
    .select("*")
    .eq("universe", universe)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) { console.warn("[Supabase] fetchUniverseLeaderboard:", error.message); return []; }
  return data ?? [];
}

/** Fetch top outcomes across all universes. */
export async function fetchTrendingAbilities(
  supabase: SupabaseClient, 
  limit = 100
): Promise<Pick<PuwfResultRow, "universe" | "outcome">[]> {
  const { data, error } = await supabase
    .from("puwf_results")
    .select("universe, outcome")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) { console.warn("[Supabase] fetchTrendingAbilities:", error.message); return []; }
  return (data ?? []) as Pick<PuwfResultRow, "universe" | "outcome">[];
}

/** 
 * Upload a profile image to the 'users' storage bucket.
 * Returns the public URL of the uploaded image.
 */
export async function uploadUserImage(
  supabase: SupabaseClient,
  handle: string,
  dataUrl: string
): Promise<string | null> {
  try {
    const cleanHandle = handle.replace(/^@/, "");
    const fileName = `${cleanHandle}.jpg`;
    
    // Convert dataUrl to a Blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    // Upload with upsert=true so the same handle always overwrites its own image
    const { error: uploadError } = await supabase.storage
      .from("users")
      .upload(fileName, blob, {
        contentType: "image/jpeg",
        upsert: true
      });

    if (uploadError) {
      console.error("[Supabase Storage] Upload failed:", uploadError.message);
      return null;
    }

    const { data } = supabase.storage.from("users").getPublicUrl(fileName);
    return data.publicUrl;
  } catch (err) {
    console.error("[Supabase Storage] Exception:", err);
    return null;
  }
}

/** 
 * Rewards a user for a successful referral by adding 10,000 to their bounty.
 */
export async function rewardBounty(
  supabase: SupabaseClient,
  referrerHandle: string
): Promise<boolean> {
  try {
    const cleanHandle = referrerHandle.replace(/^@/, "");
    
    // 1. Fetch the user's most recent global record to get current bounty
    const { data: records, error: fetchErr } = await supabase
      .from("puwf_results")
      .select("*")
      .ilike("handle", cleanHandle)
      .order("created_at", { ascending: false })
      .limit(1);

    if (fetchErr || !records || records.length === 0) {
      console.warn(`[Bounty] Referrer @${cleanHandle} not found. Cannot reward.`);
      return false;
    }

    const latestRecord = records[0] as PuwfResultRow;
    const currentBounty = latestRecord.bounty || 0;
    const newBounty = currentBounty + 10000;

    // 2. Update the bounty on their specific most recent universe record
    const { error: updateErr } = await supabase
      .from("puwf_results")
      .update({ bounty: newBounty })
      .eq("handle", latestRecord.handle)
      .eq("universe", latestRecord.universe);

    if (updateErr) {
      console.error("[Bounty] Update failed:", updateErr.message);
      return false;
    }

    console.log(`[Bounty] Success! Placed 10k bounty on @${cleanHandle}.`);
    return true;
  } catch (err) {
    console.error("[Bounty] Exception rewarding:", err);
    return false;
  }
}
