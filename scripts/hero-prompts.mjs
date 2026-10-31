// Prompts de las ilustraciones de cabecera (ver art/heroes/ESTILO.md).
// Uso: node scripts/hero-prompts.mjs   -> escribe art/heroes/prompts.json
import fs from "node:fs/promises";
import { scenes } from "../content/scenes.mjs";

const STYLE =
  "Stylized hand-painted look of a contemporary episodic narrative adventure game: simplified 3D forms with hand-painted gouache and watercolor textures, soft flat shading, low-detail brushwork with visible strokes, slightly simplified friendly faces with natural proportions (not anime, not photorealistic, not hyper-detailed concept art), gentle cinematic color grading, soft diffused light and gentle bloom around lamps, airy watercolor gradients in sky and mist, quiet intimate everyday atmosphere.";
const PALETTE =
  "Palette: muted slate-blue night (#0c121b, #24364a), warm sodium amber light (#f2a948), small cyan accents (#62d6cf), rust tones (#b85c3c); saturation kept low except at light sources.";
const COMPOSITION =
  "Composition: the left 40% of the frame stays calm and dark (misty sky, wall, shadow or distant silhouettes) for a headline; the subject sits in the right half; horizon in the lower third; characters full body at human scale. No text, no letters, no logos, no watermark, no border.";

const PLACES = {
  periphery:
    "a rusted industrial periphery of a ruined city at dusk turning to night: an elevated rail viaduct, tall brick smokestacks, small workshops with warm amber windows and a dark still canal reflecting the lights",
  foundry:
    "a furnace district at night: glowing molten metal pouring in the distance, steel catwalks, cranes and orange heat haze",
  flooded:
    "a flooded neighbourhood at night: walkways over still black water, leaning radio antennas, lamp reflections and light drizzle",
  citadel:
    "a corporate citadel at night: a monumental stone gate with a brass circular emblem, dark hanging banners, thin cyan window strips and a wet plaza with mist",
  network:
    "the core of a machine network: an enormous circular aperture, server towers with thin cyan and red light strips, heavy cables and a metal deck",
  dawn: "an open horizon at dusk: a distant spired city skyline in silhouette and an empty rail line fading into the dark",
};

const PORTADOR =
  "a young man with messy black hair in a long dark brown leather coat with brass buttons and a grey scarf, a faint cyan glow line along his cheek";
const CAST = {
  builder: "a small worker in a yellow hooded coat and gas mask carrying a wrench",
  guardian: "a guardian in heavy scuffed armor with a tall riot shield painted with a gear emblem",
  ranger: "a scout in a grey hooded cloak with a cyan visor and a long rifle",
  medic: "a medic in a white coat with a red cross carrying a med kit",
  civilian: "a traveler in a brown hood, scarf and heavy backpack",
  drone: "a small white hovering medical drone with a cyan eye and claw arms",
  artillero: "a gunner carrying a heavy launcher on the shoulder, gas mask and red scarf",
  saboteador: "a saboteur in a gas mask with red eyes and a red armband with a gear",
  recaudador:
    "the Collector, a huge copper crab-like machine on tank treads with a glowing cyan core and hydraulic pincers",
  caldera:
    "Saint Cauldron, a furnace machine on spider legs with a glowing orange belly and smoking chimneys",
  coro: "the Sunken Choir, a spider-like machine with a teal glass dome and brass gramophone horns emitting visible sound waves",
  prefecto:
    "the Prefect, a dark-haired man in ceremonial white and gold armor with a red cape, a tall shield and a red energy blade",
  madre:
    "Mother Zero, a pale woman with very long white hair in torn white robes, red filament threads floating around her",
};

