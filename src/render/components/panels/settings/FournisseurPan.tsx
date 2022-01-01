import React, {useEffect, useState} from "react";
import { animated, useSpring, config } from "react-spring";
import Closebtn from "../../buttons/CloseBtn";
import { CloseSquareOutlined } from "@ant-design/icons";
import DateInput, { typeText } from "../../DateInput";
import { TextInput } from "../../TextInput";
import Styled from "styled-components";
import { generate } from "regexp-generator/src/regExpGenerator";
interface FactureType{
  issued:Date,
  FactureNumber:string,
  Nomduclient:string,
  Reference:string,
  Nclient:string,
  Intitule:string,
  Adresse:string
}
function FournisseurPan({open, setPanel,...props}: any&{open?:boolean, setPanel:any}) {
        const Escaling = useSpring({ 
          transform: `scale(${open ? 1 : 0.8})`,
           display: `${open ? 'block' : 'none'}`,
           config:config.wobbly
          });
  return (
       <Panel style={Escaling}>
        <Header>
          <Title>
              Ajouter un Fournisseur
          </Title>
        <Close size={24} onClick={()=>setPanel(false)} color={"#e93f28"}/>
        </Header>
          <Body>

          </Body>
       </Panel>
  );
}
const Panel = Styled(animated.div)`
    position: absolute;
    width: 573px;
    height: 245px;
    border-radius: 6px;
    background-color: #F1F4F2;
    margin-left: 2em;
`;
const Body =  Styled.div`
   display:grid;
   
`;
const Title =  Styled.span`
    font-family:Oswald, Arial, Helvetica, sans-serif;
    font-size: 12px;
    text-align:start;
    justify-self:start;
    margin-left:.2em;
`;
const Close = Styled(CloseSquareOutlined)`
    grid-area:btn02;
    cursor:pointer;
    color:#e93f28;
`;
const Header = Styled.div`
    height:25px;
    width:100%;
    display:grid;
    grid-template-columns: 12fr 1fr 1fr;
    grid-template-rows: 1fr;
    justify-items: center;
    grid-template-areas: "title btn01 btn02";
    justify-items:center;
    align-items:center;
`;
export default FournisseurPan;