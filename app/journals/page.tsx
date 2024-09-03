'use client';
import { useSearchParams } from "next/navigation";
import { RetrievePages } from "../lib/action";
import { useEffect, useState } from "react";

export default  function Journals() { 
    const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const [Pages,setPages] =useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await RetrievePages();
        setPages(data);
      } catch (error) {
        console.error("Failed to fetch pages:", error);
      }
    };

      fetchData();
      console.log(Pages)
  }, []);
    return (<div className="h-screen">

        <h1 className=" block text-center text-4xl bg-green-400 w-1/2 h-2/6 pt-8 pb-8   mr-auto ml-auto mb-6  mt-6 shadow-2xl">
            journal created suc
        </h1>
        <h1 className="text-red-500 text-center text-6xl mb-5">this all the journals you have</h1>
        <div className="flex flex-col  h-screen items-center">
                {Pages.map((e:any, i:any) => (
                    <div className="w-4/5 min-h-32 text-center border border-white  m-2 rounded-xl flex "> 
                    <div className="flex flex-col flex-grow">
                        
                <div className="h-2/6 flex justify-center items-center ">
                    <p className="text-blue-500 text-xl">{e.title}</p>
                </div>
                <div className="h-2/6  flex justify-around items-center ">
                    {e["!'(w"].map((tag:any)=>(<p className="uppercase text-red-500">{tag.name}</p>))}
                </div>
                <div className=" flex-grow  flex justify-around items-center">
                    <p className="text-white">{e.created_time}</p>
                    <p className="text-green-400">{e.updated_time}</p>

                </div> 
                    </div>
                    <div className="w-[10%] bg-purple-500 flex flex-col">
                        <div className="flex-grow bg-yellow-200"></div>
                        <div className="flex-grow bg-orange-200"></div>
                    </div>
            </div>
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