import jsonPlaceHolder from "../apis/jsonPlaceHolder";

//with redux-thunk async and await can be used and we can use other action
// creators with plain objects after this one
/* export const fetchPosts = () => {
    return async function(dispatch, getState) {
        const response = await jsonPlaceHolder.get('/posts');
        
        dispatch({ type: 'FETCH_POSTS', payload: response})
    };
}; */

//refactored with ES2015:
export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceHolder.get('/posts');
    
    dispatch({ type: 'FETCH_POSTS', payload: response})
};
