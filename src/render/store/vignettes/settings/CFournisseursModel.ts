import { makeid } from "@root/src/render/tools";
import { types ,Instance} from "mobx-state-tree";
export interface CFournisseurspayload {
  nom:string;
  code:string;
  format:string;
  active:boolean;
  direction:boolean;
}
const CFournisseursModel = types.model({
  id:types.optional(types.string, makeid(8)),
  nom:types.string,
  code:types.string,
  format:types.string,
  active:types.boolean,
  direction:types.boolean
})
export type TypeCFournisseursModel = Instance<typeof CFournisseursModel>;
export { CFournisseursModel }