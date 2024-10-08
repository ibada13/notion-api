import { AES, enc } from "crypto-ts";

const TagId =  [process.env.DATABASE_TAGS_ID]

/*some extra funxtion that used in projects */


export function GetTags(result:any) { 
    const Tags = result.properties.Tags.multi_select.map((tag: any) => {
      return {
        id:tag.id , name: tag.name
      }
    })
    return Tags;
}


export  function fakecipher(title: any) {
    const cipher = AES.encrypt(title,String(process.env.KEY)).toString()
    console.log(cipher)
    console.log(AES.decrypt(cipher  ,String(process.env.KEY)).toString(enc.Utf8))
   }


  export function Getimportant(results: any) {
    var data; 
    const processResult = (result: any) => {
      return {
        id: result.id,
        created_time: result.created_time,
        updated_time: result.last_edited_time,
        [result.properties.Name.id]: result.properties.Name.title[0]?.plain_text,
        [result.properties.Tags.id]: GetTags(result),
      };
    };
  
    if (Array.isArray(results)) {
      data =  results.map(processResult);
    } else {
      data =  processResult(results);
    }
    return handel_title_decryption(data)
    
  }
export function process_blocks_data(blocks: any) {
    const pureblocks = blocks.map((block: any) => { 
      if (block.type === "Heading_1") {

        return {
          content: block.Heading_1.rich_text[0]?.plain_text,
        }
      }
      else { 
        return {
          id:block.id,
          content:block.paragraph.rich_text[0]?.plain_text
        }
      }
    })
    const orgnizeddata = pureblocks.map((block:any, index:any, arr:any) => { 
      if (index % 2 == 0 && arr[index + 1]) { 
        try {


          const encryptedParagraph = String(arr[index + 1].content);
          
          const decryptedParagraph = AES.decrypt(encryptedParagraph, String(process.env.KEY)).toString(enc.Utf8);
          
          return {
            id:arr[index+1].id , 
            Heading: block.content,
            Heading_class: index == 0 ? "bg-green-500" : index == 2 ? "bg-red-500" : "bg-blue-500",
            paragraph: decryptedParagraph,
            paragraph_class: index == 0 ? "text-green-500" : index == 2 ? "text-red-500" : "text-white",
            
          }
        } catch (err) { 
          return {
              
            id:arr[index+1].id , 
            Heading: block.content,
            Heading_class: index == 0 ? "bg-green-500" : index == 2 ? "bg-red-500" : "bg-blue-500",
            paragraph: String(arr[index+1]),
            paragraph_class: index == 0 ? "text-green-500" : index == 2 ? "text-red-500" : "text-white",
            
          }
        }
        
      }
    }).filter(Boolean)
  
  return orgnizeddata;
    
}



export function handel_title_decryption(data: any) {
  const processItem = (e: any) => {
    try {
      const title = AES.decrypt(String(e["title"]), String(process.env.KEY)).toString(enc.Utf8);
      if (!title) {
        throw new Error('Decryption resulted in null or empty string');
      }
      return {
        ...e,
        "title": title,
      };
    } catch (err) {
      console.error("Decryption error:", err);
      return {
        ...e,
      };
    }
  };

  if (Array.isArray(data)) {
    return data.map(processItem);
  } else {
    return processItem(data);
  }
}


export function HandelTags(data: any) {
  const tags = data[TagId as unknown as string].map((e:any) => { 
    return e.name; 
  })
  data["tags"] = tags.join(" ");
  return data; 
 }