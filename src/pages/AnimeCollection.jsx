import React, { useEffect, useContext, useState } from "react";
import styled from "@emotion/styled";
import Container from "../components/Container";
import { Collections } from "../stores/Context";
import { useQuery } from "@apollo/client";
import getAnimeDetail from "../graphql/GetAnimeDetail";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AddCollection from "../components/modals/AddCollection";
import EditCollection from "../components/modals/EditCollection";
import DeleteCollection from "../components/modals/DeleteCollection";
import toast, { Toaster } from "react-hot-toast";

function AnimeCollection() {
  const [filterActive, setFilterActive] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [collectionFilter, setCollectionFilter] = useState({
    id: null,
    name: "",
    animesId: [],
  });
  const {
    collections,
    getLocalStorage,
    addCollection,
    editCollection,
    deleteCollection,
  } = useContext(Collections);

  const handleChangeFilter = (collection) => {
    setFilterActive(true);
    setCollectionFilter({
      id: collection.id,
      name: collection.name,
      animesId: collection.animesId,
    });
  };

  const handleModalAdd = () => {
    setShowModalAdd(!showModalAdd);
  };

  const handleAddCollection = (collectionName) => {
    addCollection(collectionName);
    toast.success("New collection has been added");
  };

  const handleModalEdit = () => {
    setShowModalEdit(!showModalEdit);
  };

  const handleEditCollection = (collectionName) => {
    editCollection({
      id: collectionFilter.id,
      name: collectionName,
    });
    toast.success("The collection has been renamed");
  };

  const handleModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  const handleDeleteCollection = () => {
    deleteCollection(collectionFilter.id);
    toast.success("The collection has been deleted");
  };

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    if (!filterActive) {
      setCollectionFilter(collections[0]);
    }
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AddCollection
        showModal={showModalAdd}
        handleModal={handleModalAdd}
        collections={collections}
        handleAddCollection={handleAddCollection}
      />
      <EditCollection
        showModal={showModalEdit}
        handleModal={handleModalEdit}
        oldCollectionName={collectionFilter.name}
        collections={collections}
        handleEditCollection={handleEditCollection}
      />
      <DeleteCollection
        showModal={showModalDelete}
        handleModal={handleModalDelete}
        oldCollectionName={collectionFilter.name}
        handleDeleteCollection={handleDeleteCollection}
      />
      <Container>
        <Collection>
          <Filter>
            {collections.map((collection) => {
              return (
                <FilterList
                  key={collection.id}
                  isActive={collection.id === collectionFilter.id}
                  onClick={() => handleChangeFilter(collection)}
                >
                  {collection.name}
                </FilterList>
              );
            })}
          </Filter>
          <Utils>
            <AddNew onClick={handleModalAdd}>Add New Collection</AddNew>
            <Edit onClick={handleModalEdit}>Edit Collection</Edit>
            <Delete onClick={handleModalDelete}>Delete Collection</Delete>
          </Utils>
          <Grid>
            {collectionFilter.animesId.map((id, index) => {
              return <Card key={index} idAnime={id} />;
            })}
            {collectionFilter.animesId.length < 5 && (
              <>
                <div></div> <div></div> <div></div> <div></div>
              </>
            )}
          </Grid>
        </Collection>
      </Container>
    </>
  );
}

function Card(props) {
  const navigate = useNavigate();
  const { data } = useQuery(getAnimeDetail, {
    variables: { id: props.idAnime },
  });

  const handleToDetail = (id) => {
    navigate("/anime/" + id + "/detail");
  };

  return (
    <Cards onClick={() => handleToDetail(data?.Media?.id)}>
      <Img
        src={data?.Media?.coverImage.large}
        alt={data?.Media?.title.english}
      />
      <Title>
        {data?.Media?.title.english} - {data?.Media?.title.native}
      </Title>
      <Rating>
        <AiFillStar />
        {data?.Media?.averageScore} / 100
      </Rating>
      <Episodes>{data?.Media?.episodes} Episodes</Episodes>
    </Cards>
  );
}

export default AnimeCollection;

const Collection = styled.div`
  padding: 96px 0;
  width: 100%;
  min-height: 100vh;
`;

const Filter = styled.ul`
  width: 100%;
  overflow: scroll;
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 18px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterList = styled.li`
  cursor: pointer;
  list-style: none;
  padding: 4px 8px;
  border-radius: 6px;
  border: 2px solid ${({ theme }) => theme.color.green};
  background-color: ${(props) => props.isActive && props.theme.color.green};
  color: ${(props) =>
    props.isActive ? props.theme.color.light : props.theme.color.green};
`;

const AddNew = styled(FilterList)`
  border: 2px solid ${({ theme }) => theme.color.lightAlt};
  background-color: ${({ theme }) => theme.color.lightAlt};
  color: ${({ theme }) => theme.color.dark};
  font-weight: 600;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  width: 100%;
`;

const Cards = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
  border-radius: 6px;
  border: none;
  background: ${({ theme }) => theme.color.white};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  &:hover {
    transform: scale(102%);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border: none;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  color: ${({ theme }) => theme.color.darkAlt};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.green};
  }
`;

const Episodes = styled.p`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  bottom: 15px;
  right: 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  padding: 2px 6px;
  background-color: ${({ theme }) => theme.color.green};
  color: ${({ theme }) => theme.color.light};
`;

const Rating = styled.p`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  top: 5px;
  left: 5px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  padding: 2px 6px;
  background-color: ${({ theme }) => theme.color.orange};
`;

const Collect = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 15px;
  left: 10px;
  border-radius: 4px;
  padding: 2px 4px;
  font-size: 18px;
  border: 2px solid ${({ theme }) => theme.color.green};
  color: ${({ theme }) => theme.color.green};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.green};
    color: ${({ theme }) => theme.color.white};
  }
`;

const Collected = styled(Collect)`
  z-index: 5;
  color: ${({ theme }) => theme.color.light};
  border: 2px solid ${({ theme }) => theme.color.lightAlt};
  background-color: ${({ theme }) => theme.color.lightAlt};
  cursor: auto;
  &:hover {
    color: ${({ theme }) => theme.color.light};
    border: 2px solid ${({ theme }) => theme.color.lightAlt};
    background-color: ${({ theme }) => theme.color.lightAlt};
  }
`;

const Utils = styled.div`
  width: 100%;
  overflow: scroll;
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Edit = styled(AddNew)``;

const Delete = styled(AddNew)``;
