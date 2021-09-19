import React, { ChangeEventHandler, ReactElement } from 'react'
import { InputProps } from 'react-select'

interface Props {
    x:number,
    y:number,
    width:number,
    height:number,
    onchange:ChangeEventHandler,
    value:string,
    typeText:typeText,
    maxchars?:number,
    placeholder:string
}
export enum typeText {
    normal="v-normal-text",
    small="v-small-text"
}
export default function TextInput({x, y, placeholder, width,maxchars, height, value,typeText, onchange, ...rest}: Props): ReactElement {
    return (
       <foreignObject x={x} y={y} width={width} height={height}>
             <input placeholder={placeholder} type="date" value={value} maxLength={maxchars || 25} className={`v-text-input ${typeText}`} {...rest}  onChange={onchange}/>
       </foreignObject>
    )
}