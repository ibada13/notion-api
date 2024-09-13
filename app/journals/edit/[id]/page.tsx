'use client';
import { Retrieveblockchildrens } from "@/app/lib/action";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function Edit_Journal() { 
    const { id } = useParams();
    const [Loading, SetLoading] = useState<boolean>(true);
    const [Error, SetError] = useState<boolean>(false);
    useEffect(() => { 
        const get_journal_childs=async()=>{if (id) { 
           await Retrieveblockchildrens(id as string);
        }
        }
        get_journal_childs()
    },[])
    if (Loading) {
        return <>Loading ... </>;
    }
    else if (Error) {
        return <>some error in retriving the journal </>
    }
    else { 
    }
}