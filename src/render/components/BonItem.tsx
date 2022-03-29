import React, {useState} from "react"
import styled from "styled-components";
interface Props {
    bon?: any,
    edit_action?: () => void,
    active?: boolean,
    order:number
}
function BonItem({ active = true, order, edit_action, bon, ...props }: Props) {
    const [Activestate, setActive] = useState(active);
    return (
        <ItemBody onClick={()=>null}>
            <ItemLeftBody>
              <Letter>
                  {String(bon?.CBon||"-").replace(/[^a-zA-Z]/g, "")}
              </Letter>
              <CodeAndOrder>
                <Code>
                {String(bon?.CBon||"-").replace(/[^0-9]/g,"")}
                </Code>
                <Order>
                 {'N:'+order}
                </Order>
            </CodeAndOrder>
            <DateAndFactu>
                <DateF date={bon&&bon.DBon ? `${bon.DBon.substr(2,2)}/${bon.DBon.substr(0,2)}/${bon.DBon.substr(4,4)}`: new Date()}>
                    {"Le...............................بتاريخ"}
                </DateF>
                <Factu number={bon.CBar}>
                    {"Code bar:             "}
                </Factu>
                </DateAndFactu>
            </ItemLeftBody>
            
            <ItemRightBody active={true}>
                {true ? "Bien facturée" : "Non facturée"}
            </ItemRightBody>
        </ItemBody>
    )
}
const ItemBody = styled.div`
    width: 574.43px;
    margin: 1px 0px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    cursor: pointer;
    &:hover{
      transform: scale(1.01);
  }
  &:active{
      transform: scale(.99);
  }
`;
const ItemLeftBody = styled.div`
    width: 87%;
    height: 100%;
    background-color: #FDFDFD;
    display: grid;
    grid-template-columns: .5fr 1fr 2fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas: ". . .";
    align-items: center;
    justify-items: center;
`;
const Letter = styled.span`
   width: 38.77px;
   height:42px;
   color: #F30505;
   font-family: Arial, Helvetica, sans-serif;
   font-size: 37px;
   font-weight: 500;
   margin: 0px 5px;
   line-height: normal;
`;
const CodeAndOrder = styled.div`
   max-width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: flex-start;
   color: #6C6C6C;
   width: inherit;
`;
const DateAndFactu = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: flex-start;
   color: #6C6C6C;
`;
const DateF = styled.span<{date:any}>`
    color:#4C7A6C;
    /* color:#6C6C6C; */
    font-family:Arial;
     font-size: 18px;
     text-align:start;
    &:after{
       content:${({date})=>"'"+String(date)+"'"};
       color:#000;
       font-family: Arial, Helvetica, sans-serif;
       font-size:10px;
       text-align:center;
       position: relative;
    right: 87px;
    top: -2px;
   }
`;
const Factu = styled.span<{number:string}>`
   color:#6C6C6C;
   font-family:Arial;
   font-size: 18px;
   text-align:start;
   &:after{
       content:${({number})=>"'"+String(number)+"'"};
       color:#000;
       font-family: Arial, Helvetica, sans-serif;
       font-size:10px;
       text-align: center;
    position: relative;
    right: -3px;
    top: -2px;
   }
`;
const Code = styled.span`
   font-family: Arial, Helvetica, sans-serif;
   font-size:17px;
   text-align:start;
`;
const Order = styled.span`
     font-family: Arial, Helvetica, sans-serif;
   font-size:17px;
   text-align:start;
`;
const ItemRightBody = styled.div<{ active: Boolean }>`
    width: 12%;
    height: 100%;
    background-color: ${({active})=>active ? "#5CF47D":"#F45C5C"};
    font-size: 13px;
    font-family: monospace;
    font-weight: bold;
    border-bottom-right-radius: 12px;
    border-top-right-radius: 12px;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 0px 1%;
`;
export { BonItem }