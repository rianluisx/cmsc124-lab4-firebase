import axios from "axios";
import Task from "../types/task";

export default function useTaskServices() {
  const API_URL = "http://localhost:5000/tasks";

  async function getTasks(): Promise<Task[]> {
    try {
      const { data } = await axios.get<Task[]>(API_URL);
      return data;
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      return [];
    }
  }

  async function addTask(task: Omit<Task, "id">): Promise<Task | null> {
    try {
      const { data } = await axios.post<Task>(API_URL, task);
      return data;
    } catch (error) {
      console.error("Failed to add task", error);
      return null;
    }
  }

  async function updateToggle(task: Task): Promise<Task | null> {
    try {
      const { data } = await axios.put<Task>(`${API_URL}/${task.id}`, task);
      return data;
    } catch (error) {
      console.error("Failed to update toggle", error);
      return null;
    }
  }

  async function editTask(task: Task): Promise<Task | null> {
    try {
      const { data } = await axios.put<Task>(`${API_URL}/${task.id}`, task);
      return data;
    } catch (error) {
      console.error("Failed to edit task", error);
      return null;
    }
  }

  async function removeTask(taskId: number): Promise<boolean> {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      return true;
    } catch (error) {
      console.error("Failed to remove task", error);
      return false;
    }
  }

  async function undoDelete(task: Task): Promise<Task | null> {
    try {
      const { data } = await axios.post<Task>(API_URL, task);
      return data;
    } catch (error) {
      console.error("Failed to undo delete", error);
      return null;
    }
  }

  return { addTask, removeTask, editTask, undoDelete, updateToggle, getTasks };
}
