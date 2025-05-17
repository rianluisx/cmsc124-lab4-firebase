import {
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/db";
import TASKS_COLLECTION from "../firebase/collections";

export default function useTaskServices() {

  async function addTask(task) {
    try {
      const docRef = await addDoc(TASKS_COLLECTION, task);
      return { id: docRef.id, ...task };
    } catch (error) {
      console.error("Failed to add task", error);
      return null;
    }
  }

  async function updateToggle(task) {
    if (!task.id) return null;
    try {
      const taskDoc = doc(db, "tasks", task.id);
      await updateDoc(taskDoc, { status: task.status });
      return task;
    } catch (error) {
      console.error("Failed to update toggle", error);
      return null;
    }
  }

  async function editTask(task) {
    if (!task.id) return null;
    try {
      const taskDoc = doc(db, "tasks", task.id);
      const { id, ...data } = task;
      await updateDoc(taskDoc, data);
      return task;
    } catch (error) {
      console.error("Failed to edit task", error);
      return null;
    }
  }

  async function removeTask(taskId) {
    try {
      const taskDoc = doc(db, "tasks", taskId);
      await deleteDoc(taskDoc);
      return true;
    } catch (error) {
      console.error("Failed to remove task", error);
      return false;
    }
  }

  async function undoDelete(task) {
    try {
      const { id, ...rest } = task;
      const docRef = await addDoc(TASKS_COLLECTION, rest);
      return { id: docRef.id, ...rest };
    } catch (error) {
      console.error("Failed to undo delete", error);
      return null;
    }
  }

  return { addTask, updateToggle, editTask, removeTask, undoDelete };
}
