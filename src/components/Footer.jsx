import React from "react";
import styled from "@emotion/styled";
import Container from "./Container";

function Footer() {
  return (
    <Div>
      <Container>
        <Text>
          Build with love by Gayuh Ridho &copy;{" "}
          <Web href="https://gayuhridho.netlify.app" target="_blank">
            gayuhridho.netlify.app
          </Web>
        </Text>
      </Container>
    </Div>
  );
}

export default Footer;

const Div = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Text = styled.p`
  letter-spacing: 0.15px;
  text-align: center;
  color: ${({ theme }) => theme.color.darkAlt};
`;

const Web = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.color.green};
`;
