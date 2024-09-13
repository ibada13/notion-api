'use client';
import {  Retrieveblockchildrens } from "@/app/lib/action";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { date } from "zod";

export default function Journal() { 
    const {id} = useParams();
    const [block , SetBlock ] = useState([])
    const [Loading , SetLoading] = useState(true)
    const [error , SetError] = useState(false)
    useEffect(() => {
        if (id) {

            const fetch_data = async () => { 
                try {
                    const data = await Retrieveblockchildrens(String(id));
                    SetBlock(data);
                }
                catch (e) {
                    console.log("aw ow some error occurred" + e)
                }
                finally { 
                    SetLoading(false)
                }
            }
            fetch_data();
        }
    }, [id]);

    if (Loading) { 
        return (
            <p>loading .....</p>
        )
    }
    return (
        <div className="flex justify-center h-auto p-3">
            <div className="border-2 border-white rounded-lg min-h-screen min-w-[80%]">
                {block.map((b: any) => (
                    <div className="flex flex-col min-h-[33.3%] justify-center items-center ">
                        <h1 className={"text-2xl uppercase min-w-[80%] text-center rounded-lg "  + b.heading_class}>{ b.heading}</h1>
                        <p className={ b.paragraph_class}>{ b.paragraph}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
