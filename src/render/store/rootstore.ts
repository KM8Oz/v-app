import { types } from 'mobx-state-tree';
import { BonsModel } from './vignettes/BonsModel';
import { ErrorsModel } from './vignettes/Errors';
import { FacturesModel } from './vignettes/FacturesModel';
import { SettingsModel } from './vignettes/SettingsModel';
import { UserModel } from './vignettes/UserModel';
import createPersistentStore from 'mst-persistent-store';
const RootStoreModel = types.model("RootStore", {
    User: types.optional(UserModel, {}),
    Bons: types.optional(BonsModel, {}),
    Factures: types.optional(FacturesModel, {}),
    Errors: types.optional(ErrorsModel, {}),
    Settings: types.optional(SettingsModel, {}),
    premium: types.boolean,
    hydrated: types.boolean,
}).actions((self) => ({
    hydrate() {
        self.hydrated = true;
      },
}))

// const createStore = ()=> RootStoreModel.create({});
const [PersistentStoreProvider, usePersistentStore] = createPersistentStore(
    RootStoreModel,
    {
        User: {},
        Bons: {},
        Factures: {},
        Errors: {},
        Settings: {},
        premium: false,
        hydrated: false,
    },
    {
        hydrated: false,
    },
    {
        logging: false,
        devtool: false,
    }
);
export { PersistentStoreProvider, usePersistentStore }