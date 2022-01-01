import React from 'react'
import { ipcRenderer } from 'electron';
export default function () {
    const App = window as any;
    
    return (
        <div className={"miClo"}>
            <div className="minimizeBn" onClick={
                () => ipcRenderer.send('miminize')
            }>—</div>
            <div className={"closeBn quit"} onClick={
                 () => ipcRenderer.send('exit')
            } >x</div>
        </div>
    )
}
