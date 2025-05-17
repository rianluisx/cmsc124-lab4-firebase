import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteDialog({
  isOpenDialog,
  setIsOpenDialog,
  removeTask,
  task,
  undoDelete,
}) {

  const [isDeleting, setIsDeleting] = useState(false);

  function cancelSubmit() {
    setIsOpenDialog(false);
  }

  async function handleRemoveTask(task) {
    try {
      setIsDeleting(true);
      await removeTask(task.id);
      toast(`Deleted “${task.title}”`, {
        description: "You can undo this action",
        duration: 3000,
        action: {
          label: "Undo",
          onClick: async () => {
            await undoDelete(task);
          },
        },
        variant: "destructive",
      });
      setIsDeleting(false);
      setIsOpenDialog(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent
          className="w-[40%] font-mono text-sm"
          aria-describedby={undefined}
        >
          {isDeleting && (
            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
              <div className="w-12 h-12 border-4 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
          </DialogHeader>

          <div className="text-center mt-2">
            Would you like to delete{" "}
            <span className="font-bold"> {task?.title}</span> ?
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={cancelSubmit}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-500 hover:text-white cursor-pointer transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                handleRemoveTask(task);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer transition-all"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
