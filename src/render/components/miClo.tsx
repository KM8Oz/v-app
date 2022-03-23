import React, { useState } from 'react'
import { ipcRenderer } from 'electron';
import { animated, useSpring } from 'react-spring';
export default function ({ ...props }) {
    const App = window as any;
    const [first, setfirst] = useState(false)
    const [first1, setfirst1] = useState(false)
    const style0 = useSpring({
        transform: `scale(${first ? 0.96 : 1})`,
        config: { mass: 5, tension: 500, friction: 80 },
      })
      const style1 = useSpring({
        transform: `scale(${first1 ? 0.96 : 1})`,
        config: { mass: 5, tension: 500, friction: 80 },
      })
    return (
        <>
            <animated.svg onMouseEnter={()=>setfirst(true)} onMouseLeave={()=>setfirst(false)} style={{
                margin:"0px 3px",
                cursor:"pointer",
                ...style0
            }} width="25" height="27"onClick={() => ipcRenderer.send('miminize')}  viewBox="0 0 25 27" fill="none">
                <path d="M25 13.5C25 20.9558 19.4036 27 12.5 27C5.59644 27 0 20.9558 0 13.5C0 6.04416 5.59644 0 12.5 0C19.4036 0 25 6.04416 25 13.5Z" fill="#5E94E6" />
                <path d="M8.32227 15.3398V12.6001H16.6929V15.3398H8.32227Z" fill="white" />
            </animated.svg>
            <animated.svg 
            onMouseEnter={()=>setfirst1(true)} onMouseLeave={()=>setfirst1(false)}
            style={{
                margin:"0px 3px",
                cursor:"pointer",
                ...style1
            }} width="25" onClick={() => ipcRenderer.send('exit')} height="27" viewBox="0 0 25 27" fill="none" >
                <path d="M25 13.5C25 20.9558 19.4036 27 12.5 27C5.59644 27 0 20.9558 0 13.5C0 6.04416 5.59644 0 12.5 0C19.4036 0 25 6.04416 25 13.5Z" fill="#E65E5E" />
                <path d="M7.64648 19L11.4355 13.6094L7.92969 8.62891H10.127L11.7188 11.0605C12.0182 11.5228 12.2591 11.9102 12.4414 12.2227C12.7279 11.793 12.9915 11.4121 13.2324 11.0801L14.9805 8.62891H17.0801L13.4961 13.5117L17.3535 19H15.1953L13.0664 15.7773L12.5 14.9082L9.77539 19H7.64648Z" fill="white" />
            </animated.svg>
        </>
    )
}
