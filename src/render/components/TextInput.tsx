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
 enum typeText {
    normal="v-normal-text",
    small="v-small-text"
}
 function TextInput({x, y, placeholder, width,maxchars, height, value,typeText, onchange, ...rest}: Props): ReactElement {
    return (
       <foreignObject x={x} y={y} width={width} height={height}>
             <input placeholder={placeholder} value={value} maxLength={maxchars || 25} className={`v-text-input ${typeText}`} {...rest}  onChange={onchange}/>
       </foreignObject>
    )
}
export { TextInput, typeText }