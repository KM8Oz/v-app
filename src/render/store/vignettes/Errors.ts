import { Instance, types } from "mobx-state-tree";

const ErrorsModel = types.model({
    GlobalError:types.optional(types.string, ""),
    cpu_usage:types.optional(types.string, "")
})
.actions((self)=>({
    addError:(err:string)=>{
       self.GlobalError = err; 
    },
    cpuUsage:(err:string)=>{
        self.cpu_usage = err; 
     }
}))

type TypeErrors =  Instance<typeof ErrorsModel>;
export {ErrorsModel, TypeErrors};