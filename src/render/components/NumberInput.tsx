import React, { ReactElement } from 'react'
import {default as NumberFormater, NumberFormatProps} from "react-number-format";
// import { typeInp } from './Input';
interface Props {
    x:number;
    y:number;
    width:number;
    height:number;
    onChange?:(ev:any)=>void;
    typeNInp?:typeNInp;
    value?:string;
}
interface ValueType {
    floatValue: number
    formattedValue: string
    value: string
}

enum typeNInp {
    Table="v-numberinput_table",
    Sign="v-numberinput_sign",
    Total="v-numberinput_total"
}
 function NumberInput({x, y, width,typeNInp, height,value, onChange, ...rest}: Props&NumberFormatProps): ReactElement {
    //    const moreAttrs:object = isPrice ? {prefix:'درهم',suffix:" DH"}: isQuantity ? {suffix:" L"} : isKilos ? {suffix:" Km"}:{};
    //    console.log(value);
    return (
        <foreignObject x={x} y={y} width={width} height={height} >
           <NumberFormater  onClick={e=>{
                //    console.log(e.currentTarget);
                   e.currentTarget.value = ""
               }}   value={value} className={"v-numberinput "+typeNInp} {...rest} onValueChange={onChange} displayType={"input"}/>
        </foreignObject>
    )
}
export  {NumberInput, typeNInp}