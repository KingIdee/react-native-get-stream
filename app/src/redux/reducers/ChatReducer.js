
import { GET_CHANNELS, CHAT_UPDATE} from './../actions/types'

const INITIAL_STATE = {
    channels: [],
    loading: false,
    activeChannel: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case CHAT_UPDATE:
            return { ...state,  [action.payload.prop]: action.payload.value};

        case GET_CHANNELS:
            return {...state, channels: action.payload}

        default: return state
    }
}
