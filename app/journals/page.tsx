'use client';
import { useSearchParams } from "next/navigation";
import {  RetrievePages } from "../lib/action";
import { useEffect, useState } from "react";

import { EditJournal, TrashJournal } from "../ui/buttons";
import useSWR, { mutate } from "swr";
import { Journal } from "../ui/journals/journal";
export default  function Journals() { 
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const [Pages,setPages] =useState([])
    const [Loading , setLoading] = useState<boolean>(true)
    const { data, error, isLoading } = useSWR('journals-key', RetrievePages);
    const [Error, SetError] = useState();

  useEffect(() => {
      if (data) { 
          setPages(data);
          mutate('journals-key');
      }
      if (error) { 
          SetError(error);
      }
  }, [data]);
    
//   async function TrashApagehelper(e:React.MouseEvent<HTMLButtonElement>) { 
//         e.preventDefault()
//         const id = e.currentTarget.getAttribute('data-id');
//         console.log(id)
//   } 

    if (isLoading) {
        return (
            <p>laoding ..........</p>
        );
     } else { 

        return (<div className="h-screen">
            {message ?
        <h1 className=" block text-center text-4xl bg-green-400 w-1/2 h-2/6 pt-8 pb-8   mr-auto ml-auto mb-6  mt-6 shadow-2xl">
            journal created suc
        </h1>
            : null}
        <h1 className="text-red-500 text-center text-6xl mb-5">this all the journals you have</h1>
        <div className="flex flex-col  h-screen items-center">
               
                {Pages.map((e:any, i:any) => (
                    <Journal e={e}  />
                )) }
        </div>
    </div>
    );
}
}