'use client';
import { useEffect, useState } from "react";
import { GiSkullBolt } from "react-icons/gi";
import Head from "next/head";
export default function Error({ error }: {error?:string}) {
    const [Opacity,SetOpacity] = useState<number>(0)
    useEffect(() => { 
        const animtion = () => { 
            const animtion_loop = setInterval(() => { 
                SetOpacity((prev) => { return prev + 0.05 > 1 ? 0.5 : prev + 0.05; });
            },500)
            return ()=>clearInterval(animtion_loop)
        }
        animtion();
    },[])
    return (
        <>
            <Head>
                <title>Error</title>
            </Head>
        <div className="h-full w-full flex justify-center items-center">
            <div className="h-1/3 w-4/5 flex flex-col justify-center">
                <div className="text-6xl text-red-500 flex justify-evenly" >
                    <h1>404</h1>
                    <p>|</p>
                    <GiSkullBolt style={{opacity:Opacity}} className="transition-opacity duration-500" />  
                </div>
                <div className="flex flex-grow justify-center items-center ">
                    <h6 className="text-xl uppercase">{error?error:"some error"} </h6>
                </div>
            </div>
        </div>
        </>
    )
 }