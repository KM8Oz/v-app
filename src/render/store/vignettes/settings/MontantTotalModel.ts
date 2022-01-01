import { makeid } from "@root/src/render/tools";
import { types ,Instance} from "mobx-state-tree";
export interface MontantTotalpayload {
    code:string;
    format:string;
    active:boolean;
    direction:boolean;
}
const MontantTotalModel = types.model({
    id:types.optional(types.string, makeid(8)),
    code:types.string,
    format:types.string,
    active:types.boolean,
    direction:types.boolean
})
.actions((self)=>({

}))
type TypeMontantTotalModel = Instance<typeof MontantTotalModel>;

export { MontantTotalModel, TypeMontantTotalModel }