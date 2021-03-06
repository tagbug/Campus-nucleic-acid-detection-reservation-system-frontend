import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export type UserState = {
    userCache: User | null,
}

// 使用Redux Toolkit简化逻辑，详见 https://redux-toolkit.js.org/tutorials/quick-start
export const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
    name: 'user',
    initialState: {
        userCache: null
    },
    reducers: {
        setUserCache: (state, action) => {
            if (state.userCache === null) {
                state.userCache = action.payload;
            } else {
                state.userCache = { ...state.userCache, ...action.payload };
            }
        },
        clearUserCache: (state) => {
            state.userCache = null;
        }
    }
})

export const { setUserCache, clearUserCache } = userSlice.actions;
export const userReducer = persistReducer({
    key: 'userCache',
    storage: storage
}, userSlice.reducer);