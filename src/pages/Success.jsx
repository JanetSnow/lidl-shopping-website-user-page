import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { styled } from 'styled-components';

const Container = styled.div`
height: 100vh;
/* background-color: #015AA2; */
/* opacity: 0.8; */
display: flex;
align-items: center;
justify-content: center;
background-image: url(${props => props.img});
background-size: cover;
background-position: center;
`;
const NoticeBoard = styled.div`
height: 200px;
width: 400px;
background-color: white;
border-radius: 5px;
padding: 40px 30px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
const Notice = styled.p`
`;
const Button = styled.button`
margin-top: 20px;
color: white;
background-color: #015AA2;
padding: 10px;
border-radius: 5px;
border:none;
cursor: pointer;
`;

const Success = () => {
    const location = useLocation();
    // const data = location.state.data;
    // console.log("location: " + location);
    // const data = location.state.stripeData;
    // const cart = location.state.cart;
    // const currentUser = useSelector((state) => state.user.currentUser);
    // const [orderId, setOrderId] = useState(null);

    // useEffect(() => {
    //     const createOrder = async () => {
    //         try{
    //             const res = await userRequest.post("/orders", {
    //                 userId: currentUser._id,
    //                 products: cart.products.map((item) => ({
    //                     productId: item._id,
    //                     quantity: item.quantity,
    //                 })),
    //                 amount: cart.total,
    //                 address: data.billing_details.address,
    //             });
    //             setOrderId(res.data._id);
    //         }catch{}
    //     };
    //     data && createOrder();
    // }, [cart, data, currentUser]);

    return (
        <Container img="https://plus.unsplash.com/premium_photo-1661567408466-27899e8a4a2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpbGRyZW4lMjBwbGF5aW5nfGVufDB8fDB8fHww&w=1000&q=80">
            <NoticeBoard>
                <Notice>
                {/* {orderId
                ? `Order has been created successfully. Your order number is ${orderId}`
                : `Your don't have any order yet`} */}
                Order has been created successfully
                </Notice>
                <Link to="/">
                    <Button>Go to Homepage</Button>
                </Link>
            </NoticeBoard>
        </Container>
    );
};

export default Success
