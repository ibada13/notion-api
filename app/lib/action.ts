'use server';
const { Client } = require('@notionhq/client');
import { redirect } from "next/navigation";
import { child_block_data_type , color, rich_text_type, State, Tag} from "./definitions";
import {z, ZodError} from 'zod';
import { revalidatePath } from "next/cache";
import { AES ,enc,lib} from "crypto-ts";
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


export async function fakecipher(title: any) {
  const cipher = AES.encrypt(title,String(process.env.KEY)).toString()
  console.log(cipher)
  console.log(AES.decrypt(cipher  ,String(process.env.KEY)).toString(enc.Utf8))
 }
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
  // fakecipher(title, tags, things)

  let response;
  try {
    response = await notion.pages.create({
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
  // console.log(response.status)
  catch (e: any) { 
    // console.log(e)
    return {
      
      message:"journal created err"+String(e.message)
    }
  }
  
  revalidatePath('/journals')
  redirect('/journals?message=' + encodeURIComponent("journal created suc"))
  // return response
}
function GetTags(result:any) { 
  const Tags = result.properties.Tags.multi_select.map((tag: any) => {
    return {
      id: tag.id, name: tag.name
    }
  })
  return Tags;
}

function Getimportant(results: any) {
  // console.log(results)
  const pure_results = results.map((result: any) => { 
    return {
      id: result.id,
      created_time :result.created_time , 
      updated_time : result.last_edited_time,
      [result.properties.Name.id]:result.properties.Name.title[0].plain_text,
      [result.properties.Tags.id]:GetTags(result)
    }
  })
  return pure_results; 
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
    // console.log(res.results[0].properties)
    const data = Getimportant(res.results)
    // console.log(data)
    return (data);
  } catch (e){ 
    console.log(String(e))
  }
  
}

export async function gen_RetrievePages() { 
  const data = await RetrievePages()
  const puredata = data.map((e: any) => { 
    try {

      const title = AES.decrypt(String(e["title"]), String(process.env.KEY)).toString(enc.Utf8)
      if (!title) {
        throw new Error('Decryption resulted in null or empty string');
      }
      return {
        ...e,
        "title": title,
      }
    }
    catch (err) { 
      // console.log("some error" +  err)
      return {
        ...e,
      }
    }
}
  )
  return puredata
}

export async function Retrieveblock(blockId:string) { 
  // const response = await notion.blocks.retrieve({
  //   block_id: blockId,
  // });
  // // console.log(response)
  return Retrieveblockchildrens(blockId)
}
export async function Retrieveblockchildrens(blockId: string) {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 200,
  });
  // console.log(response.results[5].paragraph)
  const data = process_blocks_data(response.results);
  return data; 
 }
    function process_blocks_data(blocks: any) {
      const pureblocks = blocks.map((block: any) => { 
        if (block.type === "heading_1") {

          return {
            content: block.heading_1.rich_text[0].plain_text,
          }
        }
        else { 
          return {
            content:block.paragraph.rich_text[0].plain_text
          }
        }
      })
      console.log(pureblocks)
      const orgnizeddata = pureblocks.map((block:any, index:any, arr:any) => { 
        if (index % 2 == 0 && arr[index + 1]) { 
          try {


            const encryptedParagraph = String(arr[index + 1].content);
            
            const decryptedParagraph = AES.decrypt(encryptedParagraph, String(process.env.KEY)).toString(enc.Utf8);
            
            return {
              heading: block.content,
              heading_class: index == 0 ? "bg-green-500" : index == 2 ? "bg-red-500" : "bg-blue-500",
              paragraph: decryptedParagraph,
              paragraph_class: index == 0 ? "text-green-500" : index == 2 ? "text-red-500" : "text-white",
              
            }
          } catch (err) { 
              return {
              heading: block.content,
              heading_class: index == 0 ? "bg-green-500" : index == 2 ? "bg-red-500" : "bg-blue-500",
              paragraph: String(arr[index+1]),
              paragraph_class: index == 0 ? "text-green-500" : index == 2 ? "text-red-500" : "text-white",
              
            }
          }
          
        }
      }).filter(Boolean)
      console.log(orgnizeddata)
      return orgnizeddata;
}


export async function TrashaApage(pageId:string) { 
  try {

    const response = await notion.pages.update({
      page_id: pageId,
      in_trash: true
    });
    revalidatePath('/test');
    console.log(response)
    return { message: 'Deleted Invoice' };
  } catch (err) { 
    console.log("some error ocurred : " +err )
  }
  
}