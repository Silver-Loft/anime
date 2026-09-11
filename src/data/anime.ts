/* ------------------------------------------------------------------ */
/*  Parsed AniDB HTTP API record — anime aid=1                          */
/*  "Seikai no Monshou" / Crest of the Stars (1999)                    */
/* ------------------------------------------------------------------ */

export const RECORD = {
  anidbId: 1,
  mainTitle: "Seikai no Monshou",
  enTitle: "Crest of the Stars",
  jaTitle: "星界の紋章",
  csTitle: "Hvězdný erb",
  zhTitle: "星界之纹章",
  shortEn: "CotS",
  shortJat: "SnM",
  type: "TV Series",
  episodeCount: 13,
  startDate: "1999-01-03",
  endDate: "1999-03-28",
  year: 1999,
  officialUrl: "http://www.sunrise-inc.co.jp/seikai/",
  studio: "Sunrise",
  description:
    "Linn Jinto's life changes forever when the Humankind Empire Abh takes over his home planet of Martine without firing a single shot. He is soon sent off to study the Abh language and culture — to prepare himself for a future as a nobleman. A future he never dreamed of, asked for, or even wanted.",
  description2:
    "Now Jinto is entering the next phase of his training, and he is about to meet the first Abh of his life: the lovely Lafiel. He is about to learn there is more to her than meets the eye — and together they will have to fight for their very lives.",
  basedOn: "Based on the sci-fi novel series by Morioka Hiroyuki",
};

export const RATINGS = [
  {
    kind: "PERMANENT",
    value: 8.16,
    count: 4430,
    note: "Weighted score of registered votes",
  },
  {
    kind: "TEMPORARY",
    value: 8.23,
    count: 4460,
    note: "Live tally of ballots cast to date",
  },
  {
    kind: "REVIEW",
    value: 8.7,
    count: 12,
    note: "Mean of full written reviews",
  },
] as const;

export type Character = {
  id: number;
  name: string;
  baronh?: string;
  role: "MAIN" | "SECONDARY" | "APPEARS";
  rating: number;
  votes: number;
  gender: string;
  type: string;
  seiyuu?: string;
  blurb: string;
  image?: string;
};

