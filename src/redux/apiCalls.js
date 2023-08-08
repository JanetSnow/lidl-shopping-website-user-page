import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, logOut} from "./userRedux"

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