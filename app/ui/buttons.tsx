import { FaRegTrashCan } from "react-icons/fa6";
import { TrashaApage } from "@/app/lib/action";

export function TrashJournal ({ id }: { id: string }) {
    const Trashaction = TrashaApage.bind(null, id);
    return (
        <form action={Trashaction} className="flex-grow  flex items-center justify-center">
          
        <button type="submit" className="bg-red-500 flex justify-center ">
            <FaRegTrashCan size={"30%"} className="text-white transition-all hover:size-2/5 hover:text-red-500 "  />
        </button>
</form>
    );
 }