'use client';
import { Retrieveblockchildrens, RetrievePage, update_journal } from "@/app/lib/action";
import { useParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import Form from "@/app/ui/journals/create-form";
import { State } from "@/app/lib/definitions";
import { headers } from "next/headers";
import Error from "@/app/ui/error/error";
export default function Edit_Journal() { 
    const { id } = useParams();
    const [Loading, SetLoading] = useState<boolean>(true);
    const [vError, SetError] = useState<boolean>(false);
    const [Journal, SetJournal] = useState();
    const [Ids, SetIds] = useState<{[key:string]:string}>({});
    const things_headers :string[]=["positive_things" , "negative_things" , "other_things"]
    const initialState: State = { message: null, errors: {} };
    
    const formAction = update_journal.bind(null,id as string,Ids)
    
    useEffect(() => { 
        const get_journal_childs = async () => {
            if (id) { 
                try {
                    const ids: { [key: string]: string } = {};
                    const childs = await Retrieveblockchildrens(id as string);
                    const data = await RetrievePage(id as string);
                    const things = childs.reduce((acc: any, e: any, i: any) => {
                        ids[i] = e.id
                        acc[things_headers[i]] = e.paragraph;
                        return acc; 
                    }, {});
                    SetIds(ids)
                    things.title =data.title
                    things.tags = data.tags.split(" ");
                    SetJournal(things)
                } catch (e) {
                    SetError(true)
                } finally { 
                    SetLoading(false)
                }
                }
        }
        get_journal_childs()
    },[])
    if (Loading) {
        return <>Loading ... </>;
    }
    else if (vError) {
        return <Error />
    }
    else { 
       return <Form formAction={formAction} journal={Journal}/>
    }
}