import React from "react";
import { actions, reducer, initialState } from "./Reducer";

export const Collections = React.createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    collections: state.collections,
    getLocalStorage: () => {
      dispatch({ type: actions.GET_LOCAL_STORAGE });
    },
    addCollect: (newCollect) => {
      dispatch({ type: actions.ADD_COLLECT, newCollect });
    },
    removeCollect: (idAnime) => {
      dispatch({ type: actions.REMOVE_COLLECT, idAnime });
    },
    addCollection: (collectionName) => {
      dispatch({ type: actions.ADD_COLLECTION, collectionName });
    },
    editCollection: (newCollection) => {
      dispatch({ type: actions.EDIT_COLLECTION, newCollection });
    },
    deleteCollection: (collectionId) => {
      dispatch({ type: actions.DELETE_COLLECTION, collectionId });
    },
  };

  return <Collections.Provider value={value}>{children}</Collections.Provider>;
};
