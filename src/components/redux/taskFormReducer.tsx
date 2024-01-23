import { createSlice } from "@reduxjs/toolkit";
import { generateID } from "../Reusable/Data";

interface Action {
  type: string;
  payload: any;
}
export const tasksSlice = createSlice({
  name: "taskform",
  initialState: { status:"fulfilled", taskform: [], error:null },
  reducers: {
    addTaskForm: (state: any, action: Action) => {
      let obj={
        taskId: generateID(3),
        ...action.payload
      }
      state.taskform.push(obj);
    },
    editTaskForm: (state: any, action: Action) => {
      state.taskform = state.taskform.map((dt:any)=>{
        if(dt.taskId === action.payload.taskId){
          return {
            ...dt, 
            ...action.payload
          }
        }else{
          return dt;
        }
      });
    },
    removeTaskForm: (state: any, action: Action) => {
      state.taskform = state.taskform.filter((h: any) => h.taskId !== action.payload);
    }
  },
  extraReducers:(builder)=>{}
});

export const { addTaskForm, removeTaskForm, editTaskForm} = tasksSlice.actions;
export default tasksSlice.reducer;
