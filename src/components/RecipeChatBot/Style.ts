import { FaDiaspora } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

export const IngredientsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 40%;
  column-gap: 50px;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
    row-gap: 20px;
  }
`;

export const Caption = styled.p`
  margin: 0 0 15px 0;
  padding: 0;
`;

export const IngredientsWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.color.border};
  box-shadow: 2px 2px 2px ${(props) => props.theme.color.contentShadow};
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  padding-bottom: 5px;
  border-bottom: 1px dashed #aaaaaa;
  margin-bottom: 5px;
`;

export const TitleIcon = styled(FaDiaspora)`
  color: #434f60;
  margin-right: 8px;
  margin-top: 2px;
  font-size: 15px;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  padding: 8px 12px;
`;

export const InfoCardWrapper = styled.div`
  margin-right: 20px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
  background-color: rgba(99, 95, 95, 0.8);
  z-index: 1000;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const RecipeList = styled.div`
  display: grid;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Button = styled.button`
  padding: 0.6rem 1.5rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #34495e;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const RecipeButton = styled(Button)`
  width: 100%;
  text-align: left;
  background-color: #f8f9fa;
  color: #212529;
  border: 1px solid #dee2e6;

  &:hover {
    background-color: #e9ecef;
  }
`;

export const RecipeDetail = styled.div`
  h2 {
    color: #212529;
    margin-bottom: 1.5rem;
  }

  h3 {
    color: #495057;
    margin: 1rem 0;
  }

  ul,
  ol {
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }
`;

export const ErrorMessage = styled.p`
  margin: 5px 0 10px 0;
  padding: 0;
  color: #ff3333;
`;

// アニメーション：ドットが順に出てくる
const blink = keyframes`
  0% { opacity: 0; }
  20% { opacity: 1; }
  100% { opacity: 0; }
`;

export const SearchingText = styled.div`
  color: #555555;
  margin-bottom: 10px;

  &::after {
    content: "．．．";
    display: inline-block;
    animation: ${blink} 1.2s infinite;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #000;
  }
`;

export const ModalTitle = styled.h2`
  margin: 0;
`;

export const Marker = styled.span`
  background: linear-gradient(transparent 60%, #ffff99 60%);
  margin-right: 5px;
`;
