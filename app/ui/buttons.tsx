import { FaRegTrashCan } from "react-icons/fa6";
import { TrashaApage } from "@/app/lib/action";
import { mutate } from "swr";
import { useState } from "react";
export function TrashJournal ({ id }: { id: string }) {
    const [loading, setLoading] = useState(false);

  const Trashaction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);  // Set loading state to true

    // Optimistically update the UI
    mutate('journals-key', (currentData: any) => {
      return currentData.filter((item: any) => item.id !== id);
    }, false);

    try {
      await TrashaApage(id);  // Perform the delete operation
      // Optionally, revalidate the cache to ensure the data is up-to-date
      mutate('journals-key');
    } catch (err) {
      console.error('Error trashing journal:', err);
      // Rollback optimistic update in case of error
      mutate('journals-key');  // Re-fetch the data to restore the original state
    } finally {
      setLoading(false);  // Set loading state to false after operation
    }
  };
    return (
        <form onSubmit={Trashaction} className="flex-grow  flex items-center justify-center">
          
        <button type="submit" className="bg-red-500 flex justify-center ">
            <FaRegTrashCan size={"30%"} className="text-white transition-all hover:size-2/5 hover:text-red-500 "  />
        </button>
        </form>
    );
 }