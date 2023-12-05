import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tasksList: [],
  selectedTask: {},
  isLoading: false,
  error:''
};
const BASE_URL='http://localhost:3000/tasks';
//get
export const getTasksFromServer=createAsyncThunk(
  'tasks/getTasksFromServer',
  async(_,{rejectWithValue})=>{
     const response =await fetch(BASE_URL)
     if(response.ok){
      const jsonResponse =await response.json()
      return jsonResponse
     }else{
      return rejectWithValue({error:'No Task Found'})
     }
  }
)
//post
export const addTaskToServer=createAsyncThunk(
  'tasks/addTaskToServer',
  async(task,{rejectWithValue})=>{
    const options={
      method:'POST',
      body:JSON.stringify(task),
      headers:{
        "Content-Type": "application/json;charset=utf-8",
      }
    }
     const response =await fetch(BASE_URL,options)
     if(response.ok){
      const jsonResponse =await response.json()
      return jsonResponse
     }else{
      return rejectWithValue({error:'Task not created'})
     }
  }
)
//patch
export const updateTaskToServer=createAsyncThunk(
  'tasks/updateTaskToServer',
  async(task,{rejectWithValue})=>{
    const options={
      method:'PATCH',
      body:JSON.stringify(task),
      headers:{
        "Content-Type": "application/json;charset=utf-8",
      }
    }
     const response =await fetch(BASE_URL+'/'+task.id,options)
     if(response.ok){
      const jsonResponse =await response.json()
      return jsonResponse
     }else{
      return rejectWithValue({error:'Task not updated'})
     }
  }
)
//delete
export const deleteTaskToServer=createAsyncThunk(
  'tasks/deleteTaskToServer',
  async(task,{rejectWithValue})=>{
    const options={
      method:'DELETE',
    }
     const response =await fetch(BASE_URL+'/'+task.id,options)
     if(response.ok){
      const jsonResponse =await response.json()
      return jsonResponse
     }else{
      return rejectWithValue({error:'Task not Deleted'})
     }
  }
)
const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    addTaskToList: (state, action) => {
      const id = Math.random() * 100;
      let task = { ...action.payload, id };
      state.tasksList.push(task);
    },
    removeTaskFromList: (state, action) => {
      state.tasksList = state.tasksList.filter(
        (task) => task.id !== action.payload.id
      );
    },
    updateTaskList: (state, action) => {
      state.tasksList = state.tasksList.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    setSelectedTasks: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
  extraReducers:(builder)=>{
    builder
       .addCase(getTasksFromServer.pending,(state)=>{
        state.isLoading=true
       })
       .addCase(getTasksFromServer.fulfilled,(state,action)=>{
        state.isLoading=false
        state.error=''
        state.tasksList=action.payload
       })
       .addCase(getTasksFromServer.rejected,(state,action)=>{
        state.error=action.payload.error
        state.isLoading=false
        state.tasksList=[]
       })
       .addCase(addTaskToServer.pending,(state)=>{
        state.isLoading=true
       })
       .addCase(addTaskToServer.fulfilled,(state,action)=>{
        state.isLoading=false
        state.error=''
        state.tasksList.push(action.payload)
       })
       .addCase(addTaskToServer.rejected,(state,action)=>{
        state.error=action.payload.error
        state.isLoading=false
       })
       .addCase(updateTaskToServer.pending,(state)=>{
        state.isLoading=true
       })
       .addCase(updateTaskToServer.fulfilled,(state,action)=>{
        state.isLoading=false
        state.error=''
          state.tasksList = state.tasksList.map((task) =>
            task.id === action.payload.id ? action.payload : task)
       })
       .addCase(updateTaskToServer.rejected,(state,action)=>{
        state.error=action.payload.error
        state.isLoading=false
       })
       .addCase(deleteTaskToServer.pending,(state)=>{
        state.isLoading=true
       })
       .addCase(deleteTaskToServer.fulfilled,(state,action)=>{
        state.isLoading=false
        state.error=''
          
       })
       .addCase(deleteTaskToServer.rejected,(state,action)=>{
        state.error=action.payload.error
        state.isLoading=false
       })
  }
});
export const {
  addTaskToList,
  removeTaskFromList,
  updateTaskList,
  setSelectedTasks,
} = tasksSlice.actions;
export default tasksSlice.reducer;
