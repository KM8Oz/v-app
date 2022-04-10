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
import { Instance, types, isAlive } from "mobx-state-tree";
import { maybeNull } from "mobx-state-tree/dist/internal";
import { makeid } from "../../tools";
import { IOPrivate } from '../../tools/sockets';
const { machineId } = require("node-machine-id")
// enum TypesBons {M="M", J="J", C="C", H="H"};
const MetaInfo = types.model({
    createById: types.maybeNull(types.string),
    lastEditById: types.maybeNull(types.string),
    lastEdit: types.optional(types.Date, new Date()),
    factured: types.optional(types.boolean, false),
    selected: types.optional(types.boolean, false)
})

const Bon = types.model({
    meta: MetaInfo,
    uuid: types.maybeNull(types.string),
    CFournisseur: types.string,
    CArticle: types.string,
    CBon: types.string,
    station:types.maybeNull(types.string),
    CBar: types.string,
    DBon: types.string,
    Count: types.maybeNull(types.string),
    MontantTotalBrut: types.maybeNull(types.string),
    DFacture: types.maybeNull(types.string),
    Kilos: types.maybeNull(types.string),
    Ville: types.string,
    MontantVignette:types.maybeNull(types.string),
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
    Signatures: () => self.List
    .filter(a => !(self.List.findIndex(s=>s.Signature == a.Signature) != -1))
    .map(e => ({ value: e.Signature }))
})).actions((self) => ({
    editFactured(code:string){
    return new Promise((resolve, reject)=>{
        try {
            let _exist = self.List.find((s)=>s.uuid == code);
            if(!_exist && !_exist.meta.factured) reject("not exist!");
            _exist.meta.selected = !_exist.meta.selected;
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
    },
    changeFacturationData(code:string, date:string, number:string, ssid:string){
        return new Promise((resolve, reject)=>{
            try {
                let _exist = self.List.find((s)=>s.uuid == code);
                if(!_exist) reject(false);
                let __f = _exist.SNTL.substring(0,3) + number + _exist.SNTL.slice(-58)
                _exist.SNTL = __f.substring(0,9) + date + __f.slice(-52)
                _exist.DFacture = date
                _exist.NFacture = number
                _exist.meta.factured = true
                let _private = IOPrivate(ssid);
                machineId().then((ID) => {
                    let onlineBonEdit = {
                      uuid:_exist.uuid,
                      SNTL:_exist.SNTL,
                      factured:true,
                      machine:ID,
                      lastmachine:ID
                   } 
                   _private.emit("call", "vignettes.addOrUpdate", onlineBonEdit , async (err:any, res:any) => {
                    if(res){
                      console.log(res);
                    } else {
                       console.log(err);
                    }
                })
                })
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    },
    deFacturationData(code:string){
        return new Promise((resolve, reject)=>{
            try {
                let _exist = self.List.find((s)=>s.uuid == code);
                if(!_exist) reject(false);
                let __f = _exist.SNTL.substring(3) + "XXXXXX" + _exist.SNTL.slice(-58)
                _exist.SNTL = __f.substring(9) + "DDMMYY" + __f.slice(-52)
                _exist.DFacture = null
                _exist.NFacture = null
                _exist.meta.factured = false
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    },
    unSelectAll(){
        return new Promise((resolve, reject)=>{
            try {
                if(!isAlive(self)) resolve(false)
                self.List.forEach(s=>{
                    s.meta.selected = false
                });
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    },
    removeBon(code:string){
    return new Promise((resolve, reject)=>{
        try {
            let _exist = self.List.find((s)=>s.uuid == code);
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
                if(bon?.uuid){
                let exis = self.List.findIndex(W => W.uuid == bon?.uuid) !== -1;
                if(!exis){
                    let SNTL = `${bon.CFournisseur}XXXXXXDDMMYY${bon.DBon}${bon.CBon}${bon.CBar}${bon.CArticle}${String(bon.Quantity).replace(/[^0-9]/g,"").padStart(6, '0')}${String(bon.PU).replace(/[^0-9]/g,"").padEnd(6, '0')}${String(bon.MontantVignette).replace(/[^0-9]/g,"").padStart(6, '0')}${String(bon.Kilos).replace(/[^0-9]/g,"").padStart(6, '0')}`
                    let others = self.List.filter(W => W.uuid != bon?.uuid)
                    self.List.replace(others)
                    self.List.push({...bon, SNTL})
                    resolve(SNTL)
                } else {
                    reject("");
                }       
            }
            } catch (error) {
                console.log(error);
                reject(false)
            }
        })
    },
    edit(bon: BonSimpleType) {
        return new Promise((resolve, reject) => {
            try {
                let exis = self.List.findIndex(W => W.uuid == bon?.uuid) !== -1;
                if(exis){
                    let SNTL = `${bon.CFournisseur}XXXXXXDDMMYY${bon.DBon}${bon.CBon}${bon.CBar}${bon.CArticle}${String(bon.Quantity).replace(/[^0-9]/g,"").padStart(6, '0')}${String(bon.PU).replace(/[^0-9]/g,"").padEnd(6, '0')}${String(bon.MontantVignette).replace(/[^0-9]/g,"").padStart(6, '0')}${String(bon.Kilos).replace(/[^0-9]/g,"").padStart(6, '0')}`
                    self.List.replace(self.List.filter(s=>s.CBon!=bon?.CBon));
                    self.List.push({...bon, SNTL})
                    resolve(SNTL)
                } else {
                    reject("");
                }
            } catch (error) {
                console.log(error);
                reject(false)
            }
        })
    },
    removeall(){
        if(isAlive(self)) self.List?.replace([] as any) 
    },
    editBonStatus({fdate,fnumber, id}:{
        fdate:string,
        fnumber:string, 
        id:string
    }) {
        return new Promise((resolve, reject) => {
            try {
                let exis = self.List.find(W => W.uuid == id);
                if (!exis) reject(false);
                let _SNTL = exis.SNTL.replace("XXXXXX", fnumber)
                let SNTL = _SNTL.replace("DDMMYY", fdate)
                self.List.remove(exis)
                self.List.push({...exis, SNTL});
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
        createById: string;
        lastEditById: string;
        lastEdit?: Date;
        factured?: boolean;
    },
    CFournisseur?: string;
    CArticle?: string;
    CBon?: string;
    comment?: string,
    CBar?: string;
    uuid?: string;
    MontantVignette?: string;
    DBon?: string;
    DFacture?: string;
    Ville?: string;
    Kilos?: string;
    station?:string;
    MontantTotalBrut?: string;
    MontantTotal?: string;
    NFacture?: string;
    PU?: string;
    Quantity?: string;
    Signature?: string;
    SNTL?: string;
}
export { BonsModel, BonType, BonSimpleType }