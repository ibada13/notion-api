export type Tag = "Daily" | "Special Event" | "Work" | "Personal" | "Planing" | string
null
      
export type color=  "blue"| "blue_background"| "brown"| "brown_background"| "default"| "gray"| "gray_background"| "green"| "green_background"| "orange"|"orange_background"| "pink"| "pink_background"| "purple"| "purple_background"| "red"| "red_background"| "yellow"| "yellow_background"
export const color :[color,color][]= [
    ["blue", "blue"],
    ["blue_background", "blue"],
    ["brown", "brown"],
    ["brown_background", "brown"],
    ["default", "default"],
    ["gray", "gray"],
    ["gray_background", "gray"],
    ["green", "green"],
    ["green_background", "green"],
    ["orange", "orange"],
    ["orange_background", "orange"],
    ["pink", "pink"],
    ["pink_background", "pink"],
    ["purple", "purple"],
    ["purple_background", "purple"],
    ["red", "red"],
    ["red_background", "red"],
    ["yellow", "yellow"],
    ["yellow_background", "yellow"],

  ];
  
export type rich_text_type =   [
    {
    "type": "text",
    "text": {
      "content": string,
      "link"?: null|string
    },
    "annotations"?: {
      "bold"?: boolean,
      "italic"?: boolean,
      "strikethrough"?: boolean,
      "underline"?: boolean,
      "code"?: boolean,
      "color"?: color
        },
        "plain_text"?: string,
        "href"?: string
    }]
  
    export  type child_block_data_type = {
        negative_things: string|null,
        positive_things: string|null, 
        other:string|null 
    }