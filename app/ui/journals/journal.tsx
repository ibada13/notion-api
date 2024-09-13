import { useState } from "react";
import { EditJournal, TrashJournal } from "../buttons";

export function Journal({ e }: {e:any }) { 
    const [Deleting, SetDeleting] = useState<{details:String  , class:string} | null>(null);
    function delete_p() { 
        SetDeleting(null);
    }
    return (
        <div className="w-full flex  justify-center">
                     {Deleting?
                    <p onClick={delete_p} className={" fixed bottom-0 right-0 p-1 m-5 flex justify-center items-center w-1/4 h-1/5 rounded-xl " + Deleting.class}>{ Deleting.details}</p>
                    : null} 
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
    );
}