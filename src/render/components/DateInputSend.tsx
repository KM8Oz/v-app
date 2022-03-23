import React, { ChangeEventHandler, ReactElement } from 'react'
import { ContextMenuTrigger } from 'react-contextmenu'
import { InputProps } from 'react-select'
import { ItemDate } from './settings/styledComponents'

interface Props {
    x:number,
    y:number,
    width:number,
    height:number,
    onchange:(date: any, dateString: string)=>void,
    value:string,
    typeText:typeText,
    maxchars?:number,
    placeholder:string
    id?:string,
    format?:string
}
export enum typeText {
    normal="v-normal-text",
    small="v-small-text"
}
function DateInputSend({x, y,id, format,placeholder, width,maxchars, height, value,typeText, onchange, ...rest}: Props): ReactElement {
    return (
       <foreignObject x={x} y={y} width={width} height={height}>
           <ContextMenuTrigger id={id}>
           <ItemDate size='small'  
           className={`v-text-input ${typeText}`} {...rest}
            format={format} onChange={onchange} />
             </ContextMenuTrigger>
       </foreignObject>
    )
}
export default DateInputSend