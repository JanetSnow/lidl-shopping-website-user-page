import { Search } from '@mui/icons-material';
import React from 'react'
import { styled } from 'styled-components'
import { Badge } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import {mobile} from "../responsive";
import {tabletMini} from "../responsive";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { logout } from '../redux/apiCalls';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {publicRequest} from "../requestMethods";

const Container = styled.div`
height: 146px;
`;
const NavItems = styled.div`
display:flex;
/* align-items: center; */
justify-content: flex-end;
padding: 10px 50px;
${mobile({justifyContent:"flex-start"})}
`;
const NavItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;

&:hover{
  text-decoration: underline;
}
display: ${(props) => props.type === "hidden" && "none"};
`;
const Wrapper = styled.div`
padding: 10px 40px;
margin: 0px 10px;
display: flex;
align-items: center;
justify-content: space-between;
${tabletMini({padding:"10px 20px"})}
${mobile({padding:"10px 20px"})}
`;

const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
`;
const Image = styled.img`
width: 80px;
height: 80px;
cursor: pointer;
margin-right: 20px;
${tabletMini({width:"40px", height:"40px", marginRight:"8px"})}
${mobile({width:"40px", height:"40px", marginRight:0})}
`;
const Slogan = styled.h1`
font-weight: bold;
font-size:16px;
color: #015AA2;
${tabletMini({fontSize: "12px"})}
${mobile({fontSize: "12px", display: "none"})}
`;
const Center = styled.div`
flex: 1;
text-align: center;
`;
const SearchContainer = styled.div`
border: 0.5px solid lightgray;
display: flex;
align-items: center;
margin-left: 25px;
padding: 5px;
${tabletMini({marginLeft:0})}
${mobile({marginLeft:0})}
`;
const Input = styled.input`
border: none;
`;
const Right = styled.div`
flex: 1;
display:flex;
align-items: center;
justify-content: flex-end;
`;
const MenuItem = styled.div`
font-size: 14px;
cursor: pointer;
`;
const Button = styled.button`
padding: 10px;
background-color: transparent;
margin-right: 15px;
cursor: pointer;
${tabletMini({padding:"5px", fontSize:"10px", margin: "0 8px 0 0"})}
${mobile({padding:"5px", fontSize:"10px", margin: "0 8px 0 0"})}
`;

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity);
  const user = useSelector(state => state.user.currentUser);
  const [title, setTitle] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = (e) => {
      e.preventDefault();
      logout(dispatch);
  }
  const handleSearch = async () => {
    try{
      setTitle(title.charAt(0).toUpperCase() + title.slice(1));
      const res = await publicRequest.get(`/products/findbytitle/${title}`);
      // 要是{}的样子，而不是数组
      res.data[0] && navigate(`/product/${res.data[0]._id}`);
    }catch{}
  };
 
  return (
    <Container>
    <NavItems>
        <Link to="/register" style={{ textDecoration: 'none', color:"black" }}>
          <NavItem type={user && "hidden"}>{!user && "REGISTER"}</NavItem>
        </Link>
        <Link to="/login" style={{ textDecoration: 'none', color:"black" }}>
          <NavItem onClick={user && handleLogOut}>{user ? "SIGN OUT" : "SIGN IN"}</NavItem>
        </Link>
        <Link to="/" style={{ textDecoration: 'none', color:"black" }}>
        <NavItem>HOME</NavItem>
        </Link>
    </NavItems>
    <Wrapper>
        <Left>
        <Link to="/">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Lidl_logo.png" />
        </Link>
        <Slogan>Big on Quality, Lidl on Price</Slogan>
        </Left>
        <Center>
        <SearchContainer>
            <Search style={{color: "gray", fontSize: 24, cursor: "pointer"}} onClick={handleSearch}/>
            <Input placeholder= "Find a product" onChange={e => setTitle(e.target.value)} />
        </SearchContainer>
        </Center>
        <Right>           
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined color="action" />
                </Badge>
              </MenuItem>
            </Link>
        </Right>
    </Wrapper>
    </Container>
  )
}

export default Navbar
