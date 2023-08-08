import { Link } from "react-router-dom";
import { styled } from 'styled-components';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

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
const RegisterDetail = styled.div`
width: 50%;
padding: 20px;
background-color: #f2f3f5;
`;
const Form = styled.form`
display:flex;
flex-wrap:wrap;
`;
const Title = styled.h1`
font-size:24px;
font-weight:300;
margin-bottom:10px;
`;
const Input = styled.input`
flex: 1;
min-width: 40%;
margin:10px 5px 10px 5px;
padding:10px;
`;
const Agreement = styled.span`
font-size: 12px;
margin:20px 0px;
`;
const Button = styled.button`
width:40%;
border: none;
padding: 15px 20px;
background-color:#015AA2;
color:white;
cursor:pointer;

&:hover{
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.5); 
    transition: all 0.3s ease 0s;
    transform: translateY(-1px);
}
`;
const Error = styled.span`
color:red;
`;
const Success = styled.span`
/* color:red; */
display: flex;
align-items: center;
justify-items: center;
margin-left: 20px;
`;
const LoginLink = styled.span`
/* color:red; */
color:#015AA2;
margin-left:5px;
`;

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  // const {currentUser} = useSelector((state) => state.user);


  const handleClick = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await publicRequest.post("/auth/register", {
        firstname,
        lastname,
        username,
        email,
        password,
      });
    } catch (err) {
      setError(true);
    }
  };

  // const handleClick = e => {
  //   e.preventDefault();
  //   register(dispatch, {firstname,lastname,username,email,password});
  // }

  return (
    <Container>
      <Navbar>
        <NavItems>
          <Link to="/login" style={{ textDecoration: 'none', color:"black" }}>
            <NavItem>SIGN IN</NavItem>
          </Link>
          <NavItem>CONTACT US</NavItem>
        </NavItems>
        <Link to="/">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Lidl_logo.png" />
        </Link>
        <DivideLine></DivideLine>
      </Navbar>
      <Wrapper>
        <RegisterDetail>
        <Title>CREATE YOUR ACCOUNT</Title>
        <Form>
            <Input placeholder="first name" onChange={(e) => setFirstname(e.target.value)}/>
            <Input placeholder="last name" onChange={(e) => setLastname(e.target.value)}/>
            <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
            <Input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
            <Agreement> By creating a Lidl account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b></Agreement>
            <Button onClick={handleClick} >CREATE ACCOUNT</Button>
            {error ? <Error>Your information is not correctly entered</Error> 
            : <Success>go to<Link to="/login"><LoginLink>sign in</LoginLink></Link>
            </Success>}
        </Form>
        </RegisterDetail>
      </Wrapper>
    </Container>
  )
}

export default Register
