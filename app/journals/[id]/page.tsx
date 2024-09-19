'use client';
import {  Retrieveblockchildrens } from "@/app/lib/action";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { date } from "zod";
import Loading from "@/app/ui/loading/loading";
import Error from "@/app/ui/error/error";
import Head from "next/head";
export default function Journal() { 
    const {id} = useParams();
    const [block , SetBlock ] = useState([])
    const [vLoading , SetLoading] = useState(true)
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
                    SetError(true);
                }
                finally { 
                    SetLoading(false)
                }
            }
            fetch_data();
        }
    }, [id]);

    if (vLoading) {
        return (
            <Loading />
        )
    }
    else if (error) { 
        return <Error />
    }
    return (<>
            <Head>
                <title>Journal</title>
            </Head>
        <div className="flex justify-center h-auto p-3">
            <div className="border-2 border-white rounded-lg min-h-screen min-w-[80%]">
                {block.map((b: any) => (
                    <div className="flex flex-col min-h-[33.3%] justify-center items-center ">
                        <h1 className={"text-2xl uppercase min-w-[80%] text-center rounded-lg "  + b.Heading_class}>{ b.Heading}</h1>
                        <p className={ b.paragraph_class}>{ b.paragraph}</p>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
}
