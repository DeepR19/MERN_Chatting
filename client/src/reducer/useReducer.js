
export const initialState = document.cookie? true: false;

export const reducer = (state, action) => {
    if(action.type ==='USER'){
        return action.payload;
    }
    return state;
}