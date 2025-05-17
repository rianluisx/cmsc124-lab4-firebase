import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ToDoList from './App';
import { Toaster } from "sonner";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToDoList/>
    <Toaster position="bottom-center" duration={6000}/>
  </StrictMode>,
)
