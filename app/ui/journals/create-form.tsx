import { SiThingiverse } from "react-icons/si";

export async function Form({ formAction, journal }: { formAction: any, journal?: {title:string , tags: string [] ,positive_things:string , negative_things:string , other_things:string} }) { 


    return (
        <div className=" w-full h-full flex justify-center pt-5 ">
            
            <form action={formAction} className=" rounded-lg h-auto w-3/4 flex flex-col  px-6 pb-3 pt-3">

                <div className="mb-5 h-auto">
                <label className="mb-4 block font-bold text-6xl text-red uppercase" htmlFor="id">title</label>
                    <input value={journal?journal.title:""} className="w-full  py-3 px-3 shadow appearance-none border-4  border-transparent rounded-xl focus:border-red-500 hover:border-4 hover:border-orange-300 hover:outline-orange-400  focus:outline-red-400  focus:outline-none transition-colors text-xl font-bold text-black text-center  " placeholder="title" id="title" type="text" name="title"/>
                </div>

                <div className="mb-7 h-auto">
                <label className="mb-4 block font-bold text-6xl text-red uppercase" htmlFor="tags">tags</label>
                    <input value={journal?journal.tags.join(" "):""} className="w-full  py-3 px-3 shadow appearance-none border-4  border-transparent rounded-xl focus:border-blue-500 hover:border-4 hover:border-orange-300 hover:outline-orange-400  focus:outline-blue-400 focus:outline-none transition-colors text-xl font-bold text-black text-center  " placeholder="tags" id="tags" type="text" name="tags"/>
                </div>

                <div className="px-5 mb-4 h-auto">
                    <textarea value={journal?journal.positive_things:""} className="p-3 appearance-none shadow-2xl rounded-xl border-r-8 border-green-400 focus:border-4 focus:border-green-400 outline-green-400 w-full min-h-32 h-auto text-xl font-bold text-black text-center" spellCheck={false} name="positive_things" id="positive_things" placeholder="positive things..."></textarea>
                </div>

                <div className="px-5 mb-4 h-auto">
                    <textarea value={ journal?journal.negative_things:""} className="p-3 appearance-none shadow-2xl rounded-xl border-r-8 border-red-500 focus:border-4 focus:border-red-500   outline-red-500 w-full min-h-32 h-auto text-xl font-bold text-black text-center" spellCheck={false} name="negative_things" id="negative_things" placeholder="negative things..."></textarea>
                </div>

                <div className="px-5 mb-4 h-auto">
                    <textarea value={journal?journal.other_things:""} className="p-3 appearance-none shadow-2xl rounded-xl border-r-8  border-blue-500  focus:border-4  focus:border-blue-500   outline-blue-500 w-full min-h-32 h-auto text-xl font-bold text-black text-center" spellCheck={false} name="other_things" id="other_things" placeholder="other..."></textarea>
                </div>

                <div className="min-h-28 flex justify-center items-center  ">
                <button type="submit" className="font-bold uppercase border-2 rounded-xl border-red-200 hover:text-red-500 hover:border-red-400 transition-all p-6">submit</button>
                </div>

            </form>
        </div>
    );
}