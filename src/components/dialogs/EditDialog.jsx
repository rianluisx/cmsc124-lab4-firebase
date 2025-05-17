import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";

export default function EditDialog({
  isOpenDialog,
  setIsOpenDialog,
  editTask,
  task,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      dueDate: "",
      dueTime: "",
      priority: "Medium",
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        dueDate: task.dueDate,
        dueTime: task.dueTime,
        priority: task.priority,
      });
    }
  }, [task, reset]);

  async function updateData(data) {
    try {
      await editTask({
        ...task,
        ...data,
        dateUpdated: new Date().toISOString(),
      });
      setIsOpenDialog(false);
    } catch (error) {
      console.error(error);
    }
  }

  function cancelSubmit() {
    setIsOpenDialog(false);
    reset();
  }

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogContent
        className="w-[65%] font-mono text-sm"
        aria-describedby={undefined}
      >
        <DialogHeader className="items-center">
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(updateData)} className="text-center">
          <div className="flex flex-col gap-4">
            <label>Task</label>
            <input
              type="text"
              className="border rounded px-2 py-1"
              defaultValue={task?.title}
              {...register("title", {
                required: "Title is required.",
                validate: (value) =>
                  value.trim() !== "" || "Title cannot be just blank spaces.",
              })}
            />
            {isSubmitted && errors.title && (
              <div className="text-red-500 text-sm">Title is required.</div>
            )}

            <label>Due Date</label>
            <input
              type="date"
              className="border rounded px-2 py-1"
              defaultValue={task?.dueDate}
              {...register("dueDate", { required: true })}
            />
            {isSubmitted && errors.dueDate && (
              <div className="text-red-500 text-sm">Due date is required.</div>
            )}

            <label>Due Time</label>
            <input
              type="time"
              className="border rounded px-2 py-1"
              defaultValue={task?.dueTime}
              {...register("dueTime", { required: true })}
            />
            {isSubmitted && errors.dueTime && (
              <div className="text-red-500 text-sm">Due time is required.</div>
            )}

            <label>Priority</label>
            <select
              className="border rounded px-2 py-1"
              defaultValue={task?.priority}
              {...register("priority", { required: true })}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex justify-center gap-4 mt-9">
            <button
              type="button"
              onClick={cancelSubmit}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-500 hover:text-white cursor-pointer transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
