import { types ,Instance} from "mobx-state-tree";
import { makeid } from "@root/src/render/tools";
export interface CBonpayload {
    letter:string;
    code:string;
    format:string;
    active:boolean;
    direction:boolean;
}
const CBonModel = types.model({
    id:types.optional(types.string, makeid(8)),
    letter:types.string,
    code:types.string,
    format:types.string,
    active:types.boolean,
    direction:types.boolean
    
})
.actions((self)=>({
  
}))
type TypeCBonModel = Instance<typeof CBonModel>;

export { CBonModel, TypeCBonModel }
