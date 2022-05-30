import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

function ModalCollect(props) {
  const [collections, setCollections] = useState([
    {
      name: "Example 1",
      anime: [],
    },
    {
      name: "Example 2",
      anime: [],
    },
    {
      name: "Example 3",
      anime: [],
    },
  ]);

  const [collectionIndex, setCollectionIndex] = useState(-1);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollection, setNewCollection] = useState(true);

  const handleAddToCollection = (e) => {
    e.preventDefault();
    let data = [];

    if (collectionIndex >= 0) {
      data = collections.map((collection, index) => {
        if (index == collectionIndex) {
          collection.anime.push(props.idAnime);
        }
        return collection;
      });

      setCollections(data);
    } else {
      data = [];
      data = collections.map((collection) => {
        return collection;
      });

      data.push({
        name: newCollectionName,
        anime: props.idAnime,
      });

      setCollections(data);
    }
  };

  const hanldeCollectionOption = (e) => {
    setCollectionIndex(e.target.value);
    if (e.target.value < 0) {
      setNewCollection(true);
    } else {
      setNewCollection(false);
    }
    // console.log(e.target.value);
  };

  useEffect(() => {
    console.log(collectionIndex);

    console.log(collections);
    // collections.map((collection, index) => {
    //   console.log(index, collection);
    // });
  }, [collections, collectionIndex]);

  return (
    <>
      {props.showModal && (
        <Wrapper>
          <Card>
            <Title>Add to Collection</Title>
            <Close onClick={props.handleCollect}>Close</Close>
            <Form onSubmit={handleAddToCollection}>
              <Div>
                <Label>My Collections</Label>
                <Select
                  value={collectionIndex}
                  onChange={(e) => hanldeCollectionOption(e)}
                >
                  <Option value={-1}>New Collection</Option>
                  {collections.map((collection, index) => {
                    return (
                      <Option value={index} key={index}>
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
                  />
                </Div>
              )}
              <Button>Add</Button>
            </Form>
          </Card>
        </Wrapper>
      )}
    </>
  );
}

export default ModalCollect;

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
  height: 350px;
  padding: 12px;
  background-color: ${({ theme }) => theme.color.light};
`;

const Title = styled.h3`
  font-size: 24px;
`;

const Form = styled.form``;
const Select = styled.select``;
const Option = styled.option``;
const Div = styled.div``;
const Label = styled.label``;
const Input = styled.input``;

const Close = styled.p`
  cursor: pointer;
`;

const Button = styled.button``;
