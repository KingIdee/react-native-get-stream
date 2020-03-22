import { CHAT_UPDATE, GET_CHANNELS } from "./types";
import axios from 'axios';
import { Actions } from "react-native-router-flux";

export const chatUpdate = (payload) => {

    return {
        type: CHAT_UPDATE,
        payload
    }
};


export const getChannels = () => {

    return dispatch => {
        setLoader(dispatch, true);
        axios.get('http://192.168.43.118:3000/auth/channels')
            .then(res => {
                console.log(res.data.data, "channels");
                dispatch({
                    type: GET_CHANNELS,
                    payload: res.data.data
                });
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
        type: CHAT_UPDATE,
        payload: {prop: 'loading', value}
    })
}