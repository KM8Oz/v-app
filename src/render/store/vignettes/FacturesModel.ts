import { types } from "mobx-state-tree";
import { BonsModel, BonType } from "./BonsModel";
const MetaInfo = types.model({
    id:types.identifier,
    companyId:types.string,
    createById:types.number,
    lastEditById:types.number,
    createByName:types.number,
    lastEditByName:types.number,
    lastEdit:types.Date,
})
const Facture = types.model({
    id:types.identifier,
    Code:types.string,
    Bons:types.optional(types.array(BonsModel), [])
})
const FacturesModel = types.model({
    meta:types.maybeNull(MetaInfo), 
    List:types.optional(types.array(Facture), [])
})

export { FacturesModel }