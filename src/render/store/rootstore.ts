import { Instance, types } from 'mobx-state-tree';
import { BonsModel } from './vignettes/BonsModel';
import { ErrorsModel } from './vignettes/Errors';
import { FacturesModel } from './vignettes/FacturesModel';
import { SettingsModel } from './vignettes/SettingsModel';
import { UserModel } from './vignettes/UserModel';
import createPersistentStore from 'mst-persistent-store';
import { FactureModel } from './vignettes/ModelFacture';
const TempBon = types.model({
    CFournisseur: types.maybeNull(types.string),
    CArticle: types.maybeNull(types.string),
    CBon: types.maybeNull(types.string),
    station:types.maybeNull(types.string),
    CBar:types.maybeNull(types.string),
    DBon: types.maybeNull(types.Date),
    Count: types.maybeNull(types.string),
    MontantTotalBrut: types.maybeNull(types.string),
    Kilos: types.maybeNull(types.string),
    Ville: types.maybeNull(types.string),
    MontantVignette:types.maybeNull(types.string),
    MontantTotal: types.maybeNull(types.string),
    PU: types.maybeNull(types.string),
    Quantity: types.maybeNull(types.string),
    Signature: types.maybeNull(types.string),
}).
actions((self)=>({
   async setTempBon(bon:any){
       try {
        self.CFournisseur= bon?.CFournisseur,
        self.CBon= bon?.CBon,
        self.station=bon?.station,
        self.CBar=bon?.CBar,
        self.DBon=new Date(`${bon?.DBon?.substr(2,2)}/${bon?.DBon?.substr(0,2)}/${bon?.DBon?.substr(4,4)}`),
        self.Count= bon?.Count,
        self.MontantTotalBrut= bon?.MontantTotalBrut,
        self.Kilos= bon?.Kilos,
        self.Ville= bon?.Ville,
        self.MontantVignette=bon?.MontantVignette,
        self.MontantTotal= bon?.MontantTotal,
        self.PU= bon?.PU,
        self.Quantity= bon?.Quantity,
        self.Signature= bon?.Signature
        return true
       } catch (error) {
        throw error
       }
    }
}))
const RootStoreModel = types.model("RootStore", {
    User: types.optional(UserModel, {}),
    Bons: types.optional(BonsModel, {}),
    Factures: types.optional(FacturesModel, {}),
    OnlineFactures: types.optional(FactureModel, {}),
    Errors: types.optional(ErrorsModel, {}),
    Settings: types.optional(SettingsModel, {}),
    premium: types.boolean,
    hydrated: types.boolean,
    TempBon: TempBon,
    dcid: types.maybeNull(types.string),
    machine: types.maybeNull(types.string)
}).actions((self) => ({
    hydrate() {
        self.hydrated = true;
      },
      setMachine(ID:string){
          self.machine = ID
      },
    //   async syncbons(){
    //       let id = self.machine;
    //   }
//    async orbitInit(dcid:string){
//          self.dcid = dcid;
//         let OrbitDB = new Orbitdb(dcid);
//         await OrbitDB.init()
//     }
}))

// const createStore = ()=> RootStoreModel.create({});
const [PersistentStoreProvider, usePersistentStore] = createPersistentStore(
    RootStoreModel,
    {
        TempBon: {},
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
type RootStoreModelType = Instance<typeof RootStoreModel>;
export { PersistentStoreProvider, usePersistentStore, RootStoreModelType, RootStoreModel }