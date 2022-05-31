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
      data = [];
      data = collections.map((collection, index) => {
        if (index == collectionIndex) {
          collection.anime.push(props.idAnime);
        }
        return collection;
      });

      setCollections(data);
      localStorage.setItem("collections", JSON.stringify(data));
      resetModal();
    } else {
      data = [];
      let isUnique = true;
      data = collections.map((collection) => {
        if (collection.name === newCollectionName) isUnique = false;
        return collection;
      });

      if (isUnique && newCollection !== " ") {
        data.push({
          name: newCollectionName,
          anime: [props.idAnime],
        });

        setCollections(data);
        localStorage.setItem("collections", JSON.stringify(data));
        resetModal();
      } else {
        alert("Error");
      }
    }
  };

  const resetModal = () => {
    setCollectionIndex(-1);
    setNewCollection(true);
    setNewCollectionName("");

    props.handleCollect();
  };

  const hanldeCollectionOption = (e) => {
    setCollectionIndex(e.target.value);
    if (e.target.value < 0) {
      setNewCollection(true);
    } else {
      setNewCollection(false);
    }
  };

  const animesCollected = () => {
    let animes = [];
    collections.forEach((collection) => {
      collection.anime.forEach((id) => {
        animes.push({
          id: id,
          name: collection.name,
        });
      });
    });
    props.animesCollected(animes);
    // console.log(animes);
  };

  useEffect(() => {
    const localCollections = JSON.parse(localStorage.getItem("collections"));
    if (localCollections) {
      setCollections(localCollections);
    }
  }, []);

  useEffect(() => {
    animesCollected();
  }, [collections]);

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
