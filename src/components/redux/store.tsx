import { configureStore } from "@reduxjs/toolkit";
import taskform from './taskFormReducer';

export const store = configureStore({
  reducer: {
    taskform:taskform
  }
});
