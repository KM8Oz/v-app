import DocumentStore from 'orbit-db-docstore';
import { useState, useEffect } from 'react';
import { RootStoreModelType } from '../store';
import Orbitdb from '../tools/orbitdb';
/**
 * 
 * @returns db: .put({ _id: 'hello world', doc: 'some things' })
 * .then(() => docstore.put({ _id: 'hello universe', doc: 'all the things' }))
 * .then(() => docstore.get('all'))
 * .then((value) => console.log(value))
 */


 


const useOrbitdb = {
    _db: null as DocumentStore<RootStoreModelType>,
    set db(v : DocumentStore<RootStoreModelType>) {
        this._db = v;
    }
}
export default useOrbitdb;