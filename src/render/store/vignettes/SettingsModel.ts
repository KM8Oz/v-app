import { types, Instance, isAlive } from "mobx-state-tree";
import {
    CFournisseursModel,
    CArticleModel,
    CBarModel,
    CBonModel,
    DBonModel,
    DFactureModel,
    MontantTotalModel,
    NFactureModel,
    PUModel,
    QuantityModel,
    TypeCArticleModel,
    CArticlepayload,
    StationModel,
    Stationpayload
} from "./settings"
const SettingsModel = types.model({
    Station:types.optional(types.array(StationModel), []),
    CFournisseurs: types.optional(types.array(CFournisseursModel), []),
    CArticle: types.optional(types.array(CArticleModel), []),
    CBon: types.optional(types.array(CBonModel), []),
    CBar: types.optional(types.array(CBarModel), []),
    DBon: types.optional(types.array(DBonModel), []),
    DFacture: types.optional(types.array(DFactureModel), []),
    MontantTotal: types.optional(types.array(MontantTotalModel), []),
    NFacture: types.optional(types.array(NFactureModel), []),
    PU: types.optional(types.array(PUModel), []),
    Quantity: types.optional(types.array(QuantityModel), []),
})
    .actions((self) => ({
        genCArticle() {
            if (isAlive(self)) self.CArticle.push({
                nom: "Article",
                code: "140",
                format: "XXX",
                Tauxremise:"0.5",
                active: false,
                direction: true
            })
        },
        editCArticle: (id:string, payload: CArticlepayload) => {
            if (isAlive(self)) {
                let _em = self.CArticle.find(e => e.id == id)
                if (_em) self.CArticle.remove(_em);
                self.CArticle.push(payload)
            }
        },
        rmCArticle(id: string) {
            if (isAlive(self)) {
                let _em = self.CArticle.find(e => e.id == id)
                if (_em) self.CArticle.remove(_em);
            }
        },
        genCBar() {
            if (isAlive(self)) self.CBar.push({
                code: "AA000000",
                format: "YYXXXXXX",
                active: false,
                direction: true
            })
        },
        editCBar: (id:string, payload: CArticlepayload) => {
            if (isAlive(self)) {
                let _em = self.CBar.find(e => e.id == id)
                if (_em) self.CBar.remove(_em);
                self.CBar.push(payload)
            }
        },
        rmCBar(id: string) {
            if (isAlive(self)) {
                let _em = self.CBar.find(e => e.id == id)
                if (_em) self.CBar.remove(_em);
            }
        },
        genCBon() {
            if (isAlive(self)) self.CBon.push({
                letter:"M",
                code: "C000000",
                format: "YXXXXXX",
                active: false,
                direction: true
            })
        },
        editCBon: (id:string, payload: CArticlepayload) => {
            if (isAlive(self)) {
                let _em = self.CBon.find(e => e.id == id)
                if (_em) self.CBon.remove(_em);
                self.CBon.push(payload)
            }
        },
        rmCBon(id: string) {
            if (isAlive(self)) {
                let _em = self.CBon.find(e => e.id == id)
                if (_em) self.CBon.remove(_em);
            }
        },
        genCFournisseurs() {
            if (isAlive(self)) self.CFournisseurs.push({
                nom: "nom",
                code: "030",
                format: "XXX",
                active: false,
                direction: true
            })
        },
        editCFournisseurs: (id:string, payload: CArticlepayload) => {
            if (isAlive(self)) {
                let _em = self.CFournisseurs.find(e => e.id == id)
                if (_em) self.CFournisseurs.remove(_em);
                self.CFournisseurs.push(payload)
            }
        },
        rmCFournisseurs(id: string) {
            if (isAlive(self)) {
                let _em = self.CFournisseurs.find(e => e.id == id)
                if (_em) self.CFournisseurs.remove(_em);
            }
        },
        genDBon() {
            if (isAlive(self)) self.DBon.push({
                code: "12122020",
                format: "DDMMYYYY",
                active: false,
                direction: true
            })
        },
        editDBon: (id:string, payload: CArticlepayload) => {
            if (isAlive(self)) {
                let _em = self.DBon.find(e => e.id == id)
                if (_em) self.DBon.remove(_em);
                self.DBon.push(payload)
            }
        },
        rmDBon(id: string) {
            if (isAlive(self)) {
                let _em = self.DBon.find(e => e.id == id)
                if (_em) self.DBon.remove(_em);
            }
        },
        genDFacture() {
            if (isAlive(self)) self.DFacture.push({
                code: "12122020",
                format: "DDMMYYYY",
                active: false,
                direction: true
            })
        },
        editDFacture: (id:string, payload: CArticlepayload) => {
            if (isAlive(self)) {
                let _em = self.DFacture.find(e => e.id == id)
                if (_em) self.DFacture.remove(_em);
                self.DFacture.push(payload)
            }
        },
        rmDFacture(id: string) {
            if (isAlive(self)) {
                let _em = self.DFacture.find(e => e.id == id)
                if (_em) self.DFacture.remove(_em);
            }
        },
        genMontantTotal() {
            if (isAlive(self)) self.MontantTotal.push({
                code: "0000,00",
                format: "XXXXXXXX",
                active: false,
                direction: true
            })
        },
        editMontantTotal: (id:string, payload: CArticlepayload) => {
            if (isAlive(self)) {
                let _em = self.MontantTotal.find(e => e.id == id)
                if (_em) self.MontantTotal.remove(_em);
                self.MontantTotal.push(payload)
            }
        },
        rmMontantTotal(id: string) {
            if (isAlive(self)) {
                let _em = self.MontantTotal.find(e => e.id == id)
                if (_em) self.MontantTotal.remove(_em);
            }
        },
        genNFacture() {
            if (isAlive(self)) self.NFacture.push({
                code: "000000",
                format: "XXXXXX",
                active: false,
                direction: true
            })
        },
        editNFacture: (id:string, payload: CArticlepayload) => {
            if (isAlive(self)) {
                let _em = self.NFacture.find(e => e.id == id)
                if (_em) self.NFacture.remove(_em);
                self.NFacture.push(payload)
            }
        },
        rmNFacture(id: string) {
            if (isAlive(self)) {
                let _em = self.NFacture.find(e => e.id == id)
                if (_em) self.NFacture.remove(_em);
            }
        },
        genPU() {
            if (isAlive(self)) self.PU.push({
                code: "0000,00",
                format: "XXXXXX",
                active: false,
                direction: true
            })
        },
        editPU: (id:string, payload: CArticlepayload) => {
            if (isAlive(self)) {
                let _em = self.PU.find(e => e.id == id)
                if (_em) self.PU.remove(_em);
                self.PU.push(payload)
            }
        },
        rmPU(id: string) {
            if (isAlive(self)) {
                let _em = self.PU.find(e => e.id == id)
                if (_em) self.PU.remove(_em);
            }
        },
        genQuantity() {
            if (isAlive(self)) self.Quantity.push({
                code: "0000,00",
                format: "XXXXXX",
                active: false,
                direction: true
            })
        },
        editQuantity: (id:string, payload: CArticlepayload) => {
            if (isAlive(self)) {
                let _em = self.Quantity.find(e => e.id == id)
                if (_em) self.Quantity.remove(_em);
                self.Quantity.push(payload)
            }
        },
        rmQuantity(id: string) {
            if (isAlive(self)) {
                let _em = self.Quantity.find(e => e.id == id)
                if (_em) self.Quantity.remove(_em);
            }
        },
        genStation() {
            if (isAlive(self)) self.Station.push({
                nom:"station 0",
                active: false
            })
        },
        editStation: (id:string, payload: Stationpayload) => {
            if (isAlive(self)) {
                let _em = self.Station.find(e => e.id == id)
                if (_em) self.Station.remove(_em);
                self.Station.push(payload)
            }
        },
        rmStation(id: string) {
            if (isAlive(self)) {
                let _em = self.Station.find(e => e.id == id)
                if (_em) self.Station.remove(_em);
            }
        },
        
    }))
    .views((self) => ({
        Articles: () => self.CArticle.map(e=>({value:e.code,label:e.nom,format:e.format})),
        CodeBon: () => self.CBon,
        CodeFournisseur: () => self.CFournisseurs.map(e=>({value:e.nom,code:e.code,format:e.format, dr:e.direction})),
        DateBon: () => self.DBon,
        Quntity: () => self.Quantity,
        PrisUnite: () => self.PU,
        Stations: () => self.Station
    }))
type TypeSettingsModel = Instance<typeof SettingsModel>;

export { SettingsModel, TypeSettingsModel }