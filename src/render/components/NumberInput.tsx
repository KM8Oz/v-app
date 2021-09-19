import React, { ReactElement } from 'react'
import {default as NumberFormater} from "react-number-format";
// import { typeInp } from './Input';
interface Props {
    x:number;
    y:number;
    width:number;
    height:number;
    onChange:(ev:any)=>void;
    isPrice:boolean;
    typeNInp:typeNInp;
    value:string;
    format?: string | undefined;
    allowLeadingZeros:boolean,
    maxLength:number
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
 function NumberInput({x, y, width,typeNInp , maxLength,format, allowLeadingZeros, height,value, isPrice = false, onChange, ...rest}: Props): ReactElement {
       const moreAttrs = isPrice ? {prefix:'درهم‎ ',suffix:" DH"}: {};
    //    console.log(value);
    return (
        <foreignObject x={x} y={y} width={width} height={height} >
           <NumberFormater maxLength={maxLength} format={format} allowedDecimalSeparators={[",", "."]} allowLeadingZeros={allowLeadingZeros} value={value} className={"v-numberinput "+typeNInp} {...moreAttrs} {...rest} onValueChange={onChange} displayType={"input"}/>
        </foreignObject>
    )
}
export  {NumberInput, typeNInp}