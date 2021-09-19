import { types } from 'mobx-state-tree';
import { BonsModel } from './vignettes/BonsModel';
import { ConfigModel } from './vignettes/Configs';
import { FacturesModel } from './vignettes/FacturesModel';
import { UserModel } from './vignettes/UserModel';

const RootStoreModel = types.model("RootStore", {
    User:types.optional(UserModel, {}),
    Bons:types.optional(BonsModel, {}),
    Factures:types.optional(FacturesModel, {}),
    configs:types.optional(ConfigModel, {}),
    hydrated: false,
}).actions((self)=>({
    afterHydration() {
        // This lifecycle is called after the store is hydrated
        self.hydrated = true;
        console.log('I feel refreshed!');
      },
}))

const createStore = ()=> RootStoreModel.create({});
export { RootStoreModel, createStore }