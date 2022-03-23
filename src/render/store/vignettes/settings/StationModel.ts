import { makeid } from "@root/src/render/tools";
import { types ,Instance} from "mobx-state-tree";
export interface Stationpayload {
  nom:string;
  active:boolean;
}
const StationModel = types.model({
  id:types.optional(types.string, makeid(8)),
  nom:types.string,
  active:types.boolean,
})
export type TypeStationModel = Instance<typeof StationModel>;
export { StationModel }