import React, { useEffect } from "react";
import { useGiphy } from "../context/GiphyContext";

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
  const { gifs, loadGifs, isLoading, toggleLock, lockedGifs } = useGiphy();
  useEffect(() => {
    loadGifs();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
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
        {gifs.map((gif, index) => (
          <GifCard key={gif.id} onClick={() => toggleLock(index, gif)}>
            <GifImage
              src={gif.images.fixed_width_downsampled.url}
              alt={gif.title}
            />
            <LockIcon>{lockedGifs[index] ? "🔒" : "🔓"}</LockIcon>
            <Footer>
              <span>{gif.import_datetime.split(" ")[0]}</span>
              <Hashtags>#leisure #ba</Hashtags>
            </Footer>
          </GifCard>
        ))}
      </Grid>
      <RefreshButton onClick={loadGifs} disabled={isLoading}>
        {isLoading ? "Loading..." : "↻ Hit here to refresh gifs or press space"}
      </RefreshButton>
    </Container>
  );
};

export default GifGrid;
