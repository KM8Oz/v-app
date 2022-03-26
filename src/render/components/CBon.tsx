import React from 'react'
import { useState } from 'react';
import styled from "styled-components";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
interface Props {
    x: number;
    y: number;
    width: number;
    height: number;
    placeholder?: string;
    onChange?: () => void;
    onKeyUp?: () => void;
    typeInp?: typeInp;
    format?: string,
    onOut?:() => void
}
enum typeInp {
    normal = "v-input_n",
    bold = "v-input_b",
    medium = "v-input_m"
}
const InputCodeBon = ({ x, y, height, width,onOut ,format, placeholder, typeInp, onChange, onKeyUp, ...rest }: Props & any) => {
    return (
        <foreignObject x={x} y={y} width={width} height={height}>
             <ContextMenuTrigger id="CBon" renderTag='tr' holdToDisplay={1000}>
            <input 
            // onFocusCapture={(ev)=>console.log(ev.currentTarget)}
            onBlur={onOut}
            onClick={(e:any)=> {
                //    console.log(e.currentTarget);
                e.currentTarget.value = ""
            }} width={width - 2} {...rest} height={height - 2} placeholder={placeholder} 
            onChange={onChange} className={"v-input " + typeInp || ''} onKeyUp={onKeyUp}
            {...rest} />
            </ContextMenuTrigger>
        </foreignObject>
    )
}
const Slides = styled.div<{ hidden?: boolean, height?: number, width?: number }>`
     display:${({ hidden }) => hidden ? "none" : "flex"};
     height:${({ height }) => height + 'px'};
     width:${({ width }) => width + 'px'};
     position:absolute;
     top:0;
     left:0;
     flex-direction: column;
     align-items: center;
     scroll-behavior: smooth;
     overflow: auto;
     scroll-snap-type: y mandatory;
     scroll-snap-align: center;
     &::-webkit-scrollbar {
        display: none;
     }
`;
const Slide = styled.span`
    width: 100%;
    height: 100%;
    margin: unset;
    padding: unset;
    font-family: 'Oswald', sans-serif;
    font-size: 1.5em;
    text-align: center;
    color: #6C6C6C;
`;
export { InputCodeBon, typeInp }
