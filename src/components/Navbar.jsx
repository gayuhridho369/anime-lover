import React from "react";
import styled from "@emotion/styled";
import Container from "./Container";
import { ImSearch } from "react-icons/im";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleToHome = () => {
    navigate("/");
  };

  const handleToCollection = () => {
    navigate("/anime/collection");
  };

  return (
    <Header>
      <Container>
        <Nav>
          <Logo onClick={handleToHome}>Anime Lover</Logo>
          <Div>
            <Search>
              <Input type="text" placeholder="Search anime's title here..." />
              <Icon>
                <ImSearch />
              </Icon>
            </Search>
            <Collection onClick={handleToCollection}>Collection</Collection>
          </Div>
        </Nav>
      </Container>
    </Header>
  );
}

export default Navbar;

const Header = styled.div`
  position: fixed;
  width: 100%;
  z-index: 5;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  color: ${({ theme }) => theme.color.green};
  background: ${({ theme }) => theme.color.white};
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Search = styled.div`
  position: relative;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Input = styled.input`
  width: 360px;
  height: 34px;
  padding: 0 12px;
  font-size: 14px;
  letter-spacing: 0.25px;
  outline: none;
  border-radius: 8px;
  border: 1.5px solid ${({ theme }) => theme.color.lightAlt};
  &:focus {
    border: 1.5px solid ${({ theme }) => theme.color.green};
  }
  &::placeholder {
    color: ${({ theme }) => theme.color.lightAlt};
  }
`;

const Icon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  right: 3px;
  transform: translateY(-50%);
  height: 32px;
  width: 32px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  color: ${({ theme }) => theme.color.lightAlt};
`;

const Collection = styled.div`
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
`;