export const CHARACTERS: Character[] = [
  {
    id: 28,
    name: "Lafiel",
    baronh: "ABLÏARSEC NÉÏC DUBREUSCR BŒRH PARHYNR LAMHIRH",
    role: "MAIN",
    rating: 9.15,
    votes: 1196,
    gender: "female",
    type: "Character",
    seiyuu: "Kawasumi Ayako",
    blurb:
      "Abh princess and granddaughter of the Empress — a 'child of love' with a two-hundred-year lifespan, lapis-lazuli eyes, and a steely exterior that only Jinto ever sees past. One day she may rule the Empire; tonight she would rather you simply called her Lamhirh.",
    image: "images/char-lafiel.jpg",
  },
  {
    id: 4081,
    name: "Jinto",
    baronh: "LINN SSYUN-ROC DREU HAÏDEC GHINTEC",
    role: "MAIN",
    rating: 7.52,
    votes: 210,
    gender: "male",
    type: "Character",
    seiyuu: "Imai Yuka",
    blurb:
      "Born Jinto Lynn on planet Martine, son of the president who traded his world for a title. Raised into Abh nobility he never asked for — Count of Haïdec by decree, lander at heart, and the first person ever to treat a princess like a person.",
    image: "images/char-jinto.jpg",
  },
  {
    id: 4084,
    name: "Spoor",
    baronh: "SPOOR ARON SEKPADAO LETOPANYU PENEJU",
    role: "SECONDARY",
    rating: 9.08,
    votes: 224,
    gender: "female",
    type: "Character",
    seiyuu: "Fukami Rika",
    blurb:
      "The red-eyed Grand Duchess. Bored by peace, merciless with her chief of staff, and one of the most able admirals in the Labule when action finally calls.",
    image: "images/char-spoor.jpg",
  },
  {
    id: 4080,
    name: "Lexshu Plakia",
    baronh: "LEXSHU WEF-ROBELL PLAKIA",
    role: "SECONDARY",
    rating: 8.79,
    votes: 30,
    gender: "female",
    type: "Character",
    seiyuu: "Takashima Gara",
    blurb:
      "Captain of the patrol ship Gosroth — every bit as smart, beautiful, dedicated and stubborn as Lafiel, but older and wiser.",
    image: "images/char-lexshu.jpg",
  },
  {
    id: 4082,
    name: "Dusanyu",
    role: "SECONDARY",
    rating: 8.71,
    votes: 63,
    gender: "male",
    type: "Character",
    seiyuu: "Shiozawa Kaneto",
    blurb:
      "Crown Prince of the Abh Empire and Commander-in-Chief of its armed forces — he personally led the invasion of the Hyde star system.",
  },
  {
    id: 21954,
    name: "Ramaj",
    role: "SECONDARY",
    rating: 5.38,
    votes: 7,
    gender: "female",
    type: "Character",
    seiyuu: "Doi Mika",
    blurb:
      "The 37th and reigning Empress of the Abh Empire, Lafiel's grandmother — Countess of Ablïarsec, holder of the imperial capital itself.",
  },
  {
    id: 4083,
    name: "Trife Remsale",
    role: "SECONDARY",
    rating: 6.69,
    votes: 19,
    gender: "male",
    type: "Character",
    seiyuu: "Kosugi Juurouta",
    blurb:
      "One of the Labule's most able tacticians and least loved officers — a man who weighs every factor twice before he dares to move.",
  },
  {
    id: 4079,
    name: "Debeus",
    role: "SECONDARY",
    rating: 6.17,
    votes: 19,
    gender: "male",
    type: "Character",
    seiyuu: "Suzuoki Hirotaka",
    blurb:
      "King of Kryv, son of the reigning Empress, and Lafiel's father — who chose to leave his daughter's genes untouched by vanity.",
  },
  {
    id: 4086,
    name: "Srguf",
    role: "SECONDARY",
    rating: 6.64,
    votes: 16,
    gender: "male",
    type: "Character",
    seiyuu: "Mugihito",
    blurb:
      "Second Baron of Febdak, confined by his own son for being a genetic 'grounder' — he befriends Jinto and helps Lafiel settle the score.",
  },
  {
    id: 4085,
    name: "Klowal",
    role: "SECONDARY",
    rating: 2.84,
    votes: 16,
    gender: "male",
    type: "Character",
    seiyuu: "Koyasu Takehito",
    blurb:
      "Third Baron of Febdak. An inferiority complex dressed as pride — he tried to abduct Lafiel and imprison Jinto, to his own ruin.",
  },
  {
    id: 7503,
    name: "Rock Lynn",
    role: "APPEARS",
    rating: 3.35,
    votes: 2,
    gender: "male",
    type: "Character",
    seiyuu: "Tanaka Hideyuki",
    blurb:
      "Former president of Martine, later Count of the Hyde system — the father who sold the sky for Jinto's title.",
  },
  {
    id: 40209,
    name: "Diaho",
    role: "APPEARS",
    rating: 5.34,
    votes: 15,
    gender: "male",
    type: "Character",
    blurb:
      "Jinto's cat. A parting gift from Lafiel at the end of the journey — son of Zanelia, daughter of Holia.",
  },
];

export const REGISTRY = [
  {
    name: "Gosroth",
    kind: "VESSEL",
    rating: 6.14,
    note: "The Resii Gothroth — the first Abh ship lost to the war.",
  },
  {
    name: "Futune",
    kind: "VESSEL",
    rating: 8.05,
    note: "Imperial ferry assigned to the Count of Haïdec.",
  },
  {
    name: "Wakusei Martine",
    kind: "PLANET",
    rating: 3.8,
    note: "Jinto's homeworld — annexed without a single shot fired.",
  },
  {
    name: "Abh Teikoku",
    kind: "EMPIRE",
    rating: 8.15,
    note: "Frybarec Gloer Gor Bari — the Humankind Empire of Abh.",
  },
] as const;

export type Episode = {
  no: number;
  en: string;
  ja: string;
  romaji: string;
  air: string;
  length: number;
  rating: number;
  votes: number;
};

