/**
 * render folder can be accessed under "v-app" glocal module name or 
 * @render
 * @main
 */
import React from 'react'
import ReactDom from 'react-dom'
// import { HashRouter } from 'react-router-dom'
import App from './page/app'

(ReactDom.render || ReactDom.hydrate)(
    <App />
  , document.getElementById('root')
)