// Sujeto de cada cabecera, en el orden de content/scenes.mjs.
const SUBJECTS = {
  home: `seen from behind, ${PORTADOR}, standing on the quay looking at the city beside a tall old street lamp; further right ${CAST.guardian}; behind them ${CAST.builder}. Quiet, hopeful mood despite the decay`,
  universe: `${PORTADOR}, facing the viewer in front of the great aperture, with ${CAST.drone} hovering at his shoulder. Solemn, awe-struck mood`,
  journal: `a cluttered repair workshop corner under a street lamp, ${CAST.builder} kneeling to fix a machine among crates and cable spools. Warm, patient mood`,
  roadmap: `a small service train waiting at a lonely platform, ${CAST.civilian} standing at the edge watching the tracks curve away into the city`,
  wiki: `${CAST.ranger} on a ledge studying the citadel through his scope next to a hand-painted warning sign`,
  music: `a lone street lamp over the water with ${CAST.drone} hovering beside an old radio speaker, faint sound rings rippling on the water. Melancholic, musical mood`,
  community: `a refuge of patched canvas tents around a small fire, ${CAST.civilian}, ${CAST.medic} and ${CAST.builder} sharing a meal and talking. Warm, communal mood`,
  contact: `a tall signal repeater tower with a blinking light, ${CAST.ranger} keeping watch at its base with a radio`,
  press: `${PORTADOR}, in profile on a high terrace overlooking the citadel gate, coat moving in the wind`,
  privacy: `a dormant colony power core on the deck, ${CAST.drone} scanning it with a soft cyan beam`,
  lost: `a single lit street lamp and a warning sign at the end of an interrupted rail line, no people. Lonely but gentle mood`,
  "first-steps": `${PORTADOR}, arriving at an empty shelter among salvaged scrap and crates, setting down his bag`,
  "day-night": `night defense: a reinforced barricade wall and a small automatic turret guarding a canal walkway under a lamp, tense calm before an attack`,
  core: `${CAST.builder} assembling a glowing colony power core with exposed copper coils`,
  defenses: `${CAST.guardian} bracing behind a riveted defensive wall next to a mounted turret, sparks in the air`,
  units: `five colony members lined up shoulder to shoulder on the quay: ${CAST.ranger}, ${CAST.guardian}, ${CAST.builder}, ${CAST.medic} and ${CAST.saboteador}`,
  portals: `a squad advancing toward a glowing breach portal: ${CAST.artillero}, ${CAST.guardian} and ${CAST.ranger}`,
  upgrades: `${PORTADOR}, mid-swing with a short blade leaving a cyan arc of light, ${CAST.drone} following him`,
  operations: `${CAST.civilian} waiting with bundles beside a small cargo train at a station platform, an evacuation about to begin`,
  collector: `${CAST.recaudador} lunging with its pincers in a rail depot, sparks flying; a small figure in a dark coat far in the right foreground for scale. Threatening mood`,
  furnace: `${CAST.caldera} breathing a jet of flame across a catwalk. Threatening mood`,
  choir: `${CAST.coro} standing in shallow water, its horns sending rings of sound across the canal. Eerie mood`,
  prefect: `${CAST.prefecto} lunging forward with his red blade before the citadel gate. Cold, imposing mood`,
  mother: `${CAST.madre} floating at the center of the network core, her red filaments reaching toward the towers. Haunting mood`,
  controls: `${PORTADOR}, facing the viewer in a ready stance next to a weathered sign, as if waiting for the player's first move`,
  cooperative: `${PORTADOR} and ${CAST.ranger} side by side on the deck, about to cross a narrow bridge together`,
  "living-city": `a living street: an abandoned car, rusted barrels and ${CAST.civilian} walking past, steam rising from vents`,
  walking: `${PORTADOR}, walking in profile along the waterfront, coat and scarf swaying with his stride`,
  "boss-language": `five hostile machines and figures lined up before the gate like a rogues' gallery: ${CAST.recaudador}; ${CAST.caldera}; ${CAST.coro}; ${CAST.prefecto}; ${CAST.madre}`,
  "project-state": `a half-built colony: a finished power core, a section of wall still in scaffolding, scrap piles and ${CAST.builder} taking a break`,
  "first-commit": `seen from behind and small in the frame, ${PORTADOR}, standing beside a single street lamp at the very beginning of the journey`,
  wanderer: `a skinny stalking robot and a small quadruped runner robot prowling along a catwalk, red sensor lights`,
  "rail-arena": `a service train arriving at the citadel beside a tall signal repeater, headlights cutting through mist`,
  "five-chapters": `a train crossing a long bridge toward the final station deep in the network, a route of five lit stations behind it`,
  "story-faces": `${CAST.medic} tending to ${CAST.civilian} on a bench while ${CAST.drone} hovers nearby. Tender mood`,
  "approved-art": `${PORTADOR} and ${CAST.prefecto} facing each other across a wet plaza, blades drawn. Tense duel mood`,
};

const prompts = Object.entries(scenes).map(([route, scene]) => {
  const subject = SUBJECTS[scene.key];
  if (!subject) throw new Error("Missing hero subject for " + scene.key);
  const night = scene.night ? " Deep night, darker than usual." : "";
  return {
    key: scene.key,
    route,
    prompt: `${STYLE} Scene: ${PLACES[scene.zone]}. ${subject}.${night} ${PALETTE} ${COMPOSITION}`,
  };
});
await fs.writeFile("art/heroes/prompts.json", JSON.stringify(prompts, null, 2) + "\n");
console.log(`Wrote ${prompts.length} hero prompts.`);
