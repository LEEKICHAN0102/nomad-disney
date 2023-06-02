import styled from "styled-components";
import { Link }from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCharacter } from "../api";

const Container =styled.div`
  padding: 0px 20px;
  margin:0 auto;
`;

const Header=styled.header`
  height:5vh;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:50px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Title= styled.h1`

`;


const CharacterBox =styled.div`
  display:flex;
  height:200px;
  width:250px;
  border-radius:40px;
  &:hover{
    background-color:white;
    transition:ease-in-out 0.3s;
    color:#050614;
  }
`;

const CharacterImg=styled.img`
  width:100px;
  height:100px;
  border-radius:50%;
`;

const CharacterName=styled.h4`
`;

interface ICharacterObj{
  id:number,
  name:string,
  imageUrl:string
}

function Home(){
  const { isLoading, data } = useQuery<ICharacterObj[]>("allCharacter", fetchCharacter);
  return (
    <Container>
      <Header>
        <Title>Welcome to Disney!!</Title>
      </Header>
      {isLoading ? (
        <Loader>"Loading Characters..."</Loader>
      ) : (
        data?.slice(0,100).map((character) => (
          <Link to={`character/${character.id}`} key={character.id}>
            <CharacterBox>
              <CharacterImg src={character.imageUrl}></CharacterImg>
              <CharacterName>{character.name}</CharacterName>
            </CharacterBox>
          </Link>
        ))
      )}
    </Container>
  );
}

export default Home;