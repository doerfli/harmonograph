import { configureStore } from '@reduxjs/toolkit'
import wavesReducer from './slices/waves'

export const store = configureStore({
    reducer: {
        waves: wavesReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
