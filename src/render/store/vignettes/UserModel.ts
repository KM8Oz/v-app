/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 17/12/2021 - 23:31:02
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/12/2021
    * - Author          : 
    * - Modification    : 
**/
import { 
    // Instance, 
    types 
} from "mobx-state-tree";
import { makeid } from "@render/tools";
import CryptoJS from "crypto-js";
import { EncPacket } from "../../tools/encryption";
// import { EncPacket } from "tools/encryption";
const MetaInfo = types.model({
    id:types.optional(types.identifier, makeid(8)),
    mac:types.maybeNull(types.string),
    name:types.maybeNull(types.string),
    username:types.maybeNull(types.string),
    lastActive:types.maybeNull(types.Date),
    key:types.maybeNull(types.string)
})
const EditEvent = types.model({
    id:types.optional(types.identifier, makeid(8)),
    desc:types.maybeNull(types.string),
    ip:types.maybeNull(types.string),
    mac:types.maybeNull(types.string)
})
const UserModel = types.model({
    meta:types.optional(MetaInfo, {}), 
    history:types.optional(types.array(EditEvent), []),
    ssid:types.maybeNull(types.string)
}).actions((self)=>({
   setUsername(val:string){
       self.meta.username = val;
   },
   login(username:string, password:string){
 
   },
   setssid(v:string){
    self.ssid = v;
   }
}))
// type UserType = Instance<typeof UserModel>;

export { UserModel }