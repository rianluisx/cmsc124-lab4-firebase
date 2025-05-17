import { useState } from "react";
import AddDialog from "./dialogs/AddDialog";

export default function AddTask({addTask}) {

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <>
      <div className="flex justify-center items-center pb-5 mt-2">
        <button
          className="px-6 py-2 bg-black text-white rounded-lg hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] flex items-center space-x-2 cursor-pointer transition-all border-black  border-b-[2px]"
          onClick={() => setIsOpenDialog(true)}
        >
          +
        </button>
      </div>
      <AddDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        addTask={addTask}
      />
    </>
  );
}
