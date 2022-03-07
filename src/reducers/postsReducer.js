export default (state = [], action) => {
    /* if(action.type === 'FETCH_POSTS') {
        return action.payload;
    } */
    //in practice we'll see more commonly switch case:
    switch (action.type) {
        case 'FETCH_POSTS':
            return action.payload;
        default:
            return state;
    }
    
};  