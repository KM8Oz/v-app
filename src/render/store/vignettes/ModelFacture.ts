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
const Bon = types.model({
    id:types.maybeNull(types.number),
    CFournisseur: types.string,
    CArticle: types.string,
    CBon: types.string,
    station:types.maybeNull(types.string),
    CBar: types.string,
    DBon: types.string,
    Count: types.maybeNull(types.string),
    MontantTotalBrut: types.maybeNull(types.string),
    Kilos: types.maybeNull(types.string),
    Ville: types.string,
    MontantVignette:types.maybeNull(types.string),
    MontantTotal: types.string,
    PU: types.string,
    Quantity: types.string,
    Signature: types.string,
    SNTL: types.maybeNull(types.string),
    factured: types.optional(types.boolean, false)
})
const Facture = types.model({
    NFacture: types.maybeNull(types.string),
    DFacture: types.maybeNull(types.string),
    archived:  types.optional(types.boolean, false),
    id:types.maybeNull(types.number),
    vignettes: types.optional(types.array(Bon), []),
    active: types.optional(types.boolean, false),
    selected: types.optional(types.boolean, false)
})
const FactureModel = types.model({
    List: types.optional(types.array(Facture), [])
}).views((self) => ({
    list:()=> isAlive(self) ? self.List : [],
    active:()=> isAlive(self) && self.List.find(s=>s.active) ? self.List.find(s=>s.active)?.vignettes : [],
    selected:(id:number)=> isAlive(self) && self.List.find(s=>s.id == id) ? self.List.find(s=>s.id == id).selected : false,
    listselected: ()=> isAlive(self) ? self.List.filter(s=>s.selected) : []
})).actions((self) => ({
    addReplaceFacture(facture:any){
        if(isAlive(self)){
            if(facture && !facture.archived){
            self.List = self.List.filter(s=>s.NFacture != facture.NFacture &&  s.vignettes && s.vignettes.length > 0) as any;
            self.List.push(facture)
            }
        }
    },
    unselectAll(){
        if(isAlive(self)){
            self.List.forEach(s=>{
                s.selected = false;
             })
        }
    },
    editActive(id:number){
        if(isAlive(self)) {
            let exist = self.List.find(s=>s.id==id);
        if(exist){
            self.List.forEach(s=>{
               s.active =  s.id==id ? true : false;
            })
        }
        }
    },
    editSelected(id:number, value:boolean){
        if(isAlive(self)) {
            let exist = self.List.find(s=>s.id==id);
        if(exist){
            exist.selected = value;
        }
     }
    }
}))

export type FactureInstance = Instance<typeof Facture>;
export { FactureModel }