export const EPISODES: Episode[] = [
  { no: 1, en: "Invasion", ja: "侵略", romaji: "Shinryaku", air: "1999-01-03", length: 25, rating: 3.31, votes: 28 },
  { no: 2, en: "Kin of the Stars", ja: "星たちの眷族", romaji: "Hoshi-tachi no Kenzoku", air: "1999-01-10", length: 25, rating: 4.94, votes: 22 },
  { no: 3, en: "Daughter of Love", ja: "愛の娘", romaji: "Ai no Musume", air: "1999-01-17", length: 25, rating: 7.31, votes: 19 },
  { no: 4, en: "Surprise Attack", ja: "奇襲", romaji: "Kishuu", air: "1999-01-24", length: 25, rating: 7.19, votes: 20 },
  { no: 5, en: "The Battle of Gosroth", ja: "ゴースロスの戦い", romaji: "Gosroth no Tatakai", air: "1999-01-31", length: 25, rating: 8.06, votes: 20 },
  { no: 6, en: "Mysterious Conspiracy", ja: "不可解な陰謀", romaji: "Fukakai na Inbou", air: "1999-02-07", length: 25, rating: 6.61, votes: 17 },
  { no: 7, en: "Fortunate Revolt", ja: "幸せな叛逆", romaji: "Shiawase na Hangyaku", air: "1999-02-14", length: 25, rating: 6.93, votes: 17 },
  { no: 8, en: "The Style of the Abh", ja: "アーヴの流儀", romaji: "Abh no Ryuugi", air: "1999-02-21", length: 25, rating: 7.19, votes: 17 },
  { no: 9, en: "To the Battlefield", ja: "戦場へ", romaji: "Senjou e", air: "1999-02-28", length: 25, rating: 6.84, votes: 17 },
  { no: 10, en: "Escape: Just the Two of Us", ja: "二人だけの逃亡", romaji: "Futari dake no Toubou", air: "1999-03-07", length: 25, rating: 6.86, votes: 17 },
  { no: 11, en: "Sufugnoff Gateway Battle", ja: "スファグノーフ門沖会戦", romaji: "Sufugnoff Mon Oki Kaisen", air: "1999-03-14", length: 25, rating: 6.0, votes: 18 },
  { no: 12, en: "Lady of Chaos", ja: "惑乱の淑女", romaji: "Wakuran no Shukujo", air: "1999-03-21", length: 25, rating: 6.67, votes: 17 },
  { no: 13, en: "Trouble Soaring Through Heaven", ja: "天翔る迷惑", romaji: "Amagakeru Meiwaku", air: "1999-03-28", length: 40, rating: 8.53, votes: 16 },
];

export const TAG_GROUPS = [
  {
    label: "ELEMENTS",
    note: "What the story is made of",
    tags: [
      { name: "space opera", weight: 400 },
      { name: "science fiction", weight: 500 },
      { name: "action", weight: 400 },
      { name: "adventure", weight: 500 },
      { name: "romance", weight: 300 },
      { name: "fantasy", weight: 100 },
      { name: "space battles", weight: 400 },
      { name: "gunfights", weight: 200 },
    ],
  },
  {
    label: "SETTING",
    note: "Where and when it unfolds",
    tags: [
      { name: "space", weight: 600 },
      { name: "future", weight: 600 },
      { name: "space travel", weight: 500 },
      { name: "shipboard", weight: 400 },
      { name: "other planet", weight: 400 },
      { name: "faster-than-light travel", weight: 0 },
    ],
  },
  {
    label: "THEMES",
    note: "The questions it asks",
    tags: [
      { name: "military", weight: 300 },
      { name: "war", weight: 400 },
      { name: "imperialism", weight: 0 },
      { name: "racism", weight: 200 },
      { name: "genetic modification", weight: 400 },
      { name: "human enhancement", weight: 200 },
      { name: "sociocultural evolution", weight: 0 },
      { name: "propaganda", weight: 0 },
      { name: "immortality", weight: 0 },
      { name: "disaster", weight: 0 },
    ],
  },
  {
    label: "CRAFT",
    note: "How it is told",
    tags: [
      { name: "novel adaptation", weight: 0 },
      { name: "dialogue driven", weight: 0 },
      { name: "plot continuity", weight: 600 },
      { name: "strong female lead", weight: 0 },
      { name: "multiple protagonists", weight: 0 },
      { name: "boy meets girl", weight: 0 },
      { name: "slow when it comes to love", weight: 300 },
      { name: "fictional language", weight: 0 },
      { name: "time skip", weight: 0 },
    ],
  },
] as const;

