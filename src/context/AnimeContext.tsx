import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  RECORD as DEFAULT_RECORD,
  RATINGS as DEFAULT_RATINGS,
  CHARACTERS as DEFAULT_CHARACTERS,
  REGISTRY as DEFAULT_REGISTRY,
  EPISODES as DEFAULT_EPISODES,
  TAG_GROUPS as DEFAULT_TAG_GROUPS,
  SIMILAR as DEFAULT_SIMILAR,
  VOICES as DEFAULT_VOICES,
  LINEAGE as DEFAULT_LINEAGE,
  CREATORS as DEFAULT_CREATORS,
  RESOURCES as DEFAULT_RESOURCES,
  type Character,
  type Episode,
  type Voice,
} from "../data/anime";
import { fetchAniDbAnime } from "../services/anidb";
import type { ParsedAnimeData } from "../utils/parseAniDbXml";

export interface AnimeContextValue {
  record: typeof DEFAULT_RECORD;
  ratings: typeof DEFAULT_RATINGS;
  characters: Character[];
  registry: typeof DEFAULT_REGISTRY;
  episodes: Episode[];
  tagGroups: typeof DEFAULT_TAG_GROUPS;
  similar: typeof DEFAULT_SIMILAR;
  voices: Voice[];
  lineage: typeof DEFAULT_LINEAGE;
  creators: typeof DEFAULT_CREATORS;
  resources: typeof DEFAULT_RESOURCES;

  loading: boolean;
  error: string | null;
  isLive: boolean;
  source: "live-direct" | "live-proxy" | "cache" | "default";
  rawXml: string | null;
  currentAid: number;
  fetchAnime: (aid?: number, forceRefresh?: boolean) => Promise<void>;
  showXmlModal: boolean;
  setShowXmlModal: (show: boolean) => void;
  showVideoModal: boolean;
  setShowVideoModal: (show: boolean) => void;
  selectedVideoEp: number;
  openVideoPlayer: (epNo?: number) => void;
}

const AnimeContext = createContext<AnimeContextValue | undefined>(undefined);

export function AnimeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ParsedAnimeData>({
    record: DEFAULT_RECORD,
    ratings: DEFAULT_RATINGS as unknown as ParsedAnimeData["ratings"],
    characters: DEFAULT_CHARACTERS,
    registry: DEFAULT_REGISTRY as unknown as ParsedAnimeData["registry"],
    episodes: DEFAULT_EPISODES,
    tagGroups: DEFAULT_TAG_GROUPS as unknown as ParsedAnimeData["tagGroups"],
    similar: DEFAULT_SIMILAR as unknown as ParsedAnimeData["similar"],
    voices: DEFAULT_VOICES,
    lineage: DEFAULT_LINEAGE as unknown as ParsedAnimeData["lineage"],
    creators: DEFAULT_CREATORS as unknown as ParsedAnimeData["creators"],
    resources: DEFAULT_RESOURCES as unknown as ParsedAnimeData["resources"],
    rawXml: null,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [source, setSource] = useState<"live-direct" | "live-proxy" | "cache" | "default">("default");
  const [currentAid, setCurrentAid] = useState<number>(1);
  const [showXmlModal, setShowXmlModal] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [selectedVideoEp, setSelectedVideoEp] = useState<number>(0);

  const openVideoPlayer = useCallback((epNo: number = 0) => {
    setSelectedVideoEp(epNo);
    setShowVideoModal(true);
  }, []);

  const fetchAnime = useCallback(
    async (aid: number = 1, forceRefresh: boolean = false) => {
      setLoading(true);
      setError(null);
      setCurrentAid(aid);

      try {
        const result = await fetchAniDbAnime(aid, forceRefresh);
        setData(result.data);
        setIsLive(true);
        setSource(result.source);
      } catch (err) {
        const message = (err as Error).message || "Failed to fetch from AniDB API";
        console.warn("[AniDB] Falling back to default data:", message);
        setError(message);
        // keep default data intact so website does not break
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Automatically execute the fetch API on mount as requested
  useEffect(() => {
    fetchAnime(1);
  }, [fetchAnime]);

  const value: AnimeContextValue = {
    record: data.record,
    ratings: data.ratings as unknown as typeof DEFAULT_RATINGS,
    characters: data.characters,
    registry: data.registry as unknown as typeof DEFAULT_REGISTRY,
    episodes: data.episodes,
    tagGroups: data.tagGroups as unknown as typeof DEFAULT_TAG_GROUPS,
    similar: data.similar as unknown as typeof DEFAULT_SIMILAR,
    voices: data.voices,
    lineage: data.lineage as unknown as typeof DEFAULT_LINEAGE,
    creators: data.creators as unknown as typeof DEFAULT_CREATORS,
    resources: data.resources as unknown as typeof DEFAULT_RESOURCES,

    loading,
    error,
    isLive,
    source,
    rawXml: data.rawXml,
    currentAid,
    fetchAnime,
    showXmlModal,
    setShowXmlModal,
    showVideoModal,
    setShowVideoModal,
    selectedVideoEp,
    openVideoPlayer,
  };

  return <AnimeContext.Provider value={value}>{children}</AnimeContext.Provider>;
}

export function useAnime(): AnimeContextValue {
  const ctx = useContext(AnimeContext);
  if (!ctx) {
    throw new Error("useAnime must be used within an AnimeProvider");
  }
  return ctx;
}
