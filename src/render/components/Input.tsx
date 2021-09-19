import React from 'react'

interface Props {
    x:number;
    y:number;
    width:number;
    height:number;
    placeholder?:string;
    onChange?:()=>void;
    onKeyUp?:()=>void;
    typeInp?:typeInp;
}
 enum typeInp {
    normal = "v-input_n",
    bold= "v-input_b",
    medium="v-input_m"
}
const Input = ({ x, y, height, width, placeholder,typeInp, onChange, onKeyUp, ...rest}: Props&any) => {
    return (
        <foreignObject x={x} y={y} width={width} height={height}>
               <input  width={width-2} {...rest} height={height-2} placeholder={placeholder}  onChange={onChange} className={"v-input "+typeInp || ''} onKeyUp={onKeyUp}/>         
       </foreignObject>
    )
}

export {Input, typeInp}
