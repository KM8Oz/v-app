import { makeid } from "@root/src/render/tools";
import { types ,Instance} from "mobx-state-tree";
export interface CBarpayload {
    code:string;
    format:string;
    active:boolean;
    direction:boolean;
}
const CBarModel = types.model({
    id:types.optional(types.string, makeid(8)),
    code:types.string,
    format:types.string,
    active:types.boolean,
    direction:types.boolean
})
.actions((self)=>({

}))
type TypeCBarModel = Instance<typeof CBarModel>;

export { CBarModel, TypeCBarModel }