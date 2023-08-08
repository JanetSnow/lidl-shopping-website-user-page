import React from 'react'
import { styled } from 'styled-components'
import {mobile} from "../responsive";

const Container = styled.div`
width: 100vw;
height: 22rem;
${mobile({height: "18rem"})}
`;
const Banner = styled.img`
width:100%;
height: 80%;
`;
const Main = () => {
  return (
    <Container>
        <Banner src="images/Banner.jpeg"></Banner>
    </Container>
  )
}

export default Main
