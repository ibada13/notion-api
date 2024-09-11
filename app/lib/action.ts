'use server';
const { Client } = require('@notionhq/client');
import { redirect } from "next/navigation";
import { child_block_data_type , color, rich_text_type, State, Tag} from "./definitions";
import {z, ZodError} from 'zod';
import { revalidatePath } from "next/cache";
import { AES, enc, lib } from "crypto-ts";
import { Getimportant ,process_blocks_data,gen_RetrievePages} from "./extraactions";
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
  const response = await notion.pages.create({
      parent: {
        database_id: process.env.DATABASE_ID
      },
      properties: {
        [process.env.DATABASE_NAME_ID as string]: {
          "id": "title",
          "type": "title",
          "title": [
            {
              "type": "text",
              "text": {
                "content": AES.encrypt(title, String(process.env.KEY )).toString(),
              }
            }]
        },
        [process.env.DATABASE_TAGS_ID as string]: {
          'multi_select': (tags as string[])?.length > 0 ? (tags as string[]).map((tag) => ({ name: tag })) as { name: string }[] : [{name:"no tags"}]
        },
      
      
      },
      children: [
        {
          "type": "heading_1",
          "heading_1": {
            "rich_text": [{
              "type": "text",
              "text": {
                "content": "positive things",
                "link": null
              }
            }],
            "color": "green_background" as color,
            "is_toggleable": false
          }
        },
        {
        
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                "type": "text",
                "text": {
                  "content": AES.encrypt(things?.positive_things,String(process.env.KEY)).toString(),
                  "link": null
                },
                "annotations": {
                  "color": "green"
                },
              }] as rich_text_type
          }
        },
        {
          "type": "heading_1",
          "heading_1": {
            "rich_text": [{
              "type": "text",
              "text": {
                "content": "negative things",
                "link": null
              }
            }],
            "color": "red_background" as color,
            "is_toggleable": false
          }
        },
        {
        
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                "type": "text",
                "text": {
                  "content": AES.encrypt(things?.negative_things,String(process.env.KEY)).toString(),
                  "link": null
                },
                "annotations": {
                  "color": "red"

                },
          
          
              }] as rich_text_type
          }
        }, {
          "type": "heading_1",
          "heading_1": {
            "rich_text": [{
              "type": "text",
              "text": {
                "content": "other",
                "link": null
              }
            }],
            "color": "blue" as color,
            "is_toggleable": false
          }
        },
        {
        
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                "type": "text",
                "text": {
                  "content": AES.encrypt(things?.other_things,String(process.env.KEY)).toString(),
                  "link": null
                },
                "annotations": {
                  "color": "default"
                },
          
          
              }] as rich_text_type
          }
        }
      ]
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