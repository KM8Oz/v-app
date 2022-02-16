import { makeid } from "@root/src/render/tools";
import { _isComputingDerivation } from "mobx";
import { types ,Instance, isAlive} from "mobx-state-tree";
export interface CArticlepayload {
    nom:string;
    code:string;
    format:string;
    Tauxremise:string;
    active:boolean;
    direction:boolean;
}
const CArticleModel = types.model({
    id: types.optional(types.string, makeid(8)),
    nom: types.string,
    code: types.string,
    format: types.string,
    Tauxremise: types.string,
    active: types.boolean,
    direction: types.boolean
})
type TypeCArticleModel = Instance<typeof CArticleModel>;
export { CArticleModel, TypeCArticleModel }