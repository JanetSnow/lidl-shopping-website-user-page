import { styled } from "styled-components"
import {mobile} from "../responsive";

const Container = styled.div`
height: 30px;
background-color: #015AA2;
color: white;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
font-weight: 500;
${mobile({height:"50px",width:"100vw"})}
`;

const Announcement = () => {
  return (
    <Container>
      Super Deal! Free shipping on Orders Over $25
    </Container>
  )
}

export default Announcement
