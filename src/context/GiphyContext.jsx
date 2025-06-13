import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { fetchTrendingGifs } from "../api/giphy";

const GiphyContext = createContext();
const LOCAL_STORAGE_KEY = "locked_gifs";

export const GiphyProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [lockedGifs, setLockedGifs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

  // Load locked gifs from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setLockedGifs(JSON.parse(stored));
    }
  }, []);

  // Save locked gifs to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lockedGifs));
  }, [lockedGifs]);

  const toggleLock = (index, gif) => {
    setLockedGifs((prev) => {
      const updated = { ...prev };
      if (updated[index]) {
        delete updated[index];
      } else {
        updated[index] = gif;
      }
      return updated;
    });
  };

  const loadGifs = useCallback(async () => {
    setIsLoading(true);
    try {
      const total = 12;
      const newGifs = await fetchTrendingGifs(API_KEY, total);

      // Prepare final array using locked gifs and filling the rest
      const filled = Array(total).fill(null);
      const unlockedIndices = [];

      for (let i = 0; i < total; i++) {
        if (lockedGifs[i]) {
          filled[i] = lockedGifs[i];
        } else {
          unlockedIndices.push(i);
        }
      }

      // Slice enough new gifs and insert into unlocked positions
      unlockedIndices.forEach((index, i) => {
        filled[index] = newGifs[i];
      });

      setGifs(filled);
    } catch (err) {
      console.error("Failed to load GIFs:", err);
    } finally {
      setIsLoading(false);
    }
  }, [API_KEY, lockedGifs]);

  return (
    <GiphyContext.Provider
      value={{ gifs, isLoading, loadGifs, toggleLock, lockedGifs }}
    >
      {children}
    </GiphyContext.Provider>
  );
};

export const useGiphy = () => useContext(GiphyContext);
