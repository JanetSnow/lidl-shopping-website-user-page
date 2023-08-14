import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/apiCalls";
import { Link } from "react-router-dom";

const Container = styled.div`
  /* width: 100vw;
  height: 85vh; */
  /* display: flex;
  align-items: center;
  flex-direction: column; */
  position: relative;
  overflow: hidden;
  margin: 20px;
`;
const Header = styled.h1`
font-size: 24px;
margin-bottom: 30px;
text-decoration: underline;
text-align: center;
`;
const ProductContainer = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
place-content: center;
grid-gap: 30px;
`;

const FlavourWeekProduct = styled.div`
position: relative;
height: 450px;
`;

const ImgContainer = styled.div`
  height: 50%;
`;

const Image = styled.img`
  height: 100%;
`;

const InfoContainer = styled.div`
  padding: 10px 20px;
  /* width: 200px; */
`;

const Title = styled.h1`
  font-size: 18px;
`;

const Price = styled.p`
  margin: 20px 0;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 3px;
`;


const Button = styled.button`
  padding: 10px;
  font-size: 12px;
  background-color: transparent;
  cursor: pointer;
`;

const FlavourWeek = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        getProducts(dispatch);
      }, [dispatch]);

    return (
        <Container>
            <Header>Flavour of the Week: Latin America</Header>
            <ProductContainer>
            {products.map(item => (
                item.isFlavourWeek && 
                <FlavourWeekProduct key={item._id}>
                    <ImgContainer>
                    <Image src={item.img} />
                    </ImgContainer>
                    <InfoContainer>
                    <Title>{item.title}</Title>
                    <Price>£{item.price}</Price>
                    <Link to={`/product/${item._id}`}>
                        <Button>SEE DETAILS</Button>
                    </Link>
                    </InfoContainer>
                </FlavourWeekProduct>
            ))}
            </ProductContainer>

        </Container>
    )
}
export default FlavourWeek;