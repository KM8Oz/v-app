/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 17/12/2021 - 23:09:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/12/2021
    * - Author          : 
    * - Modification    : 
**/
import React, {useEffect, useState} from 'react';

import { MemoryRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import './app.less';
import { Login, Corp }  from "@render/components";
import { PersistentStoreProvider, usePersistentStore } from '@render/store';

// import env from "react-dotenv";
const MENU = ["login", "Home"];
// const history = useHistory();
import Orbit from "../tools/orbitdb";
import { onSnapshot } from 'mobx-state-tree';
// import useOrbitdb from '../hooks/useOrbitdb';

// const node  = new Orbit("jlhljashdjsbdlja");

export default function App() {
  // const stores = usePersistentStore()
  //  useEffect(()=>{
  //    let dispose = ()=> null as any;
  //   node.init().then(()=>{
  //     dispose = onSnapshot(stores, (snap)=>{
  //       useOrbitdb._db.put(snap as any);
  //     })
  //   })
  //   return ()=>dispose()
  //  },[])
  return (
    <PersistentStoreProvider>
    <Router initialIndex={1} initialEntries={[
      {pathname:"/", key:"/"},
      {pathname:"/login", key:"/login"},
      {pathname:"/Home", key:"/Home"}
    ]} >
      <Switch>
      <Route  exact path="/"  component={Login} key={"/"}/>
      <Route  exact path="/login" component={Login} key={"/login"}/>
      </Switch>
        <Switch>
        <Route exact path="/Home" component={Corp}  key={"/Home"}/>
      </Switch>
    </Router>
    </PersistentStoreProvider>
  );
}
