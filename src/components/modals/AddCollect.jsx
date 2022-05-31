import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

function AddCollect(props) {
  const [collections, setCollections] = useState([
    {
      id: 1,
      name: "Example 1",
      animesId: [],
    },
    {
      id: 2,
      name: "Example 2",
      animesId: [],
    },
    {
      id: 3,
      name: "Example 3",
      animesId: [],
    },
  ]);

  const [collectionChoosed, setCollectionChoosed] = useState(-1);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollection, setNewCollection] = useState(true);

  const handleAddToCollection = (e) => {
    e.preventDefault();
    let tempCollections = [];
    // console.log(new Date().getUTCMilliseconds());
    // console.log(collectionChoosed);

    if (Number(collectionChoosed) > 0) {
      tempCollections = collections.map((collection) => {
        if (Number(collection.id) === Number(collectionChoosed)) {
          collection.animesId.push(props.idAddCollect);
        }
        return collection;
      });
    } else {
      tempCollections = collections.map((collection) => {
        return collection;
      });

      tempCollections.push({
        id: new Date().getUTCMilliseconds(),
        name: newCollectionName,
        animesId: [props.idAddCollect],
      });
    }

    setCollections(tempCollections);
    localStorage.setItem("collections", JSON.stringify(tempCollections));

    setCollectionChoosed(-1);
    setNewCollection(true);
    setNewCollectionName("");
    props.handleAddCollect();
  };

  const hanldeCollectionOption = (e) => {
    setCollectionChoosed(e.target.value);
    if (Number(e.target.value) < 1) {
      setNewCollection(true);
    } else {
      setNewCollection(false);
    }
  };

  useEffect(() => {
    console.log(collections);
  });
  return (
    <>
      {props.showModal && (
        <Wrapper>
          <Card>
            <Title>Add to Collection</Title>
            <Form onSubmit={handleAddToCollection}>
              <Div>
                <Label>My Collections</Label>
                <Select
                  value={collectionChoosed}
                  onChange={(e) => hanldeCollectionOption(e)}
                >
                  <Option value={0}>New Collection</Option>
                  {collections.map((collection) => {
                    return (
                      <Option value={collection.id} key={collection.id}>
                        {collection.name}
                      </Option>
                    );
                  })}
                </Select>
              </Div>
              {newCollection && (
                <Div>
                  <Label>New Collection Name</Label>
                  <Input
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    required
                  />
                </Div>
              )}
              <Action>
                <ButtonCancel onClick={props.handleAddCollect}>
                  Cancel
                </ButtonCancel>
                <ButtonSave type="submit">Save</ButtonSave>
              </Action>
            </Form>
          </Card>
        </Wrapper>
      )}
    </>
  );
}

export default AddCollect;

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

const Form = styled.form`
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

const Select = styled.select`
  height: 32px;
  border-radius: 6px;
  outline: none;
  padding: 4px 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.darkAlt};
  border: 1px solid ${({ theme }) => theme.color.lightAlt};
`;

const Option = styled.option`
  font-size: 14px;
  padding: 4px 4px;
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
  cursor: pointer;
  color: ${({ theme }) => theme.color.light};
  background-color: ${({ theme }) => theme.color.lightAlt};
`;
const ButtonSave = styled(ButtonCancel)`
  background-color: ${({ theme }) => theme.color.green};
`;
