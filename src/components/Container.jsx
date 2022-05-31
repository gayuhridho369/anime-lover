import styled from "@emotion/styled";

export default styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
  @media only screen and (max-width: 1024px) {
    padding: 0 24px;
  }
  @media only screen and (max-width: 768px) {
    padding: 0 16px;
  }
`;
