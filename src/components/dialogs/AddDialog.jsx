import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AddDialog({ isOpenDialog, setIsOpenDialog, addTask }) {
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

  async function submitData(data) {
    const newTask = {
      ...data,
      dateAdded: new Date().toISOString().split("T")[0],
      dateUpdated: new Date().toISOString(),
      status: false,
    };

    try {
      await addTask(newTask);
      setIsOpenDialog(false);
      reset();
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
          <DialogTitle>Add a Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitData)} className="text-center">
          <div className="flex flex-col gap-4">
            <label>Task</label>
            <input
              type="text"
              className="border rounded px-2 py-1"
              {...register("title", {
                required: "Title is required.",
                validate: (value) =>
                  value.trim() !== "",
              })}
            />
            {isSubmitted && errors.title && (
              <div className="text-red-500 text-sm">Title is required and shouldn't be empty.</div>
            )}

            <label>Due Date</label>
            <input
              type="date"
              className="border rounded px-2 py-1"
              {...register("dueDate", { required: true })}
            />
            {isSubmitted && errors.dueDate && (
              <div className="text-red-500 text-sm">Due date is required.</div>
            )}

            <label>Due Time</label>
            <input
              type="time"
              className="border rounded px-2 py-1"
              {...register("dueTime", { required: true })}
            />
            {isSubmitted && errors.dueTime && (
              <div className="text-red-500 text-sm">Due time is required.</div>
            )}

            <label>Priority</label>
            <select
              className="border rounded px-2 py-1"
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
              Add
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
