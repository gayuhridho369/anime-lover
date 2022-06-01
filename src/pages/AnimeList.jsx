import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";
import GetAnimeList from "../graphql/GetAnimeList";
import Container from "../components/Container";
import Pagination from "../components/Pagination";
import { AiFillStar } from "react-icons/ai";
import { MdSaveAlt } from "react-icons/md";
import { BsTagsFill } from "react-icons/bs";
import {
  SkeletonCard,
  SkeletonPaginate,
} from "../components/skeletons/SkeletonAnimeList";
import Error from "../components/Error";
import AddCollect from "../components/modals/AddCollect";
import { Collections } from "../stores/Context";
import RemoveCollect from "../components/modals/RemoveCollect";

function AnimeList() {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [idAddCollect, setIdAddCollect] = useState(0);
  const [animesCollected, setAnimesCollected] = useState([]);

  const { collections, getLocalStorage, addCollect, removeCollect } =
    useContext(Collections);

  const { pageNumber } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GetAnimeList, {
    variables: { page: page, perPage: 10 },
  });

  const animeDetail = (id) => {
    navigate("/anime/" + id + "/detail");
  };

  const handleModalAdd = (id) => {
    setShowModal(!showModal);
    if (id) setIdAddCollect(id);
  };

  const handleModalRemove = (id) => {
    setShowModalRemove(!showModalRemove);
    if (id) setIdAddCollect(id);
  };

  const handleAddCollect = (newCollect) => {
    addCollect(newCollect);
  };

  const handleRemoveCollect = (id) => {
    removeCollect(id.idAnime);
  };

  const isAnimesCollected = () => {
    let animes = [];
    collections.forEach((collection) => {
      collection.animesId.forEach((id) => {
        animes.push({
          id: id,
          name: collection.name,
        });
      });
    });
    setAnimesCollected(animes);
  };

  useEffect(() => {
    if (pageNumber) {
      setPage(pageNumber);
    } else {
      setPage(1);
    }
  }, [pageNumber]);

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    isAnimesCollected();
  }, [collections]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (loading)
    return (
      <Container>
        <Flex>
          <Grid>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, index) => {
              return <SkeletonCard key={index} />;
            })}
          </Grid>
          <SkeletonPaginate />
        </Flex>
      </Container>
    );

  if (error)
    return (
      <Container>
        <Flex>
          <Grid>
            <Error />
          </Grid>
        </Flex>
      </Container>
    );

  return (
    <>
      <AddCollect
        showModal={showModal}
        handleModal={handleModalAdd}
        collections={collections}
        idAddCollect={idAddCollect}
        handleAddCollect={handleAddCollect}
      />
      <RemoveCollect
        showModal={showModalRemove}
        handleModal={handleModalRemove}
        idAddCollect={idAddCollect}
        handleRemoveCollect={handleRemoveCollect}
      />
      <Container>
        <Flex>
          <Grid>
            {data.Page.media.map((anime, index) => {
              return (
                <Card key={index}>
                  <Img
                    src={anime.coverImage.large}
                    alt={anime.title.english}
                    onClick={() => animeDetail(anime.id)}
                  />
                  <Title onClick={() => animeDetail(anime.id)}>
                    {anime.title.english} - {anime.title.native}
                  </Title>
                  <Rating>
                    <AiFillStar />
                    {anime.averageScore} / 100
                  </Rating>
                  <Episodes>{anime.episodes} Episodes</Episodes>
                  {animesCollected.map((animeCollected, index) => {
                    return (
                      <div key={index}>
                        {animeCollected.id === anime.id && (
                          <Collected
                            onClick={() => handleModalRemove(anime.id)}
                          >
                            <BsTagsFill />
                          </Collected>
                        )}
                      </div>
                    );
                  })}
                  <Collect onClick={() => handleModalAdd(anime.id)}>
                    <MdSaveAlt />
                  </Collect>
                </Card>
              );
            })}
          </Grid>
          <Pagination pageInfo={data.Page.pageInfo} />
        </Flex>
      </Container>
    </>
  );
}

export default AnimeList;

const Flex = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 96px 0 64px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  width: 100%;
`;

const Card = styled.div`
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
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  color: ${({ theme }) => theme.color.darkAlt};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.green};
  }
`;

const Episodes = styled.p`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  bottom: 15px;
  right: 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  padding: 2px 6px;
  background-color: ${({ theme }) => theme.color.green};
  color: ${({ theme }) => theme.color.light};
`;

const Rating = styled.p`
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
  padding: 2px 6px;
  background-color: ${({ theme }) => theme.color.orange};
`;

const Collect = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 15px;
  left: 10px;
  border-radius: 4px;
  padding: 2px 4px;
  font-size: 18px;
  border: 2px solid ${({ theme }) => theme.color.green};
  color: ${({ theme }) => theme.color.green};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.green};
    color: ${({ theme }) => theme.color.white};
  }
`;

const Collected = styled(Collect)`
  z-index: 5;
  color: ${({ theme }) => theme.color.light};
  border: 2px solid ${({ theme }) => theme.color.lightAlt};
  background-color: ${({ theme }) => theme.color.lightAlt};
  &:hover {
    color: ${({ theme }) => theme.color.light};
    border: 2px solid ${({ theme }) => theme.color.darkAlt};
    background-color: ${({ theme }) => theme.color.darkAlt};
  }
`;
