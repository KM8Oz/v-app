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
import React, {useEffect} from 'react';

import { MemoryRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import './app.less';
import { Login, Corp }  from "@render/components";
import { PersistentStoreProvider } from '@render/store';

// import env from "react-dotenv";
const MENU = ["login", "Home"];
// const history = useHistory();
export default function App() {
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
