/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 19/12/2021 - 16:58:00
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/12/2021
    * - Author          : 
    * - Modification    : 
**/
import { Instance, types } from "mobx-state-tree";
import { makeid } from "../../tools";
// enum TypesBons {M="M", J="J", C="C", H="H"};
const MetaInfo = types.model({
    createById:types.maybe(types.string),
    lastEditById:types.maybe(types.string),
    lastEdit:types.optional(types.string, new Date().toDateString()),
    facturation_id:types.maybeNull(types.string),
    factured:types.optional(types.boolean, false)
})

const Bon = types.model({
    meta:types.maybeNull(MetaInfo), 
    CFournisseur:types.string,
    CArticle:types.string,
    CBon:types.string,
    codeStation:types.string,
    CBar:types.string,
    DBon:types.string,
    DFacture:types.string,
    MontantTotal:types.string,
    NFacture:types.string,
    PU:types.string,
    Quantity:types.string,
    Signature:types.string,
    SNTL:types.maybeNull(types.string)
})
export type BonInstance =  Instance<typeof Bon>;
const BonsModel = types.model({
    List:types.optional(types.array(Bon), [])
}).views(()=>({
     
})).actions((self)=>({
      
})) 
type BonType = Instance<typeof BonsModel>;
interface BonSimpleType {
    // meta?:typeof MetaInfo;
    CFournisseur?:string;
    CArticle?:string;
    CBon?:string;
    codeStation?:string;
    CBar?:string;
    DBon?:string;
    DFacture?:string;
    MontantTotal?:string;
    NFacture?:string;
    PU?:string;
    Quantity?:string;
    Signature?:string;
    SNTL?:string;
}
export { BonsModel, BonType, BonSimpleType }