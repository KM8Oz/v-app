/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 19/12/2021 - 23:46:48
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/12/2021
    * - Author          : 
    * - Modification    : 
**/
import React, { useState } from 'react';
import { useSpring, animated } from "react-spring";
import { useHistory } from 'react-router';
interface PropsMenu{
    icon:string
    active?:boolean;
    action?:()=>void
}
export default function MenuButton({icon, active, action}:PropsMenu) {
    const Icon = ({icon}:any)=>  {
        switch (icon) {
        case "add":
            return (<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.17188 15.2969V9.01562H0.9375V6.39062H7.17188V0.15625H9.82812V6.39062H16.0625V9.01562H9.82812V15.2969H7.17188Z" fill="#4C7A6C"/>
            </svg>);
            case "logout":
                return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5" stroke="#F13D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.3334 14.1667L17.5 10L13.3334 5.83337" stroke="#F13D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 10H7.5" stroke="#F13D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                );
                case "send":
                    return (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 1.5L8.25 9.75" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.5 1.5L11.25 16.5L8.25 9.75L1.5 6.75L16.5 1.5Z" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
                    );
                    case "setting":
                        return (
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0)">
                            <path d="M2.83337 14.875V9.91663" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2.83337 7.08333V2.125" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.5 14.875V8.5" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.5 5.66667V2.125" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14.1666 14.875V11.3334" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14.1666 8.5V2.125" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M0.708374 9.91663H4.95837" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.375 5.66663H10.625" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12.0416 11.3334H16.2916" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <defs>
                            <clipPath id="clip0">
                            <rect width="17" height="17" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>                            
                        );
                        case "listing":
                        return (
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.66663 4.25H14.875" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5.66663 8.5H14.875" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5.66663 12.75H14.875" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2.125 4.25H2.13208" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2.125 8.5H2.13208" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2.125 12.75H2.13208" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>         
                        );
        default:
            return (<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.17188 15.2969V9.01562H0.9375V6.39062H7.17188V0.15625H9.82812V6.39062H16.0625V9.01562H9.82812V15.2969H7.17188Z" fill="#4C7A6C"/>
            </svg>);
    }
}
const styles = useSpring({ boxShadow: active ? "0px 0px 0px 2.5px #2c2c2c":"0px 0px 0px 1px #2c2c2c" });
    return (
        <animated.div  className="menu-btn_add" onClick={action} style={styles}>
           <Icon icon={icon} />
        </animated.div>
    )
}