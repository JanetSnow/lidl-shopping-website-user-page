import { Search } from '@mui/icons-material';
import { styled } from 'styled-components'
import {mobile} from "../responsive";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/apiCalls';

const Container = styled.div`
width:100vw;
height:180px;
`;
const NavItems = styled.div`
display:flex;
/* align-items: center; */
justify-content: flex-end;
padding: 10px 50px;
`;
const NavItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;

&:hover{
  text-decoration: underline;
}
`;
const Wrapper = styled.div`
padding: 10px 40px;
margin: 0px 10px;
display: flex;
align-items: center;
justify-content: space-between;
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
`;
const Slogan = styled.h1`
font-weight: bold;
font-size:16px;
color: #015AA2;
${mobile({fontSize:"12px"})}
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
${mobile({marginLeft:"15px"})}
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

const CartNavbar = () => {
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogOut = (e) => {
      e.preventDefault();
      logout(dispatch);
  }
 
  return (
    <Container>
      <NavItems>
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
              <Search style={{color: "gray", fontSize: 24}}/>
              <Input placeholder= "Find a product"/>
          </SearchContainer>
          </Center>
          <Right>
          </Right>
      </Wrapper>
    </Container>
  )
}

export default CartNavbar

