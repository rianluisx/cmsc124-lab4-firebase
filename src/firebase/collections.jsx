import { collection } from "firebase/firestore";
import { db } from "./db";

const TASKS_COLLECTION = collection(db, "tasks");
export default TASKS_COLLECTION;
