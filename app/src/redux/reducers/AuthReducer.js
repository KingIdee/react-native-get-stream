
import {AUTH_UPDATE, LOGIN_SUCCESS} from './../actions/types'
import { StreamChat } from 'stream-chat';
import {Streami18n} from 'stream-chat-react-native';
import axios from 'axios';

const INITIAL_STATE = {
    password: 'tomcat',
    username: 'franko4don',
    email: 'franko4don@gmail.com',
    lastName: 'Nwanze',
    firstName: 'Franklin',
    user: {},
    streamToken: '',
    token: '',
    refreshToken: '',
    chatClient: null,
    activeChannel: {},
    streami18n: new Streami18n({language: 'en'})
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case AUTH_UPDATE:
            return { ...state,  [action.payload.prop]: action.payload.value};

        case LOGIN_SUCCESS:
            const {streamToken, token, refreshToken, user} = action.payload;
            const chatClient = new StreamChat('en88w7b9tgb5');
            activateAxios(token);
            return {...state, streamToken, chatClient, token, refreshToken, user, firstName: '', lastName: '', password: '', email: '', username: '' }

        default: return state
    }
}


const activateAxios = (token) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
    
}