import { 
    // Instance, 
    types 
} from "mobx-state-tree";
import { makeid } from "@render/tools";
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
    history:types.optional(types.array(EditEvent), [])
}).actions((self)=>({
   setUsername(val:string){
       self.meta.username = val;
   },
   login(username:string, password:string){
   // const packet = EncPacket({username,password});
   }
}))
// type UserType = Instance<typeof UserModel>;

export { UserModel }