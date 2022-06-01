import React from "react";
import styled from "@emotion/styled";

function DeleteCollection(props) {
  const handleDelete = () => {
    props.handleDeleteCollection();
    props.handleModal();
  };

  return (
    <>
      {props.showModal && (
        <Wrapper>
          <Card>
            <Title>Delete Collection</Title>
            <Form>
              <Text>
                Are you sure to delete collection{" "}
                <Strong>{props.oldCollectionName}</Strong>?
              </Text>
              <Action>
                <ButtonCancel onClick={props.handleModal}>No</ButtonCancel>
                <ButtonSave onClick={handleDelete}>Yes</ButtonSave>
              </Action>
            </Form>
          </Card>
        </Wrapper>
      )}
    </>
  );
}

export default DeleteCollection;

const Wrapper = styled.div`
  position: fixed;
  z-index: 99;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const Card = styled.div`
  width: 450px;
  height: max-content;
  padding: 18px 24px;
  margin: 32px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.light};
`;

const Title = styled.h3`
  text-align: center;
  color: ${({ theme }) => theme.color.green};
  margin-bottom: 18px;
  font-size: 24px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.color.darkAlt};
  margin-bottom: 12px;
`;

const Strong = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.color.green};
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 12px;
`;

const ButtonCancel = styled.button`
  padding: 8px 12px;
  border: none;
  outline: none;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  color: ${({ theme }) => theme.color.light};
  background-color: ${({ theme }) => theme.color.lightAlt};
`;
const ButtonSave = styled(ButtonCancel)`
  background-color: ${({ theme }) => theme.color.green};
`;
