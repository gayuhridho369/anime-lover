import React from "react";
import styled from "@emotion/styled";

export function SkeletonCard() {
  return (
    <Card>
      <Img />
    </Card>
  );
}

export function SkeletonPaginate() {
  return (
    <Paginate>
      <Button>Prev </Button>
      <Button>Next </Button>
    </Paginate>
  );
}

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

const Img = styled.div`
  width: 100%;
  height: 300px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  background-color: ${({ theme }) => theme.color.lightAlt};
`;

const Paginate = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 12px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.lightAlt};
  color: ${({ theme }) => theme.color.lightAlt};
`;
