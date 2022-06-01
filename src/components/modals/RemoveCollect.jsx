import React from "react";
import styled from "@emotion/styled";

function RemoveCollect(props) {
  const handleSaveNewCollect = (e) => {
    props.handleRemoveCollect({
      idAnime: props.idAddCollect,
    });
    props.handleModal();
  };

  return (
    <>
      {props.showModal && (
        <Wrapper>
          <Card>
            <Title>Remove from Collection</Title>
            <Form>
              <Text>Are you sure to remove this anime from collection?</Text>
              <Action>
                <ButtonCancel onClick={props.handleModal}>No</ButtonCancel>
                <ButtonSave onClick={handleSaveNewCollect}>Yes</ButtonSave>
              </Action>
            </Form>
          </Card>
        </Wrapper>
      )}
    </>
  );
}

export default RemoveCollect;

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
