import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

function Pagination(props) {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/anime/page/" + (Number(props.pageInfo.currentPage) + Number(1)));
  };

  const handlePrev = () => {
    navigate("/anime/page/" + (Number(props.pageInfo.currentPage) - Number(1)));
  };

  return (
    <Div>
      <Button onClick={handlePrev} disabled={props.pageInfo.currentPage <= 1}>
        Prev
      </Button>
      <Button
        onClick={handleNext}
        disabled={
          props.pageInfo.total / props.pageInfo.perPage ===
          props.pageInfo.currentPage
        }
      >
        Next
      </Button>
    </Div>
  );
}

export default Pagination;

const Div = styled.div`
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
  cursor: pointer;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.green};
  color: ${({ theme }) => theme.color.light};
  &[disabled] {
    background-color: ${({ theme }) => theme.color.lightAlt};
  }
`;
