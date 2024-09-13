'use client';
import { useSearchParams } from "next/navigation";
import {  RetrievePages } from "../lib/action";
import { useEffect, useState } from "react";

import { EditJournal, TrashJournal } from "../ui/buttons";
import useSWR, { mutate } from "swr";
export default  function Journals() { 
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const [Pages,setPages] =useState([])
    const [Loading , setLoading] = useState<boolean>(true)
    const { data, error, isLoading } = useSWR('journals-key', RetrievePages);
    const [Error, SetError] = useState();
    const [Deleting, SetDeleting] = useState<{details:String  , class:string} | null>(null);
    function delete_p() { 
        SetDeleting(null);
    }
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
                {Deleting ?
                    <p onClick={delete_p} className={" fixed bottom-0 right-0 p-1 m-5 flex justify-center items-center w-1/4 h-1/5 " + Deleting.class}>{ Deleting.details}</p>
                    : null} 
                {Pages.map((e:any, i:any) => (
                    <div className="w-full flex  justify-center">

                    <a href={"/journals/"+e.id} className="w-4/5 min-h-32 text-center border border-white  m-2 rounded-xl flex hover:border-red-500 transition-colors"> 
                    <div className="flex flex-col flex-grow">
                        
                <div className="h-2/6 flex justify-center items-center ">
                    <p className="text-blue-500 text-xl">{e.title}</p>
                </div>
                <div className="h-2/6  flex justify-around items-center ">
                    {e["!'(w"].map((tag:any)=>(<p className="uppercase text-red-500">{tag.name}</p>))}
                </div>
                <div className=" flex-grow  flex justify-around items-center">
                                <p className="text-white">{e.created_time}</p>
                                {e.created_time !== e.updated_time?(
                                    <p className="text-green-400">{e.updated_time}</p>
                                ) :null
                                }

                </div> 
                    </div>
                    <div className="w-[10%] flex flex-col">
                            <EditJournal id={ e.id} />
                            <TrashJournal  setdelete={SetDeleting} id={e.id} />
                    </div>
            </a>
        </div>
                )) }
        </div>
    </div>
    );
}
}