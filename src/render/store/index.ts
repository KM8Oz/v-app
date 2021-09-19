
import { Instance } from "mobx-state-tree"
import { createContext, useContext } from "react"
import { RootStoreModel }  from "./rootStore"
// import { BonsModel } from './vignettes/BonsModel';
// import { FacturesModel } from './vignettes/FacturesModel';
// import { UserModel } from './vignettes/UserModel';
type RootStoreType = Instance<typeof RootStoreModel>
const StoreContext = createContext<RootStoreType>({} as RootStoreType)

export const useStore = () => useContext(StoreContext)
export const StoreProvider = StoreContext.Provider

// export const createStore = ():typeof RootStoreModel => {
//     const Bons = BonsModel.create({});
//     const Factures = FacturesModel.create({});
//     const User = UserModel.create({});
//     return RootStoreModel.create({User,Bons, Factures} as any);
//   }