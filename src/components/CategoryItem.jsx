import React from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
`;
const Title = styled.p`
width: 12.5rem;
padding: 10px 25px 10px 10px;
background-color: white;
cursor:pointer;
border: lightgray 1px;
border-style: none none solid none;
color:black;

&:hover{
     text-decoration: underline;
}
`;

const CategoryItem = ({item}) => {
  return (
    <Container>
        <Link to={`/products/${item.cat}`} style={{ textDecoration: 'none' }}>
            <Title>{item.cat}</Title>
        </Link>
    </Container>
  )
}

export default CategoryItem
