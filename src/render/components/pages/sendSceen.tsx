/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 19/12/2021 - 14:53:30
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/12/2021
    * - Author          : 
    * - Modification    : 
**/
import { usePersistentStore } from "@render/store"
import { observer } from 'mobx-react-lite';
import { Item } from "@render/components"
import ItemSendScreen from "@render/components/itemSendScreen"
import { mouseDownHandler, scrollerHandler } from "@render/tools";
import React, { useState, useRef, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import Facturation from "../panels/Facturation";
import { Checkbox, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from "styled-components"
import { BonSimpleType } from "../../store/vignettes/BonsModel";
import NoBons from "../icons/noBons";
import { IOPrivate } from "../../tools/sockets";
import { VignettestypeFromServer } from "../../tools/formatters";


const SendScreen = observer(({setMenuConf, ...props}: React.SVGProps<SVGSVGElement>&{setMenuConf?:any}) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const { Bons, User, hydrate, hydrated } = usePersistentStore();
    const [list, setlist] = useState<any>(Bons);
    const [panel, setPanel] = useState(false);
    const [filter, setFilter] = useState<boolean>(false)
    
    
    useEffect(() => {
        hydrate()
    // let list = Array.from(document.getElementsByTagName("svg"));
    //   if (list && list?.length > 0) {
    //     list.forEach((element: any) => {
    //       element.style.webkitAppRegion = "no-drag"
    //       element.style.boxSizing = "border-box"
    //     });
    //   }
        // setlist(Bons.List);
        // return () => {
        //     setlist([]);
        // };
    }, []);
    useEffect(() => {
        Bons.unSelectAll()
    }, [filter]);
    const TEST = new Array(9).fill(null);
    const [scrollX, setScrollX] = useState(0);
    const [number, setNumber] = useState(null)

    const scrolled = useRef(null);
    const style0 = useSpring({
        top: `${scrollX}%`,
        config: { mass: 5, tension: 500, friction: 80 },
    })
    return hydrated ? (
        <div style={{
            flex: 1
        }}>
            <AddBtn onClick={() => {
                setPanel(true);
            }}>
                Ajouter
            </AddBtn>
            {/* <AddBtn onClick={() => {
                setPanel(true);
            }}>
                Factures
            </AddBtn> */}
            <Checkbox checked={filter} style={{
                position: "absolute",
                top: 81,
                left: 23
            }} onChange={(e) => setFilter(e.target.checked)}>Facturé</Checkbox>
            <div className="panelAddFacturation" style={{
                position: "absolute",
                top: panel ? 78 : 0,
                left: panel ? 217 : 168
            }}>
                <Facturation open={panel} setPanel={setPanel} />
                {/* <Exported setopen={setopenExport}  estyle={Escaling} /> */}
            </div>
            <svg
                width={822}
                height={417}
                fill="none"
                // style
                // {...props}
                className="undraggbleimportant"
            >
                <g filter="url(#prefix__filter0_d)">
                    <path
                        d="M136.5 6a4 4 0 00-4-4h-18.624c-.477 0-.942.148-1.331.425-20.12 14.293-47.08 14.293-67.2 0A2.298 2.298 0 0044.015 2H6a4 4 0 00-4 4v405a4 4 0 004 4h37.991c.488 0 .96-.174 1.332-.491 19.373-16.515 47.872-16.515 67.244 0 .372.317.844.491 1.332.491H132.5a4 4 0 004-4V6z"
                        fill="#FDFDFD"
                    />
                </g>
                <path stroke="#EFE9E9" strokeWidth={2} d="M117 21v375" />
                <mask
                    id="prefix__a"
                    style={{
                        maskType: "alpha",
                    }}
                    maskUnits="userSpaceOnUse"
                    x={2}
                    y={2}
                    width={798}
                    height={413}
                >
                    <path fill="#C4C4C4" d="M2 2h798v413H2z" />
                </mask>
                <foreignObject width="107" height="50" x="5" y="20">
                    {/* <div className="facture_number">
                    <p>Nº de facture:</p>
                      <input  value={number} onChange={(e)=>setNumber(e.currentTarget.valueAsNumber)} maxLength={11} pattern="[0-9]{11}" type="number" placeholder="numero de facture" />
                  </div>  */}
                </foreignObject>
                {/* <foreignObject x="111" y="20" width="12" height="380">
                    <animated.div onMouseDown={(e) => scrollerHandler(scrolled.current, e, setScrollX)} className="scroller" style={style0}>
                    </animated.div>
                </foreignObject> */}
                <foreignObject x="140" y="-2" width="680" height="425">

                    {(Bons.List.length == 0) ? <div style={{
                        display: "flex",
                        height: "-webkit-fill-available",
                        width: "-webkit-fill-available",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <NoBons />
                    </div> :
                        <div className="items-send-screen" ref={scrolled} onMouseDown={(e) => mouseDownHandler(e, setScrollX)}>
                            {
                                Bons.List.filter((s) => filter ? !!s?.NFacture : !s?.NFacture).
                                    map((e, i) => <ItemSendScreen edit={()=>setMenuConf([false, false, false, false, true])} remove={() => Bons.removeBon(e.uuid)} factured={() => Bons.editFactured(e.uuid)} bon={e} key={i} />)
                                // TEST.map((e:any,i)=><ItemSendScreen key={i} />)
                            }
                        </div>
                    }
                </foreignObject>
                <defs>
                    <filter
                        id="prefix__filter0_d"
                        x={0}
                        y={0}
                        width={138.5}
                        height={417}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation={1} />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix values="0 0 0 0 0.228083 0 0 0 0 0.991667 0 0 0 0 0.0371875 0 0 0 0.25 0" />
                        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
                        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                    </filter>
                </defs>
            </svg>
        </div>
    ) : (<div style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }}>
        <Spin indicator={antIcon} />
    </div>);
})
const AddBtn = styled.button`
    width: 70px;
    height: 20px;
    font-size: 12;
    position: absolute;
    top: 35px;
    left: 25px;
    display:flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    outline: unset;
    padding: 3px 7px;
    font-family: Archivo, Arial, Helvetica, sans-serif;
    border: 1px solid #ccc;
`;
export default SendScreen
