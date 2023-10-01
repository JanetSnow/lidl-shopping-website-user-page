import { Facebook, Instagram, Pinterest, Twitter } from '@mui/icons-material';
import React from 'react'
import { styled } from 'styled-components'
import {mobile} from "../responsive";
import {tabletMini} from "../responsive";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
display: flex;
${tabletMini({display: "block"})}
${mobile({display: "block"})}
`;
const Left = styled.div`
flex:1;
display:flex;
flex-direction: column;
padding:20px;
${tabletMini({padding: "0 20px 20px 20px"})}
${mobile({padding: "0 20px 20px 20px"})}
`;
const Image = styled.img`
width: 50px;
height: 50px;
cursor: pointer;
`;
const Desc = styled.p`
margin:20px 0px;
`;

const Center = styled.div`
flex:1;
padding:20px;
${tabletMini({padding: "0 20px 20px 20px"})}
${mobile({padding: "0 20px 20px 20px"})}
`;
const Title = styled.h3`
margin-bottom:30px;
`;
const List = styled.ul`
margin: 0;
padding:0;
list-style:none;
display:flex;
flex-wrap:wrap;
`;
const ListItem = styled.li`
width:50%;
margin-bottom:10px;
cursor: pointer;

&:hover{
    text-decoration: underline;
}
`;
const Right = styled.div`
flex:1;
display:flex;
align-items: center;
justify-content: center;
${tabletMini({padding: "0 20px 20px 20px"})}
${mobile({padding: "0 20px 20px 20px"})}
`;
const SocialContainer = styled.div`
display:flex;
`;
const SocialIcon = styled.div`
width:40px;
height:40px;
display:flex;
align-items: center;
justify-content: center;
margin-right:20px;
cursor:pointer;
`;
const Footer = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  }
  const goCart = () => {
    navigate("/cart");
  }
  const goAdmin = () => {
    window.location.replace('https://lidl-shopping-website-admin.onrender.com/');
  }
  const linkFacebook = () => {
    window.location.replace('https://www.facebook.com/lidlgb');
  }
  const linkIns = () => {
    window.location.replace('https://www.instagram.com/lidlgb/?hl=en');
  }
  const linkTwitter = () => {
    window.location.replace('https://twitter.com/LidlGB');
  }
  const linkPint = () => {
    window.location.replace('https://www.pinterest.co.uk/lidlGB/');
  }
  return (
    <Container>
      <Left>
      <Image src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Lidl_logo.png" />
      <Desc>The Lidl brand was founded in Germany and has grown a great deal to become one of Europe's 
      leading food retailers. To find out more about Lidl GB, please visit our corporate website.</Desc>
      </Left>
      <Center>
        <Title>Links</Title>
        <List>
          <ListItem onClick={goHome}>Home</ListItem>
          <ListItem onClick={goCart}>Cart</ListItem>
          <ListItem onClick={goAdmin}>Admin Page</ListItem>
          {/* <ListItem>My Account</ListItem>
          <ListItem>Cooperation</ListItem>
          <ListItem>Terms</ListItem> */}
        </List>
      </Center>
      <Right>
      <SocialContainer>
        <SocialIcon>
            <Facebook onClick={linkFacebook} />
        </SocialIcon>
        <SocialIcon>
            <Instagram onClick={linkIns} />
        </SocialIcon>
        <SocialIcon>
            <Twitter onClick={linkTwitter} />
        </SocialIcon>
        <SocialIcon>
            <Pinterest onClick={linkPint} />
        </SocialIcon>
      </SocialContainer>
      </Right>
    </Container>
  )
}

export default Footer
