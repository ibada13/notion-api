import { AES } from "crypto-ts"
import { color, rich_text_type } from "./definitions"




export function get_data({ title, tags, things }: { title: string, tags: string[], things?:  {positive_things:string , negative_things:string,other_things:string} } ) { 
  return {
  
    properties: {
      [process.env.DATABASE_NAME_ID as string]: {
        "id": "title",
        "type": "title",
        "title": [
          {
            "type": "text",
            "text": {
              "content": AES.encrypt(title, String(process.env.KEY)).toString(),
            }
          }]
      },
      [process.env.DATABASE_TAGS_ID as string]: {
        'multi_select': (tags as string[])?.length > 0 ? (tags as string[]).map((tag) => ({ name: tag })) as { name: string }[] : [{ name: "no tags" }]
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
                "content": AES.encrypt(things?things.positive_things:"void", String(process.env.KEY)).toString(),
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
                "content": AES.encrypt(things?things.negative_things:"void", String(process.env.KEY)).toString(),
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
                "content": AES.encrypt(things?things.other_things:"void", String(process.env.KEY)).toString(),
                "link": null
              },
              "annotations": {
                "color": "default"
              },
            
      
            }] as rich_text_type
        }
      }
    ]
  }
}