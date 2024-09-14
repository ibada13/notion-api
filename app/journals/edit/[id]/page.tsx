'use client';
import { Retrieveblockchildrens, update_journal } from "@/app/lib/action";
import { useParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import Form from "@/app/ui/journals/create-form";
import { State } from "@/app/lib/definitions";
export default function Edit_Journal() { 
    const { id } = useParams();
    const [Loading, SetLoading] = useState<boolean>(true);
    const [Error, SetError] = useState<boolean>(false);
    const [Journal, SetJournal] = useState();
    const [Ids, SetIds] = useState<string[]>([]);
    const things_headers :string[]=["positive_things" , "negative_things" , "other_things"]
    const initialState: State = { message: null, errors: {} };
    
    const formAction = update_journal.bind(null,id as string,Ids)
    
    useEffect(() => { 
        const get_journal_childs = async () => {
            if (id) { 
                try {
                    const ids: string[] = [];
                    const data = await Retrieveblockchildrens(id as string);
                    const things = data.reduce((acc: any, e: any, i: any) => {
                        ids.push(e.id as string) 
                        acc[things_headers[i]] = e.paragraph;
                        return acc; 
                    }, {});
                    SetIds(ids.filter(Boolean))
                    things.title = "some title"
                    things.tags = "some tags test".split(" ")
                    console.log(things)
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
    else if (Error) {
        return <>some error in retriving the journal </>
    }
    else { 
       return <Form formAction={formAction} journal={Journal}/>
    }
}