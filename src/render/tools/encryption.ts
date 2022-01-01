/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 18/12/2021 - 00:06:16
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/12/2021
    * - Author          : 
    * - Modification    : 
**/
import CryptoJS from "crypto-js";
import { makeid } from "@render/tools";
enum types_entries {
    object="01",
    string="02",
    function="03"
}

function encrypted(val:string){
    // var salt = CryptoJS.lib.WordArray.random(128 / 8)
    // var key128Bits = CryptoJS.PBKDF2(secret, salt, {
    //     keySize: 128 / 32
    // });
    /*
    * decryption function: 
    *  function decrypt(packet:string){ 
    * const secret = packet.slice(0,-2).slice(-1);
    * const type = TYPES[packet.slice(-2)];
    * const TYPES = { "01":"object",
    * "02":"string",
    * "03":"function"
    * }
    * return CryptoJS.TripleDES.decrypt(val, secret);
    * }
    */
    const secret = makeid(8);
   return CryptoJS.TripleDES.encrypt(val, secret)+secret+'8';
}
function EncPacket(entries:object | string | Function){
    switch (typeof entries) {
        case 'object':
            const data = JSON.stringify(entries);
            return encrypted(data)+types_entries.object;
            case 'function':
                return entries;
        default:
            return encrypted(entries as string)+types_entries.string;
    }
}

export { EncPacket };