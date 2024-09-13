'use client';
import { RetriveDatabase ,CreateApage, Retrieveblockchildrens} from "@/app/lib/action";
import { State } from "@/app/lib/definitions";
import { Form } from "@/app/ui/journals/create-form";
import { useParams, useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { useEffect } from "react";
export default function CreateJournal() { 
    // RetrievePages()
    const searchParams = useSearchParams();
    const {id} = useParams()
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(CreateApage , initialState);
    const [Data, SetData] = useState();
    const [Loading, SetLoading] = useState(true);
    useEffect(() => {
        if (id) {

            const fetch_data = async () => { 
                try {
                    console.log(id)
                    return 
                    const data = await Retrieveblockchildrens(String(id));
                    SetData(data);
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


    return (
        <Form formAction={formAction}/>
    );
}