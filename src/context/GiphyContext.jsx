import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchTrendingGifs } from "../api/giphy";

const GiphyContext = createContext();

export const GiphyProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

  const loadGifs = useCallback(async () => {
    setIsLoading(true);
    try {
      const newGifs = await fetchTrendingGifs(API_KEY);
      setGifs(newGifs);
    } catch (err) {
      console.error("Failed to load GIFs:", err);
    } finally {
      setIsLoading(false);
    }
  }, [API_KEY]);

  return (
    <GiphyContext.Provider value={{ gifs, loadGifs, isLoading }}>
      {children}
    </GiphyContext.Provider>
  );
};

export const useGiphy = () => useContext(GiphyContext);
