import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCharacter } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: whitesmoke;
`;

const CharacterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  margin-top: 30px;
`;

const CharacterBox = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: whitesmoke;
  width: 200px;
  padding: 20px;
  border-radius: 10px;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color:white;
    color: #111;
  }
`;

const CharacterImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const CharacterName = styled.h4`
  font-size: 16px;
  margin: 0;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  margin-top: 30px;
`;

interface ICharacterObj {
  id: number;
  name: string;
  imageUrl: string;
}

function Home() {
  const { isLoading, data } = useQuery<ICharacterObj[]>("allCharacters", fetchCharacter);

  if (isLoading) {
    return (
      <Container>
        <Header>
          <Title>Welcome to Disney!!</Title>
        </Header>
        <Loader>Loading Characters...</Loader>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Welcome to Disney!!</Title>
      </Header>
      <CharacterList>
        {data?.slice(0, 100).map((character) => (
          <CharacterBox to={`character/${character.id}`} state={character.id} key={character.id}>
            <CharacterImg src={character.imageUrl} alt="🐭" />
            <CharacterName>{character.name}</CharacterName>
          </CharacterBox>
        ))}
      </CharacterList>
    </Container>
  );
}

export default Home;
