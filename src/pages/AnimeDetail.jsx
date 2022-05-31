import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Container from "../components/main/Container";
import styled from "@emotion/styled";
import { AiFillStar } from "react-icons/ai";
import ModalCollect from "../components/ModalCollect";

export const getAnime = gql`
  query Query($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        english
        native
      }
      coverImage {
        large
      }
      bannerImage
      averageScore
      genres
      episodes
      duration
      description
    }
  }
`;

function AnimeDetail() {
  const [collections, setCollections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idAnimeCollect, setIdAnimeCollect] = useState(0);
  const [animesCollected, setAnimesCollected] = useState([]);
  const [isCollected, setIsCollected] = useState(false);
  const [collectionName, setCollectionName] = useState(" ");

  const { id } = useParams();
  const { loading, error, data } = useQuery(getAnime, {
    variables: { id: id },
  });

  const handleAnimesCollected = (animes) => {
    setAnimesCollected(animes);
  };

  const handleCollect = (id) => {
    setShowModal(!showModal);
    setIdAnimeCollect(id);
  };

  const handleRemove = () => {
    if (window.confirm("Remove from collection")) {
      const localCollections = JSON.parse(localStorage.getItem("collections"));
      // console.log(localCollections);

      const anime = localCollections.map((collection) => {
        // console.log(collection);
        // anime = [];
        collection.anime = collection.anime.map((id) => {
          if (id !== data?.Media?.id) {
            return id;
          } else {
            return 0;
          }
        });
        return collection;
      });

      setIsCollected(false);
      localStorage.setItem("collections", JSON.stringify(anime));
    }
  };

  useEffect(() => {
    animesCollected.forEach((anime) => {
      if (anime.id === data?.Media?.id) {
        setIsCollected(true);
        setCollectionName(anime.name);
      }
    });
  });

  // useEffect(() => {
  //   const localCollections = JSON.parse(localStorage.getItem("collections"));
  //   if (localCollections) {
  //     setCollections(localCollections);
  //   }
  // }, []);

  if (loading) return <> Loading</>;
  if (error) return <>{JSON.stringify(error)}</>;

  return (
    <>
      <ModalCollect
        showModal={showModal}
        handleCollect={handleCollect}
        idAnime={idAnimeCollect}
        animesCollected={handleAnimesCollected}
      />
      <Container>
        <Detail>
          <BannerImage
            src={data?.Media?.bannerImage}
            alt={data?.Media?.title.english}
          />
          <Grid>
            <Left>
              <CoverImage
                src={data?.Media?.coverImage.large}
                alt={data?.Media?.title.english}
              />
              {!isCollected ? (
                <Collect onClick={() => handleCollect(data?.Media?.id)}>
                  Add to Collection
                </Collect>
              ) : (
                <Collected onClick={handleRemove}>
                  Remove from Collection
                </Collected>
              )}
            </Left>
            <Right>
              <Title>
                {data?.Media?.title.english} - {data?.Media?.title.native}
              </Title>
              {isCollected && <h3>Collected in {collectionName}</h3>}
              <Info>
                <Rating>
                  <AiFillStar />
                  {data?.Media?.averageScore} / 100
                </Rating>
                <Episodes>{data?.Media?.episodes} Episodes</Episodes>
              </Info>
              <Paragraph>{data?.Media?.description}</Paragraph>
              <Genre>
                Genres:{" "}
                {data?.Media?.genres?.map((genre, index) => {
                  return <span key={index}>{genre}, </span>;
                })}
              </Genre>
            </Right>
          </Grid>
        </Detail>
      </Container>
    </>
  );
}

export default AnimeDetail;

const Detail = styled.div`
  padding: 96px 0;
  width: 100%;
  min-height: 100vh;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const CoverImage = styled.img`
  height: 300px;
  width: 200px;
  object-fit: cover;
  margin-top: -150px;
  /* margin-left: 50px; */
  border: 6px solid ${({ theme }) => theme.color.white};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3.5fr;
  height: 300px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Right = styled.div``;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-top: 24px;
  margin-bottom: 16px;
`;

const Paragraph = styled.p`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: ${({ theme }) => theme.color.darkAlt};
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
`;

const Rating = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
  width: max-content;
  font-weight: 600;
  border-radius: 4px;
  background-color: orange;
  padding: 6px 10px;
`;

const Episodes = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
  width: max-content;
  font-weight: 600;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.green};
  color: ${({ theme }) => theme.color.white};
  padding: 6px 10px;
`;

const Collect = styled.div`
  width: 200px;
  height: 36px;
  margin-top: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.color.green};
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.color.green};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.green};
    color: ${({ theme }) => theme.color.light};
  }
`;

const Collected = styled(Collect)`
  z-index: 5;
  background-color: ${({ theme }) => theme.color.lightAlt};
  color: ${({ theme }) => theme.color.light};
  border: 2px solid ${({ theme }) => theme.color.lightAlt};
  &:hover {
    background-color: ${({ theme }) => theme.color.darkAlt};
    border: 2px solid ${({ theme }) => theme.color.darkAlt};
  }
`;

const Genre = styled.div`
  padding-top: 14px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: ${({ theme }) => theme.color.darkAlt};
  span {
    color: ${({ theme }) => theme.color.dark};
    font-weight: 600;
  }
`;
