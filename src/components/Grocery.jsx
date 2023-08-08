import React from 'react'
import { styled } from 'styled-components'
import { ExpandMoreOutlined } from '@mui/icons-material';
import {tablet} from "../responsive";
import {tabletMini} from "../responsive";
import {mobile} from "../responsive";

const HomePageGroceryWrapper = styled.div`
display: flex;
align-items: center;
cursor: pointer;
background-color: white;
border: #429cf5 2px;
border-style: solid solid none solid;
width:245px;
margin:0 35px;
${tablet({width:"240px"})}
${tabletMini({margin:"0 20px"})}
${mobile({margin:"0 20px"})}
`;
const GroceryTitle = styled.h2`
font-size:18px;
width:100px;
padding: 10px 15px;
/* background-color: white; */
${tabletMini({fontSize:"15px"})}
${mobile({fontSize:"15px"})}
`;

const Grocery = () => {
  return (
    <HomePageGroceryWrapper>
      <GroceryTitle>Groceries</GroceryTitle>
      <ExpandMoreOutlined></ExpandMoreOutlined>
    </HomePageGroceryWrapper>
  )
}

export default Grocery
