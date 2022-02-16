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
import { maybeNull } from "mobx-state-tree/dist/internal";
import { makeid } from "../../tools";
// enum TypesBons {M="M", J="J", C="C", H="H"};
const MetaInfo = types.model({
    createById: types.maybeNull(types.string),
    lastEditById: types.maybeNull(types.string),
    lastEdit: types.optional(types.Date, new Date()),
    factured: types.optional(types.boolean, false)
})

const Bon = types.model({
    meta: MetaInfo,
    CFournisseur: types.string,
    CArticle: types.string,
    CBon: types.string,
    // codeStation:types.string,
    CBar: types.string,
    DBon: types.string,
    Count: types.maybeNull(types.string),
    MontantTotalBrut: types.maybeNull(types.string),
    DFacture: types.maybeNull(types.string),
    Kilos: types.maybeNull(types.string),
    Ville: types.string,
    MontantTotal: types.string,
    NFacture: types.maybeNull(types.string),
    PU: types.string,
    Quantity: types.string,
    Signature: types.string,
    SNTL: types.maybeNull(types.string)
})
export type BonInstance = Instance<typeof Bon>;
const BonsModel = types.model({
    List: types.optional(types.array(Bon), [])
}).views((self) => ({
    Signatures: () => self.List.map(e => ({ value: e.Signature }))
})).actions((self) => ({
    editFactured(code:string){
    return new Promise((resolve, reject)=>{
        try {
            let _exist = self.List.find((s)=>s.CBon == code);
            if(!_exist) reject("not exist!");
            _exist.meta.factured = !_exist.meta.factured;
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
    },
    removeBon(code:string){
    return new Promise((resolve, reject)=>{
        try {
            let _exist = self.List.find((s)=>s.CBon == code);
            if(!_exist) reject("not exist!");
            self.List.remove(_exist)
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
    },
    add(bon: BonSimpleType) {
        return new Promise((resolve, reject) => {
            try {
                let exis = self.List.findIndex(W => W.CBon == bon?.CBon) !== -1;
                if (exis) reject(false);
                self.List.push(bon)
                resolve(true)
            } catch (error) {
                console.log(error);
                reject(false)
            }
        })

    }
}))
type BonType = Instance<typeof Bon>;
interface BonSimpleType {
    meta?: {
        createById: string,
        lastEditById: string,
        lastEdit?:Date,
        factured?:boolean
    },
    CFournisseur?: string;
    CArticle?: string;
    CBon?: string;
    // codeStation?:string;
    comment?: string,
    CBar?: string;
    MontantVignette?: string,
    DBon?: string;
    DFacture?: string;
    Ville?: string,
    Kilos?: string,
    MontantTotalBrut?: string,
    MontantTotal?: string;
    NFacture?: string;
    PU?: string;
    Quantity?: string;
    Signature?: string;
    SNTL?: string;
}
export { BonsModel, BonType, BonSimpleType }