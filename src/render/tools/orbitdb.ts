import * as IPFS from 'ipfs-core'
import useOrbitdb from "../hooks/useOrbitdb";
import {OrbitDB} from "orbit-db";
const OrbitdB = require('orbit-db')
import { Keystore } from 'orbit-db-keystore';
import { RootStoreModelType } from '../store';
import DocumentStore from 'orbit-db-docstore';
const ipfsOptions = {
  EXPERIMENTAL: {
      pubsub: true,
  }
};
class Orbitdb {
    public db:OrbitDB;
    private db_cid:string;
    public docstore:DocumentStore<RootStoreModelType>;
    private node:any;
    public address:{
      root:string,
      path:string
    }
    constructor(cid:string){
      this.db_cid = cid;
    }
    async init(){
      this.node = await IPFS.create({
        EXPERIMENTAL:{
          ipnsPubsub:true
        }
      });
      // const ipfsOptions = { repo : './ipfs', }
        this.db = await OrbitdB.createInstance(this.node, {
          peerId:this.db_cid
        });
        this.docstore = await this.db.docs(this.db_cid);
         this.address = this.docstore.address
        useOrbitdb.db = this.docstore;
    }
}
export default Orbitdb;