import { Instance, isAlive, types } from "mobx-state-tree";
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
type BonType = Instance<typeof Bon>;

const Facture = types.model({
    id:types.identifier,
    Code:types.string,
    Bons:types.optional(types.array(Bon), [])
}).actions((self)=>({
    addReplaceBon(bon:BonType){
        if(isAlive(self)){
            let exist = self.Bons.find(s=>s.CBon == bon.CBon);
            if(exist) self.Bons.remove(exist)
            self.Bons.push(bon)
        }
    }
}))
const FacturesModel = types.model({
    meta:types.maybeNull(MetaInfo), 
    List:types.optional(types.array(Facture), [])
})

export { FacturesModel }