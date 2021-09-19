import React, { Dispatch, ReactElement, SetStateAction, useRef, useState } from 'react'
import { useBarcode  }  from "react-barcodes"
interface Props {
    x:number;
    y:number;
    width:number;
    height:number;
    value?:string,
    code?:string;
    setCbvalue:Dispatch<SetStateAction<null>>;
}
enum codetypes {
    CODE128 = "CODE128",
    CODE128_A = "CODE128A",
    CODE128_B = "CODE128B",
    CODE128_C = "CODE128C",
    EAN_13 = "EAN13",
    EAN_8 = "EAN8",
    EAN_5 = "EAN5",
    EAN_2 = "EAN2",
    UPC_A = "UPC (A)",
    UPC_B = "UPC (B)",
    CODE39 = "CODE39",
    ITF = "ITF",
    ITF_14 = "ITF14",
    MSI10 = "MSI10",
    MSI11 = "MSI11",
    MSI1010 = "MSI1010",
    MSI1110 = "MSI1110",
    Pharmacode = "pharmacode",
    Codabar = "Codabar"
}
export default function Code1({x, y,value,code,setCbvalue, height, width}: Props): ReactElement {
       const [validcode, setvalidcode] = useState(true);
    const { inputRef } = useBarcode({
        value: value || 'BLEA879711',
        options:{
            format:codetypes.CODE128,
            valid: (e)=>{
                setvalidcode(e);
            },
            displayValue: false,
            lineColor:validcode ? "#4C7A6C":"#c72b2b",
            flat:true,
            width:1,
            height:Number(height),
            // fontSize:10
        }
    })
    // const ref = useRef(null)
    // console.log(inputRef.current.getAttribute("viewBox"));
    
    return (
        <foreignObject x={x} y={y} width={width+8} height={height+35}>
          <svg ref={inputRef} id="barcode" width={width} height={height} viewBox={`0 0 ${width} ${height}`}/>
          <input className="v-codebar-input" type="text" maxLength={10} value={value || ""} placeholder="EX:BLEA879711" onChange={(ev)=>setCbvalue(String(ev.currentTarget.value).toLocaleUpperCase() as any)} />
        </foreignObject>
    )
}
