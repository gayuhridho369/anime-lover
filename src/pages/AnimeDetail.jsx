import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { useQuery, gql } from "@apollo/client";
import Container from "../components/Container";
import { AiFillStar } from "react-icons/ai";
import ModalCollect from "../components/ModalCollect";
import getAnimeDetail from "../graphql/GetAnimeDetail";
import SkeletonAnimeDetail from "../components/skeletons/SkeletonAnimeDetail";

function AnimeDetail() {
  const [showModal, setShowModal] = useState(false);
  const [idAnimeCollect, setIdAnimeCollect] = useState(0);
  const [animesCollected, setAnimesCollected] = useState([]);
  const [isCollected, setIsCollected] = useState(false);
  const [collectionName, setCollectionName] = useState(" ");

  const { id } = useParams();
  const { loading, error, data } = useQuery(getAnimeDetail, {
    variables: { id: id },
  });

  const handleAnimesCollected = (animes) => {
    setAnimesCollected(animes);
  };

  const handleCollect = (id) => {
    console.log(id);
    setShowModal(!showModal);
    setIdAnimeCollect(id);
  };

  const handleRemove = () => {
    if (window.confirm("Remove from collection")) {
      const localCollections = JSON.parse(localStorage.getItem("collections"));

      const anime = localCollections.map((collection) => {
        if (collection.anime.find((id) => id === data.Media.id)) {
          const index = collection.anime.indexOf(data.Media.id);
          if (index > -1) {
            collection.anime.splice(index, 1);
          }
        }

        return collection;
      });

      // setIsCollected(false);
      localStorage.setItem("collections", JSON.stringify(anime));

      let datas = [];
      anime.forEach((collection) => {
        collection.anime.forEach((id) => {
          datas.push({
            id: id,
            name: collection.name,
          });
        });
      });

      setAnimesCollected(datas);
    }
  };

  useEffect(() => {
    setIsCollected(false);
    setCollectionName("");

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

  if (loading)
    return (
      <Container>
        <SkeletonAnimeDetail />
      </Container>
    );
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
              {isCollected && (
                <Collection>
                  Collected In
                  <CollectionName> {collectionName} </CollectionName>
                </Collection>
              )}
            </Left>
            <Right>
              <Title>
                {data?.Media?.title.english} - {data?.Media?.title.native}
              </Title>
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
  width: 200px;
  height: 300px;
  object-fit: cover;
  margin-top: -150px;
  border: 6px solid ${({ theme }) => theme.color.white};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  @media only screen and (max-width: 768px) {
    margin-top: -100px;
    width: 150px;
    height: 200px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3.5fr;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

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
  @media only screen and (max-width: 768px) {
    width: 150px;
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

const Collection = styled.p`
  margin-top: 18px;
  color: ${({ theme }) => theme.color.lightAlt};
  display: block;
`;

const CollectionName = styled.span`
  display: block;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ theme }) => theme.color.green};
`;
