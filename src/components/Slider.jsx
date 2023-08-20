import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, updateDiscountProduct } from "../redux/apiCalls";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  margin-bottom: 80px;
`;

const DiscountTitle = styled.h1`
font-size: 24px;
margin-bottom: 30px;
text-decoration: underline;
`;

const SubContainer = styled.div`
display: flex;
/* align-items: center; */
justify-items:center;
/* flex-direction: column; */
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 80%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  height: 65%;
  margin: 0 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ImgContainer = styled.div`
  height: 50%;
`;

const Image = styled.img`
  height: 100%;
`;

const InfoContainer = styled.div`
  padding: 10px 20px;
  width: 200px;
`;

const Title = styled.h1`
  font-size: 18px;
`;

const OldPrice = styled.p`
  margin: 20px 0 0 0;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 3px;
  text-decoration:line-through red;
  color:gray;
`;

const NewPrice = styled.p`
  margin: 0 0 20px 0;
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

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  const updatePrice = (product, id) =>{
    const updatedProduct = {...product, newPrice: (product.price - product.price * 0.1).toFixed(2)};
    updateDiscountProduct(id, updatedProduct, dispatch);
  };


  return (
    <Container>
      <DiscountTitle>Pick of the Week</DiscountTitle>
      <SubContainer>
        <Arrow style={{left:10}} direction="left" onClick={() => handleClick("left")}>
            <ArrowLeftOutlined />
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
            {products.map((item) => (
                item.hasDiscount && 
            <Slide key={item._id}>
                <ImgContainer>
                <Image src={item.img} />
                </ImgContainer>
                <InfoContainer>
                <Title>{item.title}</Title>
                <OldPrice>£{item.price}</OldPrice>
                <NewPrice>£{(item.price - item.price * 0.1).toFixed(2)}</NewPrice>
                <Link to={`/product/${item._id}`}>
                    <Button onClick={() => updatePrice(item, item._id)}>SEE DETAILS</Button>
                </Link>
                </InfoContainer>
            </Slide>
            ))}
        </Wrapper>
        <Arrow style={{right:10}} direction="right" onClick={() => handleClick("right")}>
            <ArrowRightOutlined />
        </Arrow>
      </SubContainer>
    </Container>
  );
};

export default Slider;