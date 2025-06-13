import styled from "styled-components";
const Container = styled.div`
  max-width: 1000px;
  margin: auto;
  min-height: 100vh;
  padding: 2rem;
  color: white;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const GifCard = styled.div`
  background-color: #1a1c29;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  border: 2px solid #2c2f40;
`;

const GifImage = styled.img`
  width: 100%;
  display: block;
`;

const Footer = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  border-top: 1px solid #2c2f40;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Hashtags = styled.div`
  color: #ccc;
`;

const LockIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
  padding: 4px;
  border-radius: 50%;
`;

const RefreshButton = styled.button`
  display: block;
  margin: 2rem auto 0;
  padding: 0.8rem 1.5rem;
  background-color: #2d2f3e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #3d3f50;
  }
`;
export {
  Container,
  Title,
  Grid,
  GifCard,
  GifImage,
  Footer,
  Hashtags,
  LockIcon,
  RefreshButton,
};
