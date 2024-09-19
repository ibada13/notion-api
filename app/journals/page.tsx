'use client';
import { useSearchParams } from "next/navigation";
import { RetrievePages } from "../lib/action";
import { useEffect, useState } from "react";
import { EditJournal, TrashJournal } from "../ui/buttons";
import useSWR from "swr";
import { Journal } from "../ui/journals/journal";
import Error from "../ui/error/error";
import Loading from "../ui/loading/loading";
import Head from "next/head";
export default function Journals() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message');

    // SWR for data fetching
    const { data: Pages, error, isLoading } = useSWR('journals-key', RetrievePages);

    // If data is loading
    if (isLoading) {
        return <Loading />;
    }

    // If there's an error
    if (error) {
        console.error("Error loading journals:", error);
        return <Error />;
    }

    // Render the journals if available
    return (<>
            <Head>
                <title>Journals</title>
            </Head>
        <div className="h-screen">
            {/* Display the success message if available */}
            {message && (
                <h1 className="block text-center text-4xl bg-green-400 w-1/2 h-2/6 pt-8 pb-8 mr-auto ml-auto mb-6 mt-6 shadow-2xl">
                    {message}
                </h1>
            )}

            <h1 className="text-red-500 text-center text-6xl mb-5">
                This is all the journals you have
            </h1>

            <div className="flex flex-col h-screen items-center">
                {/* Map over Pages and render the Journal component */}
                {Pages?.map((journal: any, index: number) => (
                    <Journal key={journal.id || index} e={journal} />
                ))}
            </div>
        </div>
    </>
    );
}
