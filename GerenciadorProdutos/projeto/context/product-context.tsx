import React, { createContext, useReducer } from "react";

const initialState = {
  products: [
    {
      id: 1,
      name: "Teclado Mecânico",
      category: "Informática",
      quantity: 10,
      price: 250.0,
    },
    {
      id: 2,
      name: "Fone de Ouvido Bluetooth",
      category: "Áudio",
      quantity: 5,
      price: 120.0,
    },
    {
      id: 3,
      name: "Monitor Full HD",
      category: "Informática",
      quantity: 3,
      price: 900.0,
    },
  ],
};

const ProductContext = createContext({});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "addProduct":
      const newProduct = {
        ...action.payload,
        id: state.products.length
          ? state.products[state.products.length - 1].id + 1
          : 1,
      };
      return { ...state, products: [...state.products, newProduct] };

    case "updateProduct":
      return {
        ...state,
        products: state.products.map((product: any) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    case "deleteProduct":
      return {
        ...state,
        products: state.products.filter(
          (product: any) => product.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};

export const ProductProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContext;