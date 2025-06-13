import React, { useEffect, useState } from "react";
import { fetchTrendingGifs } from "../api/giphy";

import {
  Container,
  Title,
  Grid,
  GifCard,
  GifImage,
  LockIcon,
  Footer,
  Hashtags,
  RefreshButton,
} from "./styles";

const GifGrid = () => {
  const [gifs, setGifs] = useState([]);
  const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

  const loadGifs = async () => {
    try {
      const trendingGifs = await fetchTrendingGifs(API_KEY);
      setGifs(trendingGifs);
    } catch (error) {
      console.error("Failed to load GIFs:", error);
      setGifs([]);
    }
  };

  useEffect(() => {
    loadGifs();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault(); // no scroll
        loadGifs();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loadGifs]);

  return (
    <Container>
      <Title>Giphy</Title>
      <Grid>
        {gifs.map((gif) => (
          <GifCard key={gif.id}>
            <GifImage
              src={gif.images.fixed_width_downsampled.url}
              alt={gif.title}
            />
            <LockIcon>🔒🔓</LockIcon>
            <Footer>
              <span>{gif.import_datetime.split(" ")[0]}</span>
              <Hashtags>#leisure #ba</Hashtags>
            </Footer>
          </GifCard>
        ))}
      </Grid>
      <RefreshButton onClick={loadGifs}>
        ↻ Hit here to refresh gifs or press space
      </RefreshButton>
    </Container>
  );
};

export default GifGrid;
