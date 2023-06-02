import { useQuery } from "react-query";
import styled from "styled-components";
import { Link, useParams,useLocation } from "react-router-dom";
import { fetchCharacterDetail } from "../api";

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

interface RouteParams {
  characterId: number;
}

interface DetailFilms {
  films:string[],
}


function About () {
  const {characterId}=useParams<RouteParams>();
  const {isLoading:filmLoading,data:filmData}=useQuery(["films",characterId],()=>fetchCharacterDetail(characterId));

  return  (
    <Container>
    <Header>
      <Title>About Disney Characters</Title>
    </Header>
    {filmLoading ? (
      <Loader>Loading Characters...</Loader>
    ) : (
      filmData?.map((character) => (
        <div key={character.id}>
          <h2>{character.name}</h2>
          <img src={character.imageUrl} alt={character.name} />
          <ul>
            {character.films.map((film, index) => (
              <li key={index}>{film}</li>
            ))}
          </ul>
        </div>
      ))
    )}
  </Container>
  );
}

export default About;