import { Instance, types } from "mobx-state-tree";
import { makeid } from "../../tools";
enum TypesBons {M="M", J="J", C="C", H="H"};
const MetaInfo = types.model({
    companyId:types.maybe(types.string),
    createById:types.maybe(types.string),
    lastEditById:types.maybe(types.string),
    createByName:types.maybe(types.string),
    lastEditByName:types.maybe(types.string),
    lastEdit:types.optional(types.string, new Date().toDateString()),
    facturation_id:types.maybeNull(types.string),
    factured:types.optional(types.boolean, false)
})
const Bon = types.model({
    meta:MetaInfo, 
    id:types.optional(types.string, makeid(10)),
    city:types.maybeNull(types.string),
    Provider:types.maybeNull(types.string),
    Code0:types.string,
    Code1:types.string,
    Code2:types.string,
    type:types.optional(types.enumeration(["M", "j", "C", "H"]), TypesBons.H),
    Quantity:types.optional(types.string, "0"),
    StationCode:types.optional(types.string, "0"),
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
    List:types.optional(types.array(Bon), [])
}).views(()=>({
    default:()=>({
        meta:{
            companyId:"",
            createById:"",
            lastEditById:"",
            createByName:"",
            lastEditByName:"",
           lastEdit:new Date().toDateString(),
           factured:false,
           facturation_id:null
        },
        type:TypesBons.M, 
        id:makeid(8),
        city:"Agadir",
        Provider:"LOCALUB",
        Code0:"0",
        Code1:"ADE00000000",
        Code2:"0",
        StationCode:"0",
        Comment:"NB:",
        VouchersTotalNet:"0",
        VouchersTotalBrut:"0",
        UnitPrice:"0",
        VouchersCount:"0",
        ConsumedKilos:"",
        Quantity:"0",
        signedBy:"Nom Complete",
        issued:new Date().toDateString()
    })
})).actions((self)=>({
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