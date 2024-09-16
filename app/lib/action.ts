'use server';
const { Client } = require('@notionhq/client');
import { redirect } from "next/navigation";
import { child_block_data_type , color, rich_text_type, State, Tag} from "./definitions";
import {z, ZodError} from 'zod';
import { revalidatePath } from "next/cache";
import { AES, enc, lib } from "crypto-ts";
import { Getimportant ,process_blocks_data,gen_RetrievePages} from "./extraactions";
import { get_data, safe_data } from "./function_data";
import { error } from "console";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function RetriveDatabase()  {
  const response = await notion.databases.retrieve({ database_id: process.env.DATABASE_ID });
  console.log(response);
  return response; 
};






export async function CreateApage(prevstate:State,formData:FormData) { 
  
  const parsedData = safe_data(formData);
    
    if (!parsedData.success) {
      return {
        errors: parsedData.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }
    
    const { title, tags, things } = parsedData.data;
    
    try {
      const data = get_data({ title, tags, things })
      console.log(data.children[1].paragraph?.rich_text[0].text)
  const response = await notion.pages.create({
      parent: {
        database_id: process.env.DATABASE_ID
    },
    properties: data.properties,
    children : data.children
    })
    
    

  }
  catch (e: any) { 
    return {
      
      message:"journal created err"+String(e.message)
    }
  }
  
  revalidatePath('/journals')
  redirect('/journals?message=' + encodeURIComponent("journal created suc"))
}


 


export async function RetrievePages() { 
 
  try {
    
    const res = await notion.databases.query({
      database_id: process.env.DATABASE_ID,
      sorts: [
        {
          property: process.env.DATABASE_CREATED_ID,
          direction: "descending"
        }
      ]
    })
    const data = Getimportant(res.results)
    return gen_RetrievePages(data);
  } catch (e){ 
    console.log(String(e))
  }
  
}



export async function Retrieveblockchildrens(blockId: string) {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 200,
  });
  // console.log(response)
  const data = process_blocks_data(response.results);
  console.log(data)
  return data; 
 }


export async function TrashaApage(pageId:string) { 
  try {

     await notion.pages.update({
      page_id: pageId,
      in_trash: true
    });
    revalidatePath("/journals")
  } catch (err) { 
    console.log("some error ocurred : " +err )
  }
  
}

export async function update_journal( blockId:string,Ids:{[key:string]:string},formData: FormData):Promise<State | undefined> { 
  var acc: number = 0; 
  console.log(formData)
  const parsedData = safe_data(formData);
  if (!parsedData.success) { 
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  const { title, tags, things } = parsedData.data;
  const data = get_data({ title, tags, things }); 
    // const response = await notion.blocks.children.append({
    //   block_id: blockId,
    //   children:data.children
      
  // });
  try {
    // Using Promise.all to handle all the async requests
    const responsePromises = data.children.map((e, i) => {
      if (e.type === "paragraph") {
        const idToUse = Ids[acc];
        console.log(Ids[acc])// Cycle through the 3 elements of Ids
        acc++;
        return new Promise((resolve) => {
          setTimeout(async () => {
            try {
              // Await the response from Notion API block update
              const response = await notion.blocks.update({
                block_id: idToUse,  // Cycle through the Ids array
                paragraph: e.paragraph,
              });
              resolve(response);
            } catch (error:any) {
              resolve(`Error updating block ${idToUse}: ${error.message}`);
            }
          }, 3000 * (i%3)); // Increase the timeout delay per iteration
        });
      } else {
        return Promise.resolve(null); // Return null if it's not a paragraph
      }
    });
  
    const responses = await Promise.all(responsePromises);
    console.log(responses);
    try {
      revalidatePath(`/journals`);
      redirect(`/journals/${blockId}`);
    } catch (err) { 
    }

  } catch (error) {
    console.log("Error caught:", error);
  }
}