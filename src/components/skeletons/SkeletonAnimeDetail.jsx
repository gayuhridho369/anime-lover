import React from "react";
import styled from "@emotion/styled";

function SkeletonAnimeDetail() {
  return (
    <Detail>
      <BannerImage />
      <Grid>
        <Left>
          <CoverImage />
          <Collect />
        </Left>
        <Right>
          <Title />
          <Info>
            <Rating />
            <Episodes />
          </Info>
          <Paragraph />
        </Right>
      </Grid>
    </Detail>
  );
}

export default SkeletonAnimeDetail;

const Detail = styled.div`
  padding: 96px 0;
  width: 100%;
  min-height: 100vh;
`;

const BannerImage = styled.div`
  width: 100%;
  height: 300px;
  background-color: ${({ theme }) => theme.color.lightAlt};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3.5fr;
  gap: 12px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const CoverImage = styled.div`
  width: 200px;
  height: 300px;
  margin-top: -150px;
  border: 6px solid ${({ theme }) => theme.color.white};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  background-color: ${({ theme }) => theme.color.lightAlt};
  @media only screen and (max-width: 768px) {
    margin-top: -100px;
    width: 150px;
    height: 200px;
  }
`;

const Collect = styled.div`
  width: 200px;
  height: 36px;
  margin-top: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.lightAlt};
  @media only screen and (max-width: 768px) {
    width: 150px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
`;

const Title = styled.h1`
  height: 42px;
  width: 75%;
  margin-top: 32px;
  margin-bottom: 32px;
  background-color: ${({ theme }) => theme.color.lightAlt};
`;

const Rating = styled.p`
  height: 20px;
  width: 96px;
  background-color: ${({ theme }) => theme.color.lightAlt};
`;

const Episodes = styled.p`
  height: 20px;
  width: 96px;
  background-color: ${({ theme }) => theme.color.lightAlt};
`;

const Paragraph = styled.p`
  height: 128px;
  width: 100%;
  background-color: ${({ theme }) => theme.color.lightAlt};
`;
