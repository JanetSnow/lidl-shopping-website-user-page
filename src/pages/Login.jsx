import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from 'styled-components';
import { login } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Container = styled.div`
width: 100vw;
height: 100vh;
`;
const Navbar = styled.div``;
const NavItems = styled.div`
display:flex;
/* align-items: center; */
justify-content: flex-end;
padding: 10px 20px;
`;
const NavItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;
`;
const Image = styled.img`
width: 80px;
height: 80px;
cursor: pointer;
margin-left: 20px;
margin-bottom: 20px;
`;
const DivideLine = styled.hr`
opacity: 0.5;
`;
const Wrapper = styled.div`
display: flex;
align-items:center;
justify-content: center;
margin-top: 40px;
`;
const LoginDetail = styled.div`
width: 30%;
padding: 20px;
background-color: #f2f3f5;
`;
const Form = styled.form`
display:flex;
flex-direction: column;
`;
const Title = styled.h1`
font-size:24px;
font-weight:300;
margin-bottom:10px;
`;
const Input = styled.input`
flex: 1;
min-width: 40%;
margin:10px 0;
padding:10px;
`;
const Button = styled.button`
width:40%;
border: none;
padding: 15px 20px;
background-color:#015AA2;
color:white;
cursor:pointer;
margin-bottom:10px;

&:hover{
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.5); 
    transition: all 0.3s ease 0s;
    transform: translateY(-1px);
}

&:disabled{
  background-color: green;
  cursor: not-allowed;
}
`;
const LinkR = styled.a`
margin:5px 0px;
font-size: 12px;
text-decoration: underline;
cursor:pointer;

&:hover{
  color: #015AA2;
}
`;

const Error = styled.span`
color:red;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching, error} = useSelector((state) => state.user);

  const handleLogin = e => {
    e.preventDefault();
    login(dispatch, {email,password});
  }
  return (
    <Container>
      <Navbar>
        <NavItems>
          <Link to="/register" style={{ textDecoration: 'none', color:"black" }}>
            <NavItem>REGISTER</NavItem>
          </Link>
          <NavItem>CONTACT US</NavItem>
        </NavItems>
        <Link to="/">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Lidl_logo.png" />
        </Link>
        <DivideLine></DivideLine>
      </Navbar>
      <Wrapper>
        <LoginDetail>
        <Title>SIGN IN</Title>
        <Form>
            <Input placeholder="email" onChange={e => setEmail(e.target.value)} />
            <Input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
            <Button onClick={handleLogin}>LOGIN</Button>
            {error && <Error>Your email or password is not correct</Error>}
            <LinkR>DO NOT REMEMBER THE PASSWORD?</LinkR>
            <LinkR>CREATE A NEW ACCOUNT</LinkR>
        </Form>
        </LoginDetail>
      </Wrapper>
    </Container>
  )
}

export default Login
