import { Instance, types } from "mobx-state-tree";
const MetaInfo = types.model({
    id:types.identifier,
    companyId:types.string,
    createById:types.number,
    lastEditById:types.number,
    createByName:types.number,
    lastEditByName:types.number,
    lastEdit:types.Date,
})
const Bon = types.model({
    id:types.identifier,
    city:types.maybeNull(types.string),
    Provider:types.maybeNull(types.string),
    Code0:types.string,
    Code1:types.string,
    Code2:types.string,
    StationCode:types.string,
    Comment:types.maybe(types.string),
    VouchersTotalNet:types.optional(types.string, "0"),
    VouchersTotalBrut:types.optional(types.string, "0"),
    UnitPrice:types.optional(types.string, '0'),
    VouchersCount:types.optional(types.string, '0'),
    ConsumedKilos:types.optional(types.string, '0'),
    signedBy:types.maybeNull(types.string),
    issued:types.optional(types.string, new Date().toDateString())
})
export type BonInstance =  Instance<typeof Bon>;
const BonsModel = types.model({
    meta:types.maybeNull(MetaInfo), 
    List:types.optional(types.array(Bon), [])
}).actions((self)=>({
     add: async (bon:BonInstance)=>{
       const existCode0 = self.List.findIndex(e=>e.Code0 == bon.Code0) != -1;
       const existCode1 = self.List.findIndex(e=>e.Code1 == bon.Code1) != -1;
       const existCode2 = self.List.findIndex(e=>e.Code1 == bon.Code1) != -1;
       const actionSave = async (bon:BonInstance)=>{
            self.List.push(bon);
       }
       if(existCode0){
           return { status:false, reason:"Bon `code de bon` already exist" };
       } else if(existCode1) {
           return { status:false, reason:"Bon `codebar` already exist" };
       } else if(existCode2) {
        return { status:false, reason:"Bon `code` already exist" };
    } else {
        try {
            return await actionSave(bon).then(()=>({status:true,reason:"ok"}));
        } catch (error) {
            return { status:false, reason:"error:"+error }
        }
       }
     }
})) 
type BonType = Instance<typeof BonsModel>;
export { BonsModel, BonType }