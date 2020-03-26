import { AUTH_UPDATE, LOGIN_SUCCESS } from "./types";
import axios from 'axios';
import { Actions } from "react-native-router-flux";

export const authUpdate = (payload) => {

    return {
        type: AUTH_UPDATE,
        payload
    }
};


export const login = (payload) => {

    return dispatch => {
        setLoader(dispatch, true);
        axios.post('http://192.168.1.127:3000/auth/o/token', payload)
            .then(res => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data.data
                });
                setLoader(dispatch, false);
                Actions.push('dashboard');
                
            })
            .catch(err => {
                setLoader(dispatch, false);
                console.log(err.response);
            })
    }
};

export const register = (payload) => {
    return dispatch => {
        setLoader(dispatch, true);
            axios.post('http://192.168.1.127:3000/auth/register', payload)
                .then(res => {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: res.data.data
                    });
                    setLoader(dispatch, false);
                    Actions.push('dashboard');
                    
                })
                .catch(err => {
                    setLoader(dispatch, false);
                    console.log(err.response);
                })
        }
};

export const getUsers = () => {
    return dispatch => {
        setLoader(dispatch, true);
            axios.get('http://192.168.1.127:3000/auth/users')
                .then(res => {
                    console.log(res);
                    dispatch(authUpdate({prop: 'users', value: res.data.data}));
                    setLoader(dispatch, false);
                    
                })
                .catch(err => {
                    setLoader(dispatch, false);
                    console.log(err.response);
                })
        }
};

const setLoader = (dispatch, value) => {
    dispatch({
        type: AUTH_UPDATE,
        payload: {prop: 'loading', value}
    })
}