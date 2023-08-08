import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { ExpandMoreOutlined } from '@mui/icons-material';
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import {mobile} from "../responsive";

const Container = styled.div``;
const Grocery = styled.div`
`;
const GroceryWrapper = styled.div`
display: flex;
align-items: center;
width:214.5px;
margin-left:35px;
cursor: pointer;
`;
const GroceryTitle = styled.h2`
font-size:18px;
width:100px;
padding: 10px 15px;
/* margin:0px 35px; */
`;

const Hr = styled.hr`
opacity: 0.5;
`;
const GroceryMenuItems = styled.div`
padding:0 3rem;
height:100vh;
position: absolute;
z-index:1;
left:${(props) => (props.clicked === "true"? "0" : "-27.5rem")};
`;
const ProductListWrapper = styled.div`
background-color: ${(props) => (props.clicked === "true" && "gray")};
opacity: ${(props) => (props.clicked === "true" && "0.5")};
`;

const Title = styled.h1`
  padding: 20px;
  font-weight: 600;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({fontSize:"15px"})}
`;

const Select = styled.select`
  padding: 10px;
  ${mobile({padding:"5px"})}
`;
const Option = styled.option``;

const ProductList = () => {
  const [click, setClick] = useState(false);
  const NavbarToggle = () => {setClick(!click);};
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [sort, setSort] = useState("newest");

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Grocery>
        <GroceryWrapper onClick={NavbarToggle}>
            <GroceryTitle>Groceries</GroceryTitle>
            <ExpandMoreOutlined></ExpandMoreOutlined>
        </GroceryWrapper>
        <Hr/>
        <GroceryMenuItems clicked={click.toString()}>
            <Categories />
        </GroceryMenuItems>
      </Grocery>

      <ProductListWrapper clicked={click.toString()}>
        <Title>Dresses</Title>
        <Filter>
          <FilterText>Sort by:</FilterText>
          <Select onChange={(e)=>setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
        <Products cat={cat} sort={sort} />
      </ProductListWrapper>

      <Footer />
    </Container>
  );
};

export default ProductList;
