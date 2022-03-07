import jsonPlaceHolder from "../apis/jsonPlaceHolder";
import _ from "lodash";
//with redux-thunk async and await can be used and we can use other action
// creators with plain objects after this one
/* export const fetchPosts = () => {
    return async function(dispatch, getState) {
        const response = await jsonPlaceHolder.get('/posts');
        
        dispatch({ type: 'FETCH_POSTS', payload: response})
    };
}; */

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts()); // await for the results before we move oon to an other line of code
    /* const userIds = _.uniq(_.map(getState().posts, 'userId')); //using lodash to make an array of uniq ids of the array of posts
    userIds.forEach(id => dispatch(fetchUser(id))); */
    //just a little refactor:
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();//value to execute all the steps above

};

//refactored with ES2015:
export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceHolder.get('/posts');
    dispatch({ type: 'FETCH_POSTS', payload: response.data});
};

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data});
};

/* Memoize version:
export const fetchUser = (id) => dispatch => {
    _fetchUser(id, dispatch);
};
//we memoize the function once so it'll call response just once per id
//with this solution, we can only fetch a user only one time. We can't call
// fetchUser an other time for something else
const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
    
    dispatch({ type: 'FETCH_USER', payload: response.data});
}); */