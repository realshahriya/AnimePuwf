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
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Submit a result. If the same handle+universe already exists, updates it instead of inserting a duplicate. */
export async function submitResult(
  supabase: SupabaseClient, 
  row: Omit<PuwfResultRow, "id" | "created_at">
) {
  try {
    if (row.handle) {
      // Named user: upsert so same handle+universe is always one row
      const { error } = await supabase
        .from("puwf_results")
        .upsert([row], { onConflict: "handle,universe", ignoreDuplicates: false });
      if (error) console.warn("[Supabase] upsert failed:", error.message);
    } else {
      // Anonymous (no handle): always insert a fresh row
      const { error } = await supabase.from("puwf_results").insert([row]);
      if (error) console.warn("[Supabase] insert failed:", error.message);
    }
  } catch (e) {
    console.warn("[Supabase] submitResult error:", e);
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
