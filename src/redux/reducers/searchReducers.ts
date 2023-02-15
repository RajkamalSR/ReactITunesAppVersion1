import {
    GET_SEARCH_LIST_SUCCESS, GET_SEARCH_LIST_FAILURE, RESET_INITIAL_STATE
} from "../actions/actionTypes";

// State is initialised
const initialState = {
    data: [], // data store in array
    hasMore: true, 
    loading: false,
    error: null,
}

// searchReducer to change states
function searchReducer(state = initialState, action:any) {
    switch (action.type) {
        case GET_SEARCH_LIST_SUCCESS: //handle search list success
            let setHasMore;
            if (action.payload !== undefined) {
                setHasMore = action.payload.length !== 0 ? true : false
            } else {
                setHasMore = false
            }
            return {
                ...state,
                data: !state.hasMore ? state.data : state.data.concat(action.payload),
                hasMore: setHasMore,
                error: null,
                loading: true
            }
        case GET_SEARCH_LIST_FAILURE: //handle search list failure
            return {
                ...state,
                loading: false,
                error: action.error,
                data: []
            }
            case RESET_INITIAL_STATE: //handle search list reset
            return {
                ...initialState,
                // loading: false,
                // error: null,
                // data: []
            }
        default:
            return state //Default return state
    }
}
export default searchReducer;