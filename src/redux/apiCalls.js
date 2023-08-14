import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, logOut} from "./userRedux";
import {
    getProductFailure,
    getProductStart,
    getProductSuccess,
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    updateProductFailure,
    updateProductStart,
    updateProductSuccess,
    addProductFailure,
    addProductStart,
    addProductSuccess,
  } from "./productRedux";

export const login = async (dispatch, user)=>{
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login",user);
        //res.data here is our user info
        dispatch(loginSuccess(res.data));
    }catch(err){
        dispatch(loginFailure());
    }
}

export const register = async (dispatch, user)=>{
    try{
        const res = await publicRequest.post("/auth/register",user);
        //res.data here is our user info
        dispatch(loginSuccess(res.data));
    }catch(err){
        dispatch(loginFailure());
    }
}

export const logout = async (dispatch) => {
    dispatch(logOut());
}

export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
      const res = await publicRequest.get("/products");
      dispatch(getProductSuccess(res.data));
    } catch (err) {
      dispatch(getProductFailure());
    }
};

export const updateDiscountProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
      // here we also doesn't really update on database. if we want to achieve that, we need to trigger the actual api call
      const res = await publicRequest.put(`/products/${id}`, product);
      dispatch(updateProductSuccess({ id, product }));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };