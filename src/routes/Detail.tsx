import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCharacterDetail } from "../api";
import { useParams,Link } from "react-router-dom";

const Container =styled.div`
  padding: 0px 20px;
  margin:0 auto;
  justify-content:center;
  align-items:center;
  height:100vh;
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
  font-size:28px;
  color:white;
`;
const DetailCharacterBox=styled.div`
  margin:0 auto;
  margin-top:50px;
  width:720px;
  height:540px;
  background-color:#565454;
  border-radius:50px;
  display:flex;
  align-items:center;
  justify-content:center;
  img{
    margin-top:20px;
    width:200px;
    height:200px;
    border-radius:20px;
  }
`;

const FilmsBox = styled.div`
  background-color: whitesmoke;
  color: #111;
  margin:15px;
  border-radius:10px;
  li {
    text-align:center;
    padding:10px;
  }
`;

const LinkBox=styled.div`
  text-align:center;
  margin-top:20px;
  display:flex;
  justify-content:center;
  align-items:center;
  div {
    padding:10px;
    margin-top:10px;
    background-color:white;
    color:black;
    border-radius:10px;
    text-align:center;
    :hover{
      transition:ease-in-out 0.2s;
      background-color:tomato;
    }
}
`;

interface ICharacterDetail{
  id: number|undefined,
  films: string[],
  name:string,
  imageUrl:string,
  sourceUrl:string
}


function Detail () {
  const {id}=useParams();
  console.log(id);
  const { isLoading, data } = useQuery<ICharacterDetail>(String(id), () => fetchCharacterDetail(Number(id)));
  console.log(data);
  return  (
    <Container>
      <Header>
        <Title>{data?.name}</Title>
      </Header>
      {isLoading ? (
        <Loader>"Loading Character's Detail..."</Loader>
      ): (
      <DetailCharacterBox>
        <img src={data?.imageUrl} alt="🐭"></img>
          <ul>
            {data?.films.map((film) => (
              <FilmsBox>
                  <li key={film}>{film}</li>
              </FilmsBox>
              ))}
          </ul>
      </DetailCharacterBox>
      )}
      <LinkBox>
          {data?.sourceUrl && (
            <span>
              If you want to see more {data?.name} information?? click this link! &darr;
              <div>
                <Link to={data?.sourceUrl}>{data?.sourceUrl}</Link>
              </div>
            </span>
          )}
      </LinkBox>
    </Container>
  );
}

export default Detail;