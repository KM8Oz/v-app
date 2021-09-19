import { Instance, types } from "mobx-state-tree";
import { makeid } from "@render/tools";
const MetaInfo = types.model({
    id:types.identifier,
    companyId:types.string
})
const ConfigValue = types.model({
    id:types.identifier,
    char:types.string,
    code:types.string
})
export interface elmtype {
    id:string,
    char:string,
    code:string
}
const ConfigModel = types.model({
    meta:types.maybeNull(MetaInfo),
    laters:types.optional(types.array(ConfigValue), []),
    fournisseur:types.optional(types.array(ConfigValue), []),
    ville:types.optional(types.array(ConfigValue), []),
    station:types.optional(types.array(ConfigValue), []),
    code1:types.optional(types.array(ConfigValue), []),
    names:types.optional(types.array(ConfigValue), [])
}).actions((self)=>({
    async Addlaters(char:string, code:string){
     let index = self.laters.findIndex(s=>s.char == char), exist = index !== -1;
     try {
        if(exist){
            self.laters[index].code = code;
           return "replaced";
        } else {
            self.laters.push({
               id:makeid(6),
               char:char,
               code:code
            })
           return "added";
        }
     } catch (error) {
         return "Addlaters: error"+error;
     }
    },

    async Addcode1(char:string, code:string){
        let index = self.code1.findIndex(s=>s.char == char), exist = index !== -1;
        try {
           if(exist){
               self.code1[index].code = code;
              return "replaced";
           } else {
               self.code1.push({
                  id:makeid(6),
                  char:char,
                  code:code
               })
              return "added";
           }
        } catch (error) {
            return "Addcode1: error"+error;
        }
       },
       async Addfournisseur(char:string, code:string){
        let index = self.fournisseur.findIndex(s=>s.char == char), exist = index !== -1;
        try {
           if(exist){
               self.fournisseur[index].code = code;
              return "replaced";
           } else {
               self.fournisseur.push({
                  id:makeid(6),
                  char:char,
                  code:code
               })
              return "added";
           }
        } catch (error) {
            return "Addlaters: error"+error;
        }
       },
       async Addstation(char:string, code:string){
        let index = self.station.findIndex(s=>s.char == char), exist = index !== -1;
        try {
           if(exist){
               self.station[index].code = code;
              return "replaced";
           } else {
               self.station.push({
                  id:makeid(6),
                  char:char,
                  code:code
               })
              return "added";
           }
        } catch (error) {
            return "Addlaters: error"+error;
        }
       },
       async AddName(char:string, code:string){
        let index = self.names.findIndex(s=>s.char == char), exist = index !== -1;
        try {
           if(exist){
               self.names[index].code = code;
              return "replaced";
           } else {
               self.names.push({
                  id:makeid(6),
                  char:char,
                  code:code
               })
              return "added";
           }
        } catch (error) {
            return "Addlaters: error"+error;
        }
       },
       async Addville(char:string, code:string){
        let index = self.ville.findIndex(s=>s.char == char), exist = index !== -1;
        try {
           if(exist){
               self.ville[index].code = code;
              return "replaced";
           } else {
               self.ville.push({
                  id:makeid(6),
                  char:char,
                  code:code
               })
              return "added";
           }
        } catch (error) {
            return "Addlaters: error"+error;
        }
       },
       async Rmlaters(id:string){
        let intx = self.laters.findIndex(s=>s.id == id), exist = intx != -1;
        try {
         if(exist){
             let elm = self.laters.find(s=>s.id == id);
            //  type elmtype = Instance<typeof elm>;
             self.laters.remove(elm as elmtype);
             return "removed";
         } else {
            return "Rmlaters: does't exist";
         }
        } catch (error) {
            return "Rmlaters: error"+error;
        }
       },
       async RmFournisseur(id:string){
        let intx = self.fournisseur.findIndex(s=>s.id == id), exist = intx != -1;
        try {
         if(exist){
             let elm = self.fournisseur.find(s=>s.id == id);
            //  type elmtype = Instance<typeof elm>;
             self.fournisseur.remove(elm as elmtype);
             return "removed";
         } else {
            return "RmFournisseur: does't exist";
         }
        } catch (error) {
            return "RmFournisseur: error"+error;
        }
       },
       async RmStation(id:string){
        let intx = self.station.findIndex(s=>s.id == id), exist = intx != -1;
        try {
         if(exist){
             let elm = self.station.find(s=>s.id == id);
            //  type elmtype = Instance<typeof elm>;
             self.station.remove(elm as elmtype);
             return "removed";
         } else {
            return "RmStation: does't exist";
         }
        } catch (error) {
            return "RmStation: error"+error;
        }
       },
       async RmName(id:string){
        let intx = self.names.findIndex(s=>s.id == id), exist = intx != -1;
        try {
         if(exist){
             let elm = self.names.find(s=>s.id == id);
            //  type elmtype = Instance<typeof elm>;
             self.names.remove(elm as elmtype);
             return "removed";
         } else {
            return "Rmnames: does't exist";
         }
        } catch (error) {
            return "Rmnames: error"+error;
        }
       },
       async RmCode1(id:string){
        let intx = self.code1.findIndex(s=>s.id == id), exist = intx != -1;
        try {
         if(exist){
             let elm = self.code1.find(s=>s.id == id);
            //  type elmtype = Instance<typeof elm>;
             self.code1.remove(elm as elmtype);
             return "removed";
         } else {
            return "Rmcode1: does't exist";
         }
        } catch (error) {
            return "Rmcode1: error"+error;
        }
       },
       async RmVille(id:string){
        let intx = self.ville.findIndex(s=>s.id == id), exist = intx != -1;
        try {
         if(exist){
             let elm = self.ville.find(s=>s.id == id);
            //  type elmtype = Instance<typeof elm>;
             self.ville.remove(elm as elmtype);
             return "removed";
         } else {
            return "Rmville: does't exist";
         }
        } catch (error) {
            return "Rmville: error"+error;
        }
       },
       
}))
export const useConfigsStore = ()=>ConfigModel.create({
    laters:[{
        id:makeid(6),
        char:"M",
        code:"03"
    },
    {
        id:makeid(6),
        char:"J",
        code:"04"
    },{
        id:makeid(6),
        char:"H",
        code:"06"
    },{
        id:makeid(6),
        char:"C",
        code:"07"
    }],
    fournisseur:[
        {
            id:makeid(6),
            char:"Localub",
            code:"30"
        },{
            id:makeid(6),
            char:"3SP",
            code:"31"
        },{
            id:makeid(6),
            char:"PETRONAS",
            code:"32"
        }],
        ville:[
            {
                id:makeid(6),
                char:"Agadir",
                code:"01"
            },{
                id:makeid(6),
                char:"Belfaa",
                code:"02"
            }
        ],
        station:[
            {
                id:makeid(6),
                char:"Agadir tassila",
                code:"00"
            },{
                id:makeid(6),
                char:"Agadir lkharja",
                code:"02"
            }
        ],
        code1:[{
            id:makeid(6),
            char:"09023",
            code:"09023"
        }],
        names:[
            {
                id:makeid(6),
                char:"Karim",
                code:"00"
            },{
                id:makeid(6),
                char:"Said",
                code:"02"
            },
            {
                id:makeid(6),
                char:"Mohammed",
                code:"03"
            }
        ]
})
export type ConfigModelType = Instance<typeof ConfigModel>;
export { ConfigModel }