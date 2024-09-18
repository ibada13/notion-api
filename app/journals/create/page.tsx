'use client';
import { RetriveDatabase ,CreateApage, Retrieveblockchildrens} from "@/app/lib/action";
import { State } from "@/app/lib/definitions";
import  Form from "@/app/ui/journals/create-form";
import { useParams, useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function CreateJournal() { 
    // RetrievePages()
    const searchParams = useSearchParams();
    const {id} = useParams()
    const initialState: State = { message: null, errors: {} };
    const [Data, SetData] = useState();
    const [Loading, SetLoading] = useState(true);
    const router = useRouter();
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

    const handleFormSubmit = async (formData: any) => {
        try {
            // Example of direct state update (replace with your actual logic)
            const updatedState = await CreateApage(initialState,formData);

            // Redirect to a different route after successful form submission
            router.push('/journals?message=' + encodeURIComponent("journal created successfully")); // Change '/success' to your desired route
        } catch (e) {
            console.error("An error occurred during form submission:", e);
        }
    };
    return (
        <Form formAction={handleFormSubmit}/>
    );
}