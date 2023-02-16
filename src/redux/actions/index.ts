import {
    GET_SEARCH_LIST_SUCCESS, GET_SEARCH_LIST_FAILURE, RESET_INITIAL_STATE
} from "./actionTypes";
import axios from "axios";
import { Dispatch } from 'redux';

let baseURL: string = "https://itunes.apple.com/search?term=queen";

//`https://itunes.apple.com/search?term=${searchKeyword}&limit=${limit}`
//searchKeyword?: string, limit?: number;

/*export const getSearchSongs = () => {
    return (dispatch:Dispatch<any>) => {
        axios.get(baseURL)
            .then((response) => { //  sucessfully api fetch
                dispatch({
                    type: GET_SEARCH_LIST_SUCCESS,
                    payload: response.data.results
                })
            }).catch((error) => {// if fetch error
                dispatch({
                    type: GET_SEARCH_LIST_FAILURE,
                    error: error
                })
            });
    }
}*/

export const getSearchSongs = (artistName?: string) => (dispatch: Dispatch<any>) => {
    axios.get(baseURL)
        .then((response) => { //  sucessfully api fetch
            dispatch({
                type: GET_SEARCH_LIST_SUCCESS,
                payload: response.data.results
            })
        }).catch((error) => {// if fetch error
            dispatch({
                type: GET_SEARCH_LIST_FAILURE,
                error: error
            })
        });
};
