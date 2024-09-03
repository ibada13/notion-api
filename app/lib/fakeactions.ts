import { pbkdf2 } from "crypto";
export function genratekey() { 
    const password = "I just keep moving forward until my enemies are destroyed.";
    const salt = "The talkative people will not hear the silent voice of the footsteps of time escaping.";
    const iter = 200305303; 
    console.log('This is a test.');

    const keylen = 256;
    const digst = 'sha256';
     pbkdf2(password, salt, iter, keylen,digst , (err,derivedkey)=>{ 
         if (err) { 
             console.log(err)
         } else { 
             console.log(derivedkey.toString('hex'))
         }
    })
}