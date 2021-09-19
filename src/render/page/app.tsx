import React, {useEffect} from 'react';
import { MemoryRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import './app.less';
import { Login, Corp }  from "@render/components";
import { createStore } from '@render/store/rootStore';
import { StoreProvider } from '@render/store';
import { persist } from "mst-persist";
import localforage from 'localforage';
// import env from "react-dotenv";
const MENU = ["login", "Home"];
// const history = useHistory();
export default function App() {
  console.log("started...");
  
  // const location = useLocation();

 
  useEffect(() => {
    if (location) {
      console.log(location);
    }
  }, [])
  const rootStore = createStore()
  persist("vignettes", rootStore, {
    storage: localforage,  // or AsyncStorage in react-native.
    jsonify: false  // if you use AsyncStorage, this shoud be true
   // whitelist: ['']  // only these keys will be persisted
  }).then(() => console.log('Vignettes Store has been hydrated'))
  return (
    <StoreProvider value={rootStore  as any}>
    <Router initialIndex={3} initialEntries={[
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
    </StoreProvider>
  );
}
