import React, { ChangeEventHandler, ReactElement, useEffect } from 'react'
import { InputProps } from 'react-select'
import { autocomplete, makeid } from '../tools';

interface Props {
    x:number,
    y:number,
    width:number,
    height:number,
    // suggestions:
    onchange:ChangeEventHandler,
    value:string,
    typeText:typeText,
    maxchars?:number,
    placeholder:string,
    suggestions?:string[]
    // classForAuto?:string
}
 enum typeText {
    normal="v-normal-text",
    small="v-small-text"
}
 function TextInput({x, y, placeholder,suggestions = [], width,maxchars, height, value,typeText, onchange, ...rest}: Props): ReactElement {
        const uniqueId = makeid(8);
         useEffect(() => {
            const isAuto = suggestions.length > 0;
             if(isAuto){
                 autocomplete(uniqueId, suggestions);
             }
         }, [suggestions])
    return (
       <foreignObject x={x} y={y} width={width} height={height}>
             <input onClick={e=>{
                //    console.log(e.currentTarget);
                   e.currentTarget.value = ""
               }} placeholder={placeholder} value={value} maxLength={maxchars || 25} className={`v-text-input ${typeText} ${uniqueId}`} {...rest}  onChange={onchange}/>
       </foreignObject>
    )
}
export { TextInput, typeText }