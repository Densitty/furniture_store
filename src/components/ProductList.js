import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const data = useFilterContext();
  const { filteredProducts: products, gridView } = data;

  if (products.length < 1) {
    // by default, filteredProducts from state is an empty [] until data is passed to it via api request
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search ...
      </h5>
    );
  }

  if (!gridView) {
    return <ListView products={products} />;
  }

  return <GridView products={products}>product list</GridView>;
};

export default ProductList;
