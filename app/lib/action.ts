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
  console.log(response)
  const data = process_blocks_data(response.results);
  
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

export async function update_journal( blockId:string,Ids:string[],formData: FormData):Promise<State | undefined> { 
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
    
    const response =data.children.map((e, i) => { 
      console.log(Ids[i])
      if (e.type === "paragraph") { 
        setTimeout(async() => { 

          const response = await notion.blocks.update({
            "block_id": Ids[i%3],
            "paragraph":e.paragraph
          })
          return response;
        },3000*i%3)
      }
    }
    )
    console.log(response);
  } catch (e) { 
    console.log(e)
  }
  
}