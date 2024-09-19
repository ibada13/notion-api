'use client';
import { Retrieveblockchildrens, RetrievePage, update_journal } from "@/app/lib/action";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import Form from "@/app/ui/journals/create-form";
import { State } from "@/app/lib/definitions";
import Error from "@/app/ui/error/error";
export default function Edit_Journal() { 
    const { id } = useParams();
    const [Loading, SetLoading] = useState<boolean>(true);
    const [vError, SetError] = useState<string | null>(null);
    const [Journal, SetJournal] = useState();
    const [Ids, SetIds] = useState<string[]>([]);
    const things_Headers :string[]=["positive_things" , "negative_things" , "other_things"]
    const initialState: State = { message: null, errors: {} };
    const router = useRouter();
    const formAction = async (formData: any) => {
        try {

            await update_journal(id as string, Ids, formData);
            router.push(`/journals/${id}`); 

        } catch (e){ 
            console.log(e)
            SetError(String(e))
        }
    }
    useEffect(() => { 
        const get_journal_childs = async () => {
            if (id) { 
                try {
                    const ids: string[] = [];
                    const childs = await Retrieveblockchildrens(id as string);
                    const data = await RetrievePage(id as string);
                    const things = childs.reduce((acc: any, e: any, i: any) => {
                        ids[i] = e.id
                        acc[things_Headers[i]] = e.paragraph;
                        return acc; 
                    }, {});
                    SetIds(ids)
                    things.title =data.title
                    things.tags = data.tags.split(" ");
                    SetJournal(things)
                } catch (e) {
                    SetError(String(e))
                } finally { 
                    SetLoading(false)
                }
                }
        }
        get_journal_childs()
    },[id])
    if (Loading) {
        return Loading;
    }
    else if (vError) {
        return <Error error={vError} />
    }
    else { 
       return <Form formAction={formAction} journal={Journal}/>
    }
}