import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteDialog from "./dialogs/DeleteDialog";
import { useState } from "react";
import EditDialog from "./dialogs/EditDialog";

export default function TaskList({ tasks, onToggleTask, removeTask, editTask, undoDelete }) {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  
  if (tasks.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 text-xl">
        No tasks available. Click the <strong>+</strong> button to add one.
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 bg-white shadow-md rounded-lg border-l-4 flex justify-between items-center transition-all duration-300 hover:shadow-lg ${
              task.priority === "High"
                ? "border-red-500"
                : task.priority === "Medium"
                ? "border-yellow-500"
                : "border-green-500"
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.status}
                onChange={() => onToggleTask(task)}
                className="w-5 h-5 accent-gray-800"
                aria-label="check"
              />
              <div className={task.status ? "line-through text-gray-400" : ""}>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-500">
                  Date Added: {task.dateAdded}
                </p>
                <p className="text-sm text-gray-500">
                  Due Date: {task.dueDate}
                </p>
                <p className="text-sm text-gray-500">
                  Due Time: {task.dueTime}
                </p>
                <p
                  className={`text-xs font-bold ${
                    task.priority === "High"
                      ? "text-red-500"
                      : task.priority === "Medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  Priority: {task.priority}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                className="text-blue-500 hover:text-blue-700 flex items-center cursor-pointer"
                onClick={() => {
                  setIsOpenEditDialog(true);
                  setSelectedTask(task);
                }}
                aria-label="Edit Task"
              >
                <FaEdit />
              </button>

              <button
                className="text-red-500 hover:text-red-700 flex items-center cursor-pointer"
                onClick={() => {
                  setSelectedTask(task);
                  setIsOpenDeleteDialog(true);
                }}
                aria-label="Delete Task"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <DeleteDialog
        isOpenDialog={isOpenDeleteDialog}
        setIsOpenDialog={setIsOpenDeleteDialog}
        task={selectedTask}
        removeTask={removeTask}
        undoDelete={undoDelete}
      />
      <EditDialog
        isOpenDialog={isOpenEditDialog}
        setIsOpenDialog={setIsOpenEditDialog}
        task={selectedTask}
        editTask={editTask}
      />
    </>
  );
}
