import type { UniverseCardConfig } from "./types";

const config: UniverseCardConfig = {
  svgFile: "anime_puwf_one_piece_visible.svg",

  placeholders: {
    "[ User Name ]": (r) => r.userName.toUpperCase(),
    "[ Name ]":      (r) => r.userName.toUpperCase(),
    "[ Devil Fruit Ability ]": (r) => r.outcome,
    "[ ?,???,???,??? ]": (r) => r.rank || "Unknown",
    "DEAD OR ALIVE": (r) =>
      r.favCharacter ? `RIVAL TO ${r.favCharacter.toUpperCase()}` : "DEAD OR ALIVE",
  },

  imageRect: { x: 130, y: 178, w: 420, h: 310, rx: 4 },
  outcomes: {
    logia: [
      "Mera Mera no Mi", "Magu Magu no Mi", "Hie Hie no Mi", "Pika Pika no Mi", "Goro Goro no Mi", 
      "Moku Moku no Mi", "Suna Suna no Mi", "Yami Yami no Mi", "Mori Mori no Mi", "Yuki Yuki no Mi", 
      "Numa Numa no Mi", "Gasu Gasu no Mi"
    ],
    paramecia: [
      "Gomu Gomu no Mi", "Ope Ope no Mi", "Ito Ito no Mi", "Jiki Jiki no Mi", "Mero Mero no Mi", 
      "Mochi Mochi no Mi", "Hana Hana no Mi", "Yomi Yomi no Mi", "Bara Bara no Mi", "Bari Bari no Mi", 
      "Toshi Toshi no Mi", "Noro Noro no Mi", "Supa Supa no Mi", "Doru Doru no Mi", "Bomu Bomu no Mi", 
      "Kilo Kilo no Mi", "Ton Ton no Mi", "Horo Horo no Mi", "Kage Kage no Mi", "Suke Suke no Mi", 
      "Nikyu Nikyu no Mi", "Oshi Oshi no Mi", "Baku Baku no Mi", "Mane Mane no Mi", "Awa Awa no Mi", 
      "Sabi Sabi no Mi", "Shari Shari no Mi", "Ato Ato no Mi", "Nagi Nagi no Mi", "Gura Gura no Mi", 
      "Zushi Zushi no Mi", "Bisu Bisu no Mi", "Pero Pero no Mi", "Bata Bata no Mi", "Hoya Hoya no Mi", 
      "Kuku Kuku no Mi", "Mira Mira no Mi", "Soru Soru no Mi", "Memo Memo no Mi", "Shibo Shibo no Mi", 
      "Tama Tama no Mi", "Netsu Netsu no Mi", "Kibi Kibi no Mi", "Kobu Kobu no Mi", "Ori Ori no Mi", 
      "Woshu Woshu no Mi", "Chiyu Chiyu no Mi", "Fuku Fuku no Mi", "Jake Jake no Mi", "Guru Guru no Mi", 
      "Beta Beta no Mi", "Hobi Hobi no Mi", "Sui Sui no Mi", "Pamu Pamu no Mi", "Ishi Ishi no Mi", 
      "Nui Nui no Mi", "Giro Giro no Mi", "Hira Hira no Mi", "Deka Deka no Mi", "Gocha Gocha no Mi", 
      "Buku Buku no Mi", "Kira Kira no Mi", "Maki Maki no Mi", "Raki Raki no Mi", "Kachi Kachi no Mi", 
      "Nemu Nemu no Mi", "Goru Goru no Mi", "Gasha Gasha no Mi", "Modo Modo no Mi", "Uta Uta no Mi", 
      "More More no Mi", "Mini Mini no Mi", "Batto Batto no Mi, Model: Vampire", "Goe Goe no Mi", 
      "Pasa Pasa no Mi", "Toro Toro no Mi", "Ame Ame no Mi", "Noko Noko no Mi"
    ],
    zoan: [
      "Hito Hito no Mi", "Hito Hito no Mi, Model: Nika", "Hito Hito no Mi, Model: Daibutsu", 
      "Hito Hito no Mi, Model: Onyudo", "Ushi Ushi no Mi, Model: Bison", "Ushi Ushi no Mi, Model: Giraffe", 
      "Tori Tori no Mi, Model: Falcon", "Tori Tori no Mi, Model: Phoenix", "Tori Tori no Mi, Model: Eagle", 
      "Inu Inu no Mi, Model: Dachshund", "Inu Inu no Mi, Model: Jackal", "Inu Inu no Mi, Model: Wolf", 
      "Inu Inu no Mi, Model: Okuchi no Makami", "Neko Neko no Mi, Model: Leopard", "Neko Neko no Mi, Model: Saber Tiger", 
      "Zou Zou no Mi", "Sara Sara no Mi, Model: Axolotl", "Kame Kame no Mi", "Uma Uma no Mi", 
      "Ryu Ryu no Mi, Model: Allosaurus", "Ryu Ryu no Mi, Model: Brachiosaurus", "Ryu Ryu no Mi, Model: Pteranodon", 
      "Ryu Ryu no Mi, Model: Spinosaurus", "Ryu Ryu no Mi, Model: Pachycephalosaurus", "Ryu Ryu no Mi, Model: Triceratops", 
      "Uo Uo no Mi, Model: Azure Dragon", "Hebi Hebi no Mi, Model: Anaconda", "Hebi Hebi no Mi, Model: King Cobra", 
      "Hebi Hebi no Mi, Model: Yamata no Orochi", "Kumo Kumo no Mi, Model: Rosamygale Grauvogeli"
    ]
  },
  basicOutcomes: [
    "Gomu Gomu no Mi", "Bara Bara no Mi", "Ope Ope no Mi", "Bomu Bomu no Mi", 
    "Kilo Kilo no Mi", "Hana Hana no Mi", "Doru Doru no Mi", "Moku Moku no Mi"
  ],
  generateRank: (tier: number) => {
    let bounty = 0;
    if (tier === 1) bounty = Math.floor(Math.random() * 50000);
    else if (tier === 2) bounty = Math.floor(Math.random() * 4950000) + 50000;
    else if (tier === 3) bounty = Math.floor(Math.random() * 45000000) + 5000000;
    else if (tier === 4) bounty = Math.floor(Math.random() * 250000000) + 50000000;
    else if (tier === 5) bounty = Math.floor(Math.random() * 700000000) + 300000000;
    return `${bounty.toLocaleString()} Berries`;
  },
};

export default config;
