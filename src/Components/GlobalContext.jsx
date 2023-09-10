import React, { createContext, useState, useEffect } from 'react';
import { getCategoriesService } from "../Services/Category";
import { getStoresService } from "../Services/Store";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [categories, _setCategories] = useState([]);
  const [stores, _setStores] = useState([]);

  const getCategories = async () => {
    const data = await getCategoriesService();
    _setCategories(data);
  };

  const getStores = async () => {
    const data = await getStoresService();
    _setStores(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCategories();
      await getStores();
    };
  
    fetchData();
  }, []);

  const globalProps = {
    categories: categories,
    stores: stores,
    _setCategories: _setCategories,
    _setStores: _setStores,
  };

  return (
    <GlobalContext.Provider value={{ globalProps }}>
      {children}
    </GlobalContext.Provider>
  );
};