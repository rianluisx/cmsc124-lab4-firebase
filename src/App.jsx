import AddTask from "./components/AddTask";
import Header from "./components/Header";
import SortTasks from "./components/SortTasks";
import useTaskServices from "./hooks/useTaskServices";
import TaskList from "./components/TaskList";
import { useState, useEffect } from "react";
import TASKS_COLLECTION from "./firebase/collections";
import { onSnapshot } from "firebase/firestore";

function ToDoList() {
  const { addTask, editTask, removeTask, undoDelete, updateToggle } =
    useTaskServices();
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState("dateAdded");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    const unsubscribe = onSnapshot(
      TASKS_COLLECTION,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(data);
        setIsFetching(false);
      },
      (error) => {
        console.error(error)
        setIsFetching(false);
      }
    );

    return () => unsubscribe();
  }, []); 

  function changeSorting(newSort) {
    setSortBy(newSort);
  }

  async function handleToggleTask(task) {
    const updated = { ...task, status: !task.status };

    setTasks((curr) => curr.map((t) => (t.id === task.id ? updated : t)));

    await updateToggle(updated);
  }

  const sortedTasks = (() => {
    const sorted = [...tasks];

    if (sortBy === "priority") {
      const order = { High: 1, Medium: 2, Low: 3 };
      sorted.sort((a, b) => order[a.priority] - order[b.priority]);
    } else if (sortBy === "dueDate") {
      sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else {
      sorted.sort((a, b) => new Date(b.dateUpdated) - new Date(a.dateUpdated));
    }

    return sorted;
  })();

  return (
    <div className="max-w-[500px] overflow-auto min-h-[300px] mx-auto my-[30px] p-[30px] rounded-[5px]">
      <Header />
      <AddTask addTask={addTask} />
      <SortTasks sortBy={sortBy} changeSorting={changeSorting} />
      <TaskList
        tasks={sortedTasks}
        onToggleTask={handleToggleTask}
        removeTask={removeTask}
        editTask={editTask}
        undoDelete={undoDelete}
        isFetching={isFetching}
      />
    </div>
  );
}

export default ToDoList;
