import { styled } from 'styled-components'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Categories from "../components/Categories";
import { ExpandMoreOutlined } from '@mui/icons-material';
import {mobile} from "../responsive";
import {tablet} from "../responsive";
import {tabletMini} from "../responsive";

const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
position: relative;
`;
const Wrapper = styled.div`
width:100%;
height: 90%;
display: flex;
background-size: cover;
background-position: center;
background-image:url(/images/headerBG.jpeg);
${tabletMini({display: "block", height: "92%"})}
${mobile({display: "block", height: "90%"})}
`;
const Left = styled.div`
flex: 1;
margin: 0 35px;
${tablet({width: "244px"})}
${tabletMini({margin:"0 20px", fontSize:"15px"})}
${mobile({margin:"0 20px", fontSize:"15px"})}
`;
const HomePageGroceryWrapper = styled.div`
display: flex;
align-items: center;
background-color: white;
border: #429cf5 2px;
border-style: solid solid none solid;
padding:0px 5px;
`;
const GroceryTitle = styled.h2`
font-size:18px;
padding: 10px 25px 10px 10px;
cursor: pointer;
&:hover{
    text-decoration: underline solid 2px #429cf5;
}
`;

const MenuItems = styled.div`
background-color: white;
padding:0px 5px;
border: #429cf5 2px;
border-style: none solid solid solid; 
`;

const TabletTopItems = styled.div`
flex:5;
display: flex;
${tablet({display: "flex", flexDirection: "column"})}
`;
const Center = styled.div`
flex:3;
margin-right: ${props =>props.user && "50px"};
${mobile({display:"none"})}
${tabletMini({display:"none"})}
`;
const Intro = styled.div`
height: 180px;
border-radius: 5px;
margin-top: 75px;
background-color: white;
padding: 40px 30px;
${tablet({margin: "30px 35px 0px 0"})}
`;
const IntroTitle = styled.p`
font-weight: 600;
`
const IntroContent = styled.p``;

const Right = styled.div`
flex:2;
height: 260px;
border-radius: 5px;
margin: 75px 50px 0px 40px;
background-color: white;
padding: 20px;
${tablet({margin: "30px 35px 30px 0"})}
${tabletMini({ margin:"20px 35px", padding: "15px 20px"})}
${mobile({margin: "30px 35px", padding:"20px"})}

display: ${props =>props.user && "none"};
`;
const WelcomeTitle = styled.h4`
font-weight: 500;
font-size: 26px;
${tabletMini({ fontSize: "18px"})}
${mobile({ fontSize: "26px"})}
`;
const SRWrapper = styled.div`
font-weight: 600;
${tabletMini({ fontSize: "14px"})}
`;
const SignIn = styled.div`
margin-top:30px;
${tabletMini({ marginTop:"10px"})}
${mobile({ marginTop:"15px"})}
`;
const SignInQ = styled.p`
text-align: center;
margin-bottom: 5px;
`;
const SignInButton = styled.button`
color: white;
font-size: 18px;
background-color: #015AA2;
padding: 10px;
border-radius: 5px;
border:none;
width: 100%;
cursor: pointer;

&:hover{
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.5); 
    transition: all 0.3s ease 0s;
    transform: translateY(-1px);
}
${tabletMini({ padding: "5px"})}
${mobile({ padding: "10px"})}
`;
const Register = styled.div`
margin-top:30px;
${tabletMini({ marginTop: "10px"})}
${mobile({ marginTop: "15px"})}
`;
const RegisterQ = styled.p`
text-align: center;
margin-bottom: 5px;
`;
const RegisterButton = styled.p`
color: #015AA2;
font-size: 18px;
background-color: white;
padding: 10px;
border-radius: 5px;
border:1px solid #015AA2;
text-align: center;
cursor: pointer;

&:hover{
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.5); 
    transition: all 0.3s ease 0s;
    transform: translateY(-1px);
}
${tabletMini({ padding: "5px"})}
${mobile({ padding: "10px"})}
`;

const Header = () => {
    const user = useSelector(state => state.user.currentUser);
    return (
        <Container>
        <Wrapper>
        <Left>
            <HomePageGroceryWrapper>
                <GroceryTitle>Groceries</GroceryTitle>
                <ExpandMoreOutlined></ExpandMoreOutlined>
            </HomePageGroceryWrapper>
            <MenuItems>
                <Categories />
            </MenuItems>
        </Left>
        <TabletTopItems>
        <Center user={user}>
            <Intro>
            <IntroTitle>At Lidl, we’re always Lidl on price.
            </IntroTitle>
            <br/>
            <IntroContent>
            On everything from big brands to totally fresh fruit and veg. This means that you could pay less for more, whether you’re popping in for essentials or doing your weekly shop!
            </IntroContent>
            </Intro>
        </Center>
        <Right user={user}>
            <WelcomeTitle>
                Welcome to Lidl
            </WelcomeTitle>
            <SRWrapper>
                <SignIn>
                    <SignInQ>Already a customer?</SignInQ>
                    <Link to="login" style={{ textDecoration: 'none' }}>
                        <SignInButton>Sign in</SignInButton>
                    </Link>
                </SignIn>
                <Register>
                    <RegisterQ>New to Lidl?</RegisterQ>
                    <Link to="register" style={{ textDecoration: 'none' }}>
                        <RegisterButton>Register</RegisterButton>
                    </Link>
                </Register>
            </SRWrapper>
        </Right>
        </TabletTopItems>
        </Wrapper>
        </Container>
    )
}

export default Header
