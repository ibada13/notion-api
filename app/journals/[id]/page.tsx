'use client';
import { Retrieveblock } from "@/app/lib/action";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Journal() { 
    const {id} = useParams();
    
    useEffect(() => {
        if (id) {
            Retrieveblock(String(id));
        }
    }, [id]);

    return (
        <div>
            {/* You can render something here */}
            <h1>Journal Page</h1>
            <p>Journal ID: {id}</p>
        </div>
    );
}
