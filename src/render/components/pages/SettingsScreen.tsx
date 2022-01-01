import { usePersistentStore } from "@render/store"
import { Item, ItemSendScreen, Souvegarder } from "@render/components"
import { mouseDownHandler, scrollerHandler } from "@render/tools";
import React, { useState, useRef, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import Facturation from "../panels/Facturation";
import styled from "styled-components";
import backSessings from "../../assets/bon_longline.svg";
import ScrollContainer from 'react-indiana-drag-scroll';
import CFournisseurs from "../settings/CFournisseurs";
import NFacture from "../settings/NFacture";
import DFacture from "../settings/DFacture";
import DBon from "../settings/DBon";
import CBon from "../settings/CBon";
import CBar from "../settings/CBar";
import CArticle from "../settings/CArticle";
import Quantity from "../settings/Quantity";
import PU from "../settings/PU";
import MontantTotal from "../settings/MontantTotal";
import { observer } from "mobx-react-lite";
import { Tabs } from "antd";
import Icon, { AppleOutlined, CloudSyncOutlined, SettingOutlined, UnorderedListOutlined } from "@ant-design/icons";
const SettingsScreen = observer((props: React.SVGProps<SVGSVGElement>) => {
    const { Bons, hydrate, hydrated } = usePersistentStore();
    const [list, setlist] = useState<any>(Bons);
    const [panel, setPanel] = useState(false);
    useEffect(() => {
        hydrate()
        setlist(Bons);
        return () => {
            setlist([]);
        };
    }, []);
    const saveAction = () => {
        // console.log("faved");
    }
    const TEST = new Array(9).fill(null);
    const [scrollX, setScrollX] = useState(0);
    const [number, setNumber] = useState(null)
    const [numbersStates, setnumbersStates] = useState([true, false, false, false, false, false, false, false, false, false])
    const setActivestate = (i: number) => {
        const _falses = new Array(10).fill(false);
        _falses[i] = true;
        setnumbersStates(_falses);
    }
    // const scrolled = useRef(null);
    // const style0 = useSpring({
    //     top: `${scrollX}%`,
    //     config: { mass: 5, tension: 500, friction: 80 },
    // })
    return (
        <BodySetings className="undraggble">
            <Left>
                <Souvegarder style={{
                    gridArea: "save",
                    alignSelf: "end"
                }} onClick={saveAction}>SOUVEGARDER</Souvegarder>
            </Left>
            <Body>
                <Tabs defaultActiveKey="1" animated={{
                    inkBar: false,
                    tabPane: false
                }} tabBarStyle={{
                    backgroundColor: "rgb(76, 122, 108)",
                    color: "#fff"
                }} >
                    <Tabs.TabPane
                        style={{
                            // margin: "0px 19px"
                        }}

                        tab={
                            <span>
                                <UnorderedListOutlined />
                                base de données
                            </span>
                        }
                        key="0"
                    >
                        <Tabs
                        type="card"
                        animated={{
                            inkBar: false,
                            tabPane: false
                        }} defaultActiveKey="0" tabPosition={"left"} style={{ height: 366 }}>
                            <Tabs.TabPane tab={<ASpan><SettingOutlined />CArticle</ASpan>} key={"0"}>
                                <CArticle />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={<ASpan><SettingOutlined />CBar</ASpan>} key={"1"}>
                                <CBar />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={<ASpan><SettingOutlined />CBon</ASpan>} key={"2"}>
                                <CBon />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={<ASpan><SettingOutlined />CFournisseur</ASpan>} key={"3"}>
                                <CFournisseurs />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={<ASpan><SettingOutlined />DBon</ASpan>} key={"4"}>
                                <DBon />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={<ASpan><SettingOutlined />DFacture</ASpan>} key={"5"}>
                                <DFacture />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={<ASpan><SettingOutlined />MontantTotal</ASpan>} key={"6"}>
                                <MontantTotal />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={<ASpan><SettingOutlined />NFacture</ASpan>} key={"7"}>
                                <NFacture />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={<ASpan><SettingOutlined />PU</ASpan>} key={"8"}>
                                <PU />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={<ASpan><SettingOutlined />Quantity</ASpan>} key={"9"}>
                                <Quantity />
                            </Tabs.TabPane>
                        </Tabs>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab={
                            <span>
                                <CloudSyncOutlined />
                                synchronisation
                            </span>
                        }
                        key="2"
                    >
                        Tab 2
                    </Tabs.TabPane>
                </Tabs>
            </Body>
        </BodySetings>
    )
})
const BodySetings = styled.div`
    background: url(${backSessings});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 778px 430px;
    width: 778px;
    height: 430px;
    margin-top: -5px;
    display: grid; 
    grid-template-columns: 0.21fr 1.2fr;
    grid-template-rows: 1fr; 
   gap: 0px 1px; 
   grid-template-areas: 
    "left panel"; 
    /* margin-bottom: -5px; */
`;
const Left = styled.div`
grid-area: left;
display: grid; 
justify-items: center;
  grid-auto-columns: 1fr; 
  grid-template-columns: 1fr; 
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr; 
  gap: 0px 1px; 
  grid-template-areas: 
    "save"
    "."
    "."
    "."
    "."
    "."; 
`;
const ASpan = styled.span`
font-family:Archivo, Arial;
       cursor: pointer;
  &:hover{
      transform: scale(1.01);
  }
  &:active{
      transform: scale(.99);
  }
`;
const Body = styled.div`
   grid-area: panel;
   display:grid;
   overflow:hidden;
   grid-area: panel;
    display: grid;
    overflow: hidden;
    align-self: flex-start;
    margin: 9px 2px 9px -1px;
    border-top-right-radius: 4px;
`;
const NumbersList = styled(ScrollContainer)`
    max-width: 99%;
    align-self: start;
    justify-self: center;
    grid-area: numbers;
    align-items: center;
    border-radius:5px;
    justify-items: center;
    display: grid;
    grid-template-columns: 0.3fr 0.8fr 1fr 1fr 1fr 1fr .3fr 1fr 1fr 1fr;
    gap: 0px 2px;
    margin: unset;
    padding:unset;
`;
const Numbers = styled.span<{ active?: boolean }>`
   font-family: Arial, Helvetica, sans-serif;
   font-size: 17px;
   color: #000;
   font-weight: bold;
   border-radius: 14px;
   letter-spacing: 35%;
   padding: 0em 5px;
   margin:unset;
   background-color: #cccccc73;
   display:flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  &:hover{
      transform: scale(1.01);
  }
  &:active{
      transform: scale(.99);
  }
   border:${({ active }) => active ? '2px solid #4C7A6C' : '2px solid #4c7a6c0'};
`;

export default SettingsScreen
