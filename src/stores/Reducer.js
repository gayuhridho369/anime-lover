export const initialState = {
  collections: [
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
  ],
};

export const actions = {
  GET_LOCAL_STORAGE: "GET_LOCAL_STORAGE",
  ADD_COLLECT: "ADD_COLLECT",
  REMOVE_COLLECT: "REMOVE_COLLECT",
  ADD_COLLECTION: "ADD_COLLECTION",
  EDIT_COLLECTION: "EDIT_COLLECTION",
  DELETE_COLLECTION: "DELETE_COLLECTION",
};

const setToLocalStorage = (collections) => {
  localStorage.setItem("collections", JSON.stringify(collections));
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.GET_LOCAL_STORAGE:
      const localCollections = JSON.parse(localStorage.getItem("collections"));
      if (localCollections) {
        return { collections: localCollections };
      } else {
        return { collections: state.collections };
      }

    case actions.ADD_COLLECT:
      const { idAnime, idCollection, newCollectionName } = action.newCollect;
      let updateCollections = [];

      if (Number(idCollection) > 0) {
        updateCollections = state.collections.map((collection) => {
          if (Number(collection.id) === Number(idCollection)) {
            collection.animesId.push(Number(idAnime));
          }
          return collection;
        });

        setToLocalStorage(updateCollections);
        return { collections: updateCollections };
      } else {
        updateCollections = [
          ...state.collections,
          {
            id: new Date().getUTCMilliseconds(),
            name: newCollectionName,
            animesId: [Number(idAnime)],
          },
        ];

        setToLocalStorage(updateCollections);
        return { collections: updateCollections };
      }

    case actions.REMOVE_COLLECT:
      const updateRemoveCollections = state.collections.map((collection) => {
        if (collection.animesId.find((id) => id === action.idAnime)) {
          const index = collection.animesId.indexOf(action.idAnime);
          if (index > -1) {
            collection.animesId.splice(index, 1);
          }
        }
        return collection;
      });
      setToLocalStorage(updateRemoveCollections);
      return { collections: updateRemoveCollections };

    case actions.ADD_COLLECTION:
      const updateAddCollection = [
        ...state.collections,
        {
          id: new Date().getUTCMilliseconds(),
          name: action.collectionName,
          animesId: [],
        },
      ];

      setToLocalStorage(updateAddCollection);
      return { collections: updateAddCollection };

    case actions.EDIT_COLLECTION:
      const updateEditCollections = state.collections.map((collection) => {
        if (Number(collection.id) === Number(action.newCollection.id)) {
          collection.name = action.newCollection.name;
        }
        return collection;
      });

      setToLocalStorage(updateEditCollections);
      return { collections: updateEditCollections };

    case actions.DELETE_COLLECTION:
      const updateDeleteCollection = [];
      state.collections.forEach((collection) => {
        if (collection.id !== Number(action.collectionId)) {
          updateDeleteCollection.push(collection);
        }
      });

      setToLocalStorage(updateDeleteCollection);
      return { collections: updateDeleteCollection };

    default:
      return state;
  }
};
