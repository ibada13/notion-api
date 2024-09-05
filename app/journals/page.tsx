'use client';
import { useSearchParams } from "next/navigation";
import { gen_RetrievePages, RetrievePages } from "../lib/action";
import { useEffect, useState } from "react";
import { CiPen } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { BiTrash } from "react-icons/bi";
import { AES,enc } from "crypto-ts";
export default  function Journals() { 
const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const [Pages,setPages] =useState([])
  const [Loading , setLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchData = async () => {
        try {
            var data = await gen_RetrievePages();
            setPages(data);
        } catch (error) {
            console.error("Failed to fetch pages:", error);
        } finally { 
            setLoading(false)
        }
    };

      fetchData();
  }, []);
    
  async function TrashApagehelper(e:React.MouseEvent<HTMLButtonElement>) { 
        e.preventDefault()
        const id = e.currentTarget.getAttribute('data-id');
        console.log(id)
  } 

    if (Loading) {
        return (
            <p>laoding ..........</p>
        );
     } else { 

        return (<div className="h-screen">

        <h1 className=" block text-center text-4xl bg-green-400 w-1/2 h-2/6 pt-8 pb-8   mr-auto ml-auto mb-6  mt-6 shadow-2xl">
            journal created suc
        </h1>
        <h1 className="text-red-500 text-center text-6xl mb-5">this all the journals you have</h1>
        <div className="flex flex-col  h-screen items-center">
                {Pages.map((e:any, i:any) => (
                    <a href={"/journals/"+e.id} className="w-4/5 min-h-32 text-center border border-white  m-2 rounded-xl flex "> 
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
                        <div className="flex-grow  flex items-center justify-center">
                                <button onClick={TrashApagehelper} data-id={e.id} className="flex items-center justify-center">
                            <CiPen  size={"40%"} className="text-white transition-all hover:size-1/2 hover:text-red-500 "/>
                                </button>
                        </div>
                            <div className="flex-grow  flex items-center justify-center">
                                <a href="http://" className="flex items-center justify-center">
                            <FaRegTrashCan size={"30%"} className="text-white transition-all hover:size-2/5 hover:text-red-500 "  />
                                </a>
                        </div>
                    </div>
            </a>
                )) }
        <div className="w-4/5 min-h-48 text-center bg-red-400  m-2 rounded-md flex "> 
                <div className="flex flex-col flex-grow">
                    
            <div className="h-2/6 bg-blue-400">
                title
            </div>
            <div className="h-2/6 bg-green-400">
                tetst2
            </div>
            <div className=" flex-grow bg-red-500">
                tetst
            </div> 
                </div>
                <div className="w-[10%] bg-purple-500 flex flex-col">
                    <div className="flex-grow bg-yellow-200"></div>
                    <div className="flex-grow bg-orange-200"></div>
                </div>
        </div>
        <div className="w-4/5 min-h-48 text-center bg-red-400  m-2 rounded-md flex flex-col"> 
            <div className="h-2/6 bg-blue-400">
                title
            </div>
            <div className="h-2/6 bg-green-400">
                tetst2
            </div>
            <div className=" flex-grow bg-red-500">
                tetst
            </div> 
        </div>
        

        </div>
    </div>
    );
}
}