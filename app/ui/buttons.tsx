import { FaRegTrashCan } from "react-icons/fa6";
import { TrashaApage } from "@/app/lib/action";
import { mutate } from "swr";
import { Dispatch, SetStateAction, useState } from "react";
import { CiPen } from "react-icons/ci";
export function TrashJournal({ id, setdelete }: { id: string, setdelete: Dispatch<SetStateAction<{details:String , class:string}|null>> }) {

  const Trashaction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setdelete({details:"deleting .... " , class:"bg-red-500"})

    // Optimistically update the UI
    mutate('journals-key', (currentData: any) => {
      return currentData.filter((item: any) => item.id !== id);
    }, false);

    try {
      await TrashaApage(id);  // Perform the delete operation
      // Optionally, revalidate the cache to ensure the data is up-to-date
      mutate('journals-key');
      setdelete({details:"deleted succesfully ." , class:"bg-green-500"})
    } catch (err) {
      console.error('Error trashing journal:', err);
      // Rollback optimistic update in case of error
      mutate('journals-key');  // Re-fetch the data to restore the original state
      setdelete({details:"delted unsuceuflly .",class:"bg-pink-500"})
    } finally { 
      setTimeout(() => { 
        setdelete(null);
      }, 5000);
    }
  };
  return (
        
        <form onSubmit={Trashaction} className="flex-grow  flex items-center justify-center">
          
        <button type="submit" className="bg-red-500 flex justify-center ">
        <FaRegTrashCan size={"30%"} className="text-white transition-all hover:size-2/5 hover:text-red-500" />
        </button>
        </form>
    );
}
 
export function EditJournal({ id }: { id: string }) {

  return (
    <a href={"/journals/edit/"  + id} className="flex-grow  flex items-center justify-center">
      <CiPen  size={"40%"} className="text-white transition-all hover:size-1/2 hover:text-red-500 "/>
    </a>
  );
 }