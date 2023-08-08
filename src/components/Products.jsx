import styled from "styled-components";
import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat,sort}) => {
  const [products, setProducts] = useState([]);

  //useEffect() hook runs the side-effect after initial rendering, and on later renderings only if the dependency value changes. here, the dependency is cat
  useEffect(()=>{
    const getProducts = async () => {
      try{
        const res = await axios.get(`http://localhost:3000/api/products?category=${cat}`);
        setProducts(res.data);
      }catch(err){}
    };
    getProducts();
  },[cat]);


  useEffect(()=>{
    if(sort === "newest"){
      setProducts((prev) => 
        // [...prev] contains all filtered products in that category
        [...prev].sort((a,b) => b.createdAt - a.createdAt)
      );
    } else if (sort === "asc"){
      setProducts((prev) => 
        [...prev].sort((a,b) => a.price - b.price)
      );
    } else {
      setProducts((prev) => 
        [...prev].sort((a,b) => b.price - a.price)
      );
    }
  },[sort]);



  return (
    <Container>
      {products.map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;