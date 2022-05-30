import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Container from "../components/main/Container";
import styled from "@emotion/styled";
import { AiFillStar } from "react-icons/ai";

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
  const { id } = useParams();
  const { loading, error, data } = useQuery(getAnime, {
    variables: { id: id },
  });

  console.log(data?.Media);

  if (loading) return <> Loading</>;
  if (error) return <>{JSON.stringify(error)}</>;

  return (
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
            <Collect>Add to Collect</Collect>
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
              {data?.Media?.genres?.map((genre) => {
                return <span>{genre}, </span>;
              })}
            </Genre>
          </Right>
        </Grid>
        {/* <img
        src={data?.Media?.bannerImage}
        alt={data?.Media?.title.english}
        width={300}
      />
      <h1>
        {data?.Media?.title.english} - {data?.Media?.title.native}
        </h1>
        <img
        src={data?.Media?.coverImage.medium}
        alt={data?.Media?.title.english}
        />
        <p>
        Genres:{" "}
        {data?.Media?.genres?.map((genre) => {
          return <span>{genre}, </span>;
        })}
        </p>
        <p>Total episodes: {data?.Media?.episodes}</p>
        <p>Duration: {data?.Media?.duration}</p>
      <p>Description: {data?.Media?.description}</p> */}
      </Detail>
    </Container>
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
