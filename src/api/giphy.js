export const fetchTrendingGifs = async (
  apiKey,
  limit = 12,
  maxOffset = 200
) => {
  const offset = Math.floor(Math.random() * maxOffset);
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&offset=${offset}`
    );
    const data = await response.json();
    const sorted = data.data.sort(
      (a, b) => new Date(b.import_datetime) - new Date(a.import_datetime) // no sort url param available on API
    );
    return sorted;
  } catch (error) {
    console.error("Error fetching trending GIFs:", error);
    throw error;
  }
};
