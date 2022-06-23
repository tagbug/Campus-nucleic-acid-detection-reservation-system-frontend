import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';
import { userReducer } from './userSlice';

// 使用Redux Toolkit简化逻辑，详见 https://redux-toolkit.js.org/tutorials/quick-start
export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

// 使用redux-persist自动持久化到localStorage
export const persistor = persistStore(store);

// 类型导出
export type RootStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
