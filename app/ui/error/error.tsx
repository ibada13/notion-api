'use client';

import { GiSkullBolt } from "react-icons/gi";

export default function Error({ error }: {error?:string}) {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="h-1/3 w-4/5 flex flex-col justify-center">
                <div className="text-6xl text-red-500 flex justify-evenly" >
                    <h1>404</h1>
                    <p>|</p>
                  <GiSkullBolt/>  
                </div>
                <div className="flex flex-grow justify-center items-center ">
                    <h6 className="text-xl uppercase">{error?error:"some error"} </h6>
                </div>
            </div>
        </div>
    )
 }