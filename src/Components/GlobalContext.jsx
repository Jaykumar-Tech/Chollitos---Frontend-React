import React, { createContext, useState, useEffect } from 'react';
import { getCategoriesService, } from "../Services/Category";
import { getStoresService, } from "../Services/Store";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);

  const getCategories = async () => {
    const data = await getCategoriesService();
    setCategories(data);
  };

  const getStores = async () => {
    const data = await getStoresService();
    setStores(data);
  };

  useEffect(() => {
    getCategories();
    getStores();
  }, []);

  const globalProps = {
    categories: categories,
    stores: stores,
  };

  return (
    <GlobalContext.Provider value={{ globalProps }}>
      {children}
    </GlobalContext.Provider>
  );
};