import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import GetAnimes from "../graphql/GetAnimes";
import Container from "../components/main/Container";
import Pagination from "../components/Pagination";
import { AiFillStar } from "react-icons/ai";
import { MdSaveAlt } from "react-icons/md";

function AnimeList() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const { pageNumber } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GetAnimes, {
    variables: { page: page, perPage: perPage },
  });

  useEffect(() => {
    if (pageNumber) {
      setPage(pageNumber);
    } else {
      setPage(1);
    }
  });

  const handleAnimeDetail = (id) => {
    navigate("/anime/" + id + "/detail");
  };

  const handleCollect = () => {
    console.log("collection");
  };

  if (loading)
    return (
      <Container>
        <Flex>
          <Grid>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
              return (
                <Card>
                  <SkeletonImg />
                </Card>
              );
            })}
          </Grid>
        </Flex>
      </Container>
    );

  if (error)
    return (
      <Container>
        <Flex>
          <Grid> {JSON.stringify(error)}</Grid>
        </Flex>
      </Container>
    );

  return (
    <Container>
      <Flex>
        <Grid>
          {data?.Page?.media?.map((anime) => {
            return (
              <Card key={anime.id}>
                <Img
                  src={anime.coverImage.large}
                  alt={anime.title.english}
                  onClick={() => handleAnimeDetail(anime.id)}
                />
                <Title onClick={() => handleAnimeDetail(anime.id)}>
                  {anime.title.english ?? "English name not found"} -{" "}
                  {anime.title.native ?? "Native name not found"}
                </Title>
                <Score>
                  <AiFillStar />
                  {anime.averageScore} / 100
                </Score>
                <Episodes>{anime.episodes} Episodes</Episodes>
                <Collect onClick={handleCollect}>
                  <MdSaveAlt />
                </Collect>
              </Card>
            );
          })}
        </Grid>
        <Pagination pageInfo={data?.Page?.pageInfo} />
      </Flex>
    </Container>
  );
}

export default AnimeList;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 96px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  min-height: 100vh;
  width: 100%;
`;

const Card = styled.div`
  cursor: pointer;
  position: relative;
  height: 400px;
  width: 100%;
  border-radius: 6px;
  background: ${({ theme }) => theme.color.white};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  &:hover {
    transform: scale(102%);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const Title = styled.p`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  color: ${({ theme }) => theme.color.darkAlt};
  padding: 4px 10px;
`;

const Episodes = styled.p`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.green};
  color: ${({ theme }) => theme.color.white};
  padding: 2px 6px;
`;

const Score = styled.p`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  top: 5px;
  left: 5px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  background-color: orange;
  padding: 2px 6px;
`;

const Collect = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: ${({ theme }) => theme.color.green};
  font-size: 18px;
  border: 2px solid ${({ theme }) => theme.color.green};
  border-radius: 4px;
  padding: 2px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${({ theme }) => theme.color.green};
    color: ${({ theme }) => theme.color.white};
  }
`;

const SkeletonImg = styled.div`
  width: 100%;
  height: 300px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  background-color: ${({ theme }) => theme.color.lightAlt};
`;
