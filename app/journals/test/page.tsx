'use client';
import { RetrievePage } from "@/app/lib/action";
import { useEffect, useState } from "react";

export default function data() { 
    const [isLoading ,SetIsloading ]=useState<boolean>(true);
    const Id: string = "100cc7edf729814f99a0e32f27b8d1cf";
    useEffect(() => {
        const retrivingpage = async () => { 
            try {
                const data = await RetrievePage(Id );
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