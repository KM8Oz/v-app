import React, { useEffect, useState } from "react";
import { usePersistentStore } from "../../store";
import { animated, useSpring, config } from "react-spring";
import Closebtn from "../buttons/CloseBtn";
// const { Card, Background } = require("ui-glassmorphism/dist/index.modern");
// import 'ui-glassmorphism/dist/index.css'
import { makeidnumber } from "../../tools";
import styled from "styled-components";
import Copytxt from "./Copytxt";
import TextIcon from "./TextIcon";
import XlsxIcon from "./XlsxIcon";
import { copytext, TextFile } from "../../tools/formaters";
import { exportFacture } from "../../tools/formatters";
import { BonSimpleType } from "../../store/vignettes/BonsModel";

function Export({ status, setstatus }: { status: boolean, setstatus:any }) {
    const { Bons, Factures, Settings } = usePersistentStore()
    let _Bons =  JSON.parse(JSON.stringify(Bons))
    const style = useSpring({
        transform: `scale(${status ? 1 : 0.8})`,
        config: config.wobbly
    })
    return (
        <Card
            classname={"scrollbar"}
            style={{...style, display: status ? "list-item" : "none"}}
        >
            <Closebtn
            onClick={()=>setstatus(false)}
            style={{
                position: "absolute",
                top: 5,
                right: 5,
                cursor:"pointer"
            }} />
            {_Bons.List.filter(s => s.DFacture && s.meta.factured).map(f => (<p style={{
                border: "1px solid #444",
                padding: "0px 10px",
                userSelect: "all",
                margin: "4px -9px"
            }} >{f?.SNTL}</p>))}
            {<p style={{
                userSelect: "all",
            }} >{`${1}${_Bons.List[0]?.SNTL.substring(1, 15)}                                                                      ${(String(Factures.List.length) + makeidnumber(3).padStart(6, "0"))}`}</p>}
            <Copytxt 
            onClick={()=>copytext(_Bons.List.filter(s => s.DFacture && s.meta.factured).map(f => f?.SNTL).join("\n")+"\n"+
            `${1}${_Bons.List[0]?.SNTL.substring(1, 15)}                                                                      ${(String(Factures.List.length) + makeidnumber(3).padStart(6, "0"))}`)}
            style={{
                position: "absolute",
                bottom: 4,
                right: 5,
                cursor:"pointer"
            }}/>
            <TextIcon 
            onClick={()=>TextFile(_Bons.List.filter(s => s.DFacture && s.meta.factured).map(f => f?.SNTL).join("\n")+"\n"+
            `${1}${_Bons.List[0]?.SNTL.substring(1, 15)}                                                                      ${(String(Factures.List.length) + makeidnumber(3).padStart(6, "0"))}`, _Bons.List[0]?.SNTL.substring(1, 15))}
            style={{
                position: "absolute",
                bottom: 4,
                right: 35,
                cursor:"pointer"
            }}/>
            <XlsxIcon 
            onClick={()=>exportFacture({
                name: "facture-"+_Bons.List[0]?.SNTL.substring(1, 15),
                data: _Bons.List.map((s)=>s={
                    date:new Date(`${s.DBon.substring(2,4)}/${s.DBon.substring(0,2)}/${s.DBon.substring(4,8)}`),
                    qte: Number(s.Quantity),
                    pu: Number(s.PU),
                    station: String(s.station)?.toLocaleUpperCase(),
                    article: String(Settings.CArticle.find(D=>D.code == s.CArticle).nom)?.toLocaleUpperCase(),
                    codebar: String(s.CBar)?.toLocaleUpperCase(),
                    codebon: String(s.CBon)?.toLocaleUpperCase(),
                    mt_vignette: Number(s.MontantVignette),
                    montant_total: Number(s.MontantTotal),
                    montant_brut: Number(s.MontantTotalBrut),
                    remise:Number(s.MontantTotalBrut)-Number(s.MontantVignette),
                }),
                nfacture:_Bons.List[0]?.NFacture,
                dfacture:new Date(`${_Bons.List[0]?.DFacture.substring(2,4)}/${_Bons.List[0]?.DFacture.substring(0,2)}/${"20"+_Bons.List[0]?.DFacture.substring(4,6)}`)
            })}
            style={{
                position: "absolute",
                bottom: 4,
                right: 65,
                cursor:"pointer"
            }}/>
        </Card>
    )
}
const Card = styled(animated.div)<any>`
    width: 553px;
    height: 383px;
    top: -77px;
    left: -24px;
    scroll-behavior: smooth;
    overflow: hidden auto;
    font-size: 12px;
    color: black;
    font-weight: 500;
    z-index: 1;
    position: absolute;
    background-color: #e2e2e2ff;
    padding: 31px 14px;
    border-radius: 7px;
`;
export default Export