import { Add, Remove } from '@mui/icons-material';
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ExpandMoreOutlined } from '@mui/icons-material';
import {tablet} from "../responsive";
import {mobile} from "../responsive";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {publicRequest} from "../requestMethods";
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from "react-redux";

const Container = styled.div`
`;
const Grocery = styled.div`
`;
const GroceryWrapper = styled.div`
display: flex;
align-items: center;
width:214.5px;
margin-left:35px;
cursor: pointer;
`;
const GroceryTitle = styled.h2`
font-size:18px;
width:100px;
padding: 10px 15px;
/* margin:0px 35px; */
`;

const Hr = styled.hr`
opacity: 0.5;
`;

const GroceryMenuItems = styled.div`
padding:0 3rem;
height:100vh;
position: absolute;
z-index:1;
/* left:-27.5rem; */
left:${(props) => (props.clicked === "true"? "0" : "-27.5rem")};
`;

const ProductWrapper = styled.div`
padding: 50px 20px 0 40px;
display: flex;
height:65vh;
background-color: ${(props) => (props.clicked === "true" && "gray")};
opacity: ${(props) => (props.clicked === "true" && "0.5")};
${mobile({display:"block", height: "100vh", padding: "20px"})}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
  ${mobile({height: "250px", marginBottom:"10px"})}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 700;
  ${tablet({fontSize:"16px"})}
`;

const Desc = styled.p`
  margin: 20px 0px 40px 0px;
  ${tablet({fontSize:"14px", margin:"20px 0"})}
`;

const OldPrice = styled.span`
  font-weight: 100;
  font-size: 20px;
  font-weight:500;
  text-decoration: line-through;
  color:gray;
  margin-right: 10px;
  ${tablet({fontSize:"15px"})}
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 20px;
  font-weight:700;
  ${tablet({fontSize:"15px"})}
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const MinuBtn = styled.div`
cursor:pointer;
`;
const AddBtn = styled.div`
cursor:pointer;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #015AA2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 10px 30px;
  border-radius:30px;
  background-color: #015AA2;
  border:none;
  color:white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.5); 
    transition: all 0.3s ease 0s;
    transform: translateY(-1px);
  }
`;

const Product = () => {
  const [click, setClick] = useState(false);
  const NavbarToggle = () => {
      setClick(!click);
  };
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(()=>{
    const getProduct = async () => {
      try{
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      }catch{}
    };
    getProduct()
  }, [id]);

  const handleNumber = (method) => {
    if(method === "dec"){
      if(quantity>1){
        setQuantity(quantity-1);
      } 
    }else{
      setQuantity(quantity+1);
    }
  };

  const handleClick = () => {
    //as the product does not have other properties such as number, we need to add it to this {} additionally
    dispatch(addProduct({ ...product, quantity }));
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Grocery>
        <GroceryWrapper onClick={NavbarToggle}>
            <GroceryTitle>Groceries</GroceryTitle>
            <ExpandMoreOutlined></ExpandMoreOutlined>
        </GroceryWrapper>
        <Hr/>
        <GroceryMenuItems clicked={click.toString()}>
          <Categories />
        </GroceryMenuItems>
    </Grocery>
      <ProductWrapper clicked={click.toString()}>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
            {product.desc}
          </Desc>
          {product.hasDiscount && <OldPrice>£ {product.price}</OldPrice>}
          <Price>£ {product.hasDiscount ? product.newPrice : product.price}</Price>
          <AddContainer>
            <AmountContainer>
              <MinuBtn onClick={()=>handleNumber("dec")}><Remove /></MinuBtn>
              <Amount>{quantity}</Amount>
              <AddBtn onClick={()=>handleNumber("inc")}><Add /></AddBtn>
            </AmountContainer>
            <Button onClick={handleClick}>ADD</Button>
          </AddContainer>
        </InfoContainer>
        </ProductWrapper>
      <Footer />
    </Container>
  );
};

export default Product;