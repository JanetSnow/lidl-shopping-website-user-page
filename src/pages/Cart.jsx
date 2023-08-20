import Announcement from "../components/Announcement";
import CartNavbar from "../components/CartNavbar";
import Footer from "../components/Footer";
import { styled } from 'styled-components';
import {tablet} from "../responsive";
import {mobile} from "../responsive";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { publicRequest, userRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { DeleteOutline } from "@mui/icons-material";
import { deleteAllProducts, deleteProductInCart } from "../redux/cartRedux";


const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const CartWrapper = styled.div`
padding: 20px;
${tablet({marginBottom:"50px"})}
`;
const Title = styled.h1`
font-weight: 300;
text-align: center;
`;
const Top = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
padding: 20px;
`;
const TopButton = styled.button`
padding: 10px;
font-weight:600;
cursor: pointer;
background-color: transparent;
`;
const TopTexts = styled.div`
${tablet({display: "flex"})}
`;
const TopText = styled.span`
margin:0px 10px;
`;
const Bottom = styled.div`
display:flex;
justify-content: space-between;
${tablet({display: "block"})}
`;
const Info = styled.div`
flex:3;
${tablet({marginBottom: "25px"})}
`;
const Product = styled.div`
display:flex;
justify-content: space-between;
`;
const ProductDetail = styled.div`
flex:5;
display:flex;
`;
const Image = styled.img`
width:200px;
`;
const Details = styled.div`
padding: 20px;
display:flex;
flex-direction:column;
justify-content:space-around;
`;
const ProductName = styled.span`
${mobile({fontSize:"12px"})}
`;
const PriceDetail = styled.div`
flex:1;
display:flex;
flex-direction:column;
align-items:center;
justify-content: center;
`;
const ProductAmountContainer = styled.div`
display:flex;
align-items: center;
margin-bottom:20px;
`;

const ProductAmount = styled.div`
font-size:24px;
margin:5px;
`;

const ProductPrice = styled.div`
font-size:30px;
font-weight:200;
${mobile({fontSize:"24px"})}
`;

const DeleteItem = styled.div`
flex:1;
display:flex;
flex-direction:column;
align-items:center;
justify-content: center;
cursor:pointer;
`;

const Hr = styled.hr`
background-color: #eee;
border:none;
height:1px;
`;
const Summary = styled.div`
flex:1;
border:0.5px solid lightgray;
padding:20px;
height:55vh;
`;
const SummaryTitle = styled.h1`
font-weight: 200;
`;
const SummaryItem = styled.div`
margin:30px 0px;
display:flex;
justify-content: space-between;
font-weight: ${props => props.type === "total" && "500"};
font-size: ${props => props.type === "total" && "24px"};

`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
width:100%;
padding:10px;
background-color: #015AA2;
color:white;
font-weight: 600;
border:none;
cursor:pointer;
`;


const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state=>state.cart);
  // const [product, setProduct] = useState({});
  // const [quantity, setQuantity] = useState(1);
  // const dispatch = useDispatch();
  const [stripeToken, setStripeToken] = useState(null);
  
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(()=>{
    const makeRequest = async () => {
      try{
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          // amount: cart.total >= 25? cart.total*100 : cart.total*100 + 350
          amount:500,
        });
        // console.log("purchased products details: " + res.data);
        navigate("/success",{state:{stripeData: res.data, cart: cart}});
        dispatch(deleteAllProducts());
      }catch{}
    };
    stripeToken && makeRequest();
  },[stripeToken, cart, dispatch, navigate]);

  const handleDelete = (product) => {
    try {
      dispatch(deleteProductInCart(product));
    } catch (err) {
    }
  };

  return (
    <Container>
      <Announcement />
      <CartNavbar/>
      <CartWrapper>
        <Title>YOUR BASKET</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Items({cart.quantity})</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, index)=>(              
              <Product key={product._id + index}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>{product.title}</ProductName>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ProductAmount>quantity: {product.quantity}</ProductAmount>
                  </ProductAmountContainer>
                  <ProductPrice>£ {product.hasDiscount ? (product.newPrice*product.quantity).toFixed(2) : (product.price*product.quantity).toFixed(2)}</ProductPrice>
                </PriceDetail>
                <DeleteItem onClick={() => handleDelete(product)}>
                <DeleteOutline />
                </DeleteItem>
            </Product>
            ))}
            <Hr/>
          </Info>

          <Summary>
            <SummaryTitle>BASKET SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Estimated Price</SummaryItemText>
                <SummaryItemPrice>£ {cart.total.toFixed(2)}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>£ 3.50</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>£ {cart.total >= 25 ? 3.50 : 0}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>£ {cart.total >= 25 ? cart.total.toFixed(2) : (cart.total + 3.5).toFixed(2)}</SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout
                name="Lidl Shop"
                image="https://www.lidl.co.uk/bundles/nucleuscomponent/retail/assets/@lidl/a-logo-image/logo_default.55fa35599267bb36eb58dd8930b445f8.svg"
                billingAddress
                shippingAddress
                description={`total price is £ ${cart.total >= 25 ? cart.total.toFixed(2) : (cart.total + 3.5).toFixed(2)}`}
                amount={cart.total >= 25? cart.total*100 : cart.total*100 + 350}
                currency="GBP"
                token={onToken}
                stripeKey={KEY}
              >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </CartWrapper>
      <Footer/>
    </Container>
  )
}

export default Cart
