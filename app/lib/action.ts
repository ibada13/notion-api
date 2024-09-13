'use server';
const { Client } = require('@notionhq/client');
import { redirect } from "next/navigation";
import { child_block_data_type , color, rich_text_type, State, Tag} from "./definitions";
import {z, ZodError} from 'zod';
import { revalidatePath } from "next/cache";
import { AES, enc, lib } from "crypto-ts";
import { Getimportant ,process_blocks_data,gen_RetrievePages} from "./extraactions";
import { get_data } from "./function_data";
const FormSchema = z.object({
    title: z.string(), 
  tags: z.array(z.string()),
   things:z.object( {
    positive_things:z.string() ,
    negative_things:z.string() ,
    other_things:z.string() ,
  })

});
const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function RetriveDatabase()  {
  const response = await notion.databases.retrieve({ database_id: process.env.DATABASE_ID });
  console.log(response);
  return response; 
};


const CreatePage = FormSchema;



export async function CreateApage(prevstate:State,formData:FormData) { 
  

    const parsedData = CreatePage.safeParse({
      title: formData.get('title'),
      tags: (formData.get('tags') as string).split(" ").filter(Boolean),
      things: {
        positive_things: formData.get('positive_things'),
        negative_things: formData.get('negative_things'),
        other_things: formData.get('other_things'),
      }
    
    })
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

export async function update_journal(prev: State, formData: FormData) { 
  return {}
}