export const SIMILAR = [
  { id: 584, title: "Ginga Eiyuu Densetsu", alias: "Legend of the Galactic Heroes", approval: 75, total: 89 },
  { id: 2745, title: "Starship Operators", alias: null, approval: 52, total: 62 },
  { id: 6005, title: "Tytania", alias: null, approval: 36, total: 52 },
  { id: 630, title: "Uchuu no Stellvia", alias: "Stellvia of the Universe", approval: 14, total: 28 },
  { id: 192, title: "Mugen no Ryvius", alias: "Infinite Ryvius", approval: 18, total: 40 },
  { id: 5406, title: "Ookami to Koushinryou", alias: "Spice and Wolf", approval: 3, total: 16 },
  { id: 18, title: "Musekinin Kanchou Tylor", alias: "Irresponsible Captain Tylor", approval: 2, total: 11 },
] as const;

export type Voice = {
  uid: string;
  kind: "Must See" | "Recommended";
  text: string;
};

export const VOICES: Voice[] = [
  {
    uid: "567190",
    kind: "Recommended",
    text:
      "A solid space opera — but where it really shines is the two protagonists and how they interact. They have misunderstandings constantly, but they just talk it out until they come to a better understanding of each other. It's beautiful. Watching two people work that hard at empathy is such a rare treat.",
  },
  {
    uid: "411532",
    kind: "Must See",
    text: "Strong characters and great plot. One of the best space operas I've seen.",
  },
  {
    uid: "691547",
    kind: "Must See",
    text:
      "An awesome space opera that tries to answer a simple yet complicated question: can humans be friends with aliens? Think of this series as a small grandchild of a great epic like LoGH — but with Lafiel in the lead.",
  },
  {
    uid: "112858",
    kind: "Recommended",
    text:
      "If you're into sci-fi and generally more sophisticated stuff than brainless entertainment, this is a must see. Everyone else — at least take a close look; you might be surprised.",
  },
  {
    uid: "350281",
    kind: "Recommended",
    text: "Space opera with an exciting buildup and a sublime crescendo. 4X players, don't miss this!",
  },
  {
    uid: "284037",
    kind: "Must See",
    text: "Awesome! Dunno what to say, but it's just… awesome!",
  },
  {
    uid: "125868",
    kind: "Must See",
    text:
      "Excellent plots, environment, characters, development, and re-watch value. A must-see anime.",
  },
];

export const LINEAGE = [
  { id: 6, relation: "PREQUEL", title: "Seikai no Danshou: Tanjou", note: "The birth that started it all", current: false },
  { id: 1, relation: "THIS RECORD", title: "Seikai no Monshou", note: "Crest of the Stars · 1999 · 13 episodes", current: true },
  { id: 4, relation: "SEQUEL", title: "Seikai no Senki", note: "Banner of the Stars — the story continues", current: false },
  { id: 1623, relation: "SUMMARY", title: "Seikai no Monshou Tokubetsu Hen", note: "A special retrospective retelling", current: false },
] as const;

export const CREATORS = [
  { role: "Original Work", name: "Morioka Hiroyuki", id: 4495 },
  { role: "Direction", name: "Nagaoka Yasuchika", id: 4234 },
  { role: "Series Composition", name: "Yoshinaga Aya", id: 8924 },
  { role: "Character Design", name: "Watabe Keisuke", id: 4516 },
  { role: "Music", name: "Hattori Katsuhisa", id: 4303 },
] as const;

export const RESOURCES = [
  { label: "Official Site", href: "http://www.sunrise-inc.co.jp/seikai/", meta: "sunrise-inc.co.jp" },
  { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Crest_of_the_Stars", meta: "Crest_of_the_Stars" },
  { label: "Anime News Network", href: "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=14", meta: "ANN №14" },
  { label: "MyAnimeList", href: "https://myanimelist.net/anime/290", meta: "MAL №290" },
] as const;
