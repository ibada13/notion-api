// 'use client';
const { Client } = require('@notionhq/client');
import { child_block_data_type , color, rich_text_type, Tag} from "./definitions";
const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function RetriveDatabase()  {
  const response = await notion.databases.retrieve({ database_id: process.env.DATABASE_ID });
  console.log(response);
  return response; 
};




export async function CreateApage({ title, tags ,things}: { title: string, tags:string[] ,things:child_block_data_type}) { 
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
              "content": title,
            }
          }]
      },
      [process.env.DATABASE_TAGS_ID as string]: {
        'multi_select': tags.map((tag) => ({ name: tag })) as {name:string}[]
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
          "color"  :  "green_background"  as color,
          "is_toggleable": false
        }
      },
      {
        
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text:[
            {
            "type": "text",
            "text": {
              "content": things.positive_things,
              "link": null
            },
            "annotations": {
              "color":"green" 
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
              "content":"negative things",
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
          rich_text:[
            {
            "type": "text",
            "text": {
              "content": things.negative_things,
              "link": null
            },
            "annotations": {
              "color":"red"

            },
          
          
            }] as rich_text_type
        }
      },{
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
          rich_text:[
            {
            "type": "text",
            "text": {
              "content": things.other,
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
  console.log(response)
  return response
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
 

    const res = await notion.databases.query({
      database_id: process.env.DATABASE_ID,
      sorts: [
        {
          property: process.env.DATABASE_CREATED_ID,
          direction: "descending"
        }
      ]
    })
  
    console.log(Getimportant(res.results))
    
}

