import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedInUser: null,
    clickedUser: null
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload;
        },
        setClickedUser: (state, action) => {
            state.clickedUser = action.payload;
        }
    }
});

export const { setLoggedInUser, setClickedUser } = chatSlice.actions;
export default chatSlice.reducer;