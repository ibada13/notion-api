'use client';
import { RetrievePage } from "@/app/lib/action";
import { useEffect, useState } from "react";

export default function data() { 
    const [isLoading ,SetIsloading ]=useState<boolean>(true);
    const Id: string = "101cc7edf729815d9672e7253e2d0b78";
    useEffect(() => {
        const retrivingpage = async () => { 
            try {
                const data = await RetrievePage({ id: Id });
                console.log(data)
            } catch (err) {

            } finally { 
                SetIsloading(false)
            }
        }
        retrivingpage();
    }, []);
    if (isLoading) { 
        return <>loading .... </>;
    }
    return (
        <></>
    )
}