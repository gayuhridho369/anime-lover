import React from "react";
import styled from "@emotion/styled";
import { MdError } from "react-icons/md";

function Error() {
  return (
    <Flex>
      <Icon>
        <MdError />
      </Icon>
      <Text>Oooppps!!! Something is wrong, can't get data from server.</Text>
    </Flex>
  );
}

export default Error;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.div`
  font-size: 64px;
  color: ${({ theme }) => theme.color.green};
`;

const Text = styled.p`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.darkAlt};
`;
