import React, { useState } from "react";
import styled from "@emotion/styled";

function AddCollection(props) {
  const [newCollectionName, setNewCollectionName] = useState("");
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const handleCancel = () => {
    setError({
      status: false,
      message: "",
    });
    props.handleModal();
    setNewCollectionName("");
  };

  const handleSave = () => {
    let BreakError = false;

    if (
      newCollectionName === "" ||
      newCollectionName.replace(/^\s+|\s+$/g, "").length === 0
    ) {
      setError({
        status: true,
        message: "New Collection Name is required!",
      });

      BreakError = true;
    }

    props.collections.forEach((collection) => {
      if (collection.name === newCollectionName) {
        setError({
          status: true,
          message: "New Collection Name already used!",
        });

        BreakError = true;
      }
    });

    if (BreakError) return;

    props.handleAddCollection(newCollectionName);
    props.handleModal();
    setNewCollectionName("");
    setError({
      status: false,
      message: "",
    });
  };

  return (
    <>
      {props.showModal && (
        <Wrapper>
          <Card>
            <Title>Add New Collection</Title>
            <Form>
              <Div>
                <Label>New Collection Name</Label>
                <Input
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                />
                <Error>{error.status && error.message}</Error>
              </Div>
              <Action>
                <ButtonCancel onClick={handleCancel}>Cancel</ButtonCancel>
                <ButtonSave onClick={handleSave}>Save</ButtonSave>
              </Action>
            </Form>
          </Card>
        </Wrapper>
      )}
    </>
  );
}

export default AddCollection;

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

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.color.darkAlt};
  font-weight: 500;
  font-size: 16px;
`;

const Input = styled.input`
  height: 32px;
  border-radius: 6px;
  outline: none;
  padding: 4px 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.darkAlt};
  border: 1px solid ${({ theme }) => theme.color.lightAlt};
`;

const Error = styled.span`
  font-size: 14px;
  font-style: italic;
  color: red;
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
