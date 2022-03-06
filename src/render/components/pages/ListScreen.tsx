// import { ItemSendScreen } from "@render/components"
import { mouseDownHandler, mouseScroller, scrollerHandler } from "@render/tools";
import React, { useState, useRef, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import Facturation from "../panels/Facturation";
import styled from "styled-components";
import bodySvg from "@render/assets/body.svg";
import DaterangePicker from "../panels/daterangePicker";
import CalandarIcon from "../buttons/CalandarIcon";
import SearchIcon from "../buttons/SearchIcon";
import { BonItem } from "../BonItem";
import { usePersistentStore }  from "@render/store";
import { observer } from "mobx-react-lite";
// import useOrbitdb from "../../hooks/useOrbitdb";
const ListScreen = observer((props: React.SVGProps<SVGSVGElement>)=>{
    const { Bons, hydrate, hydrated } = usePersistentStore();
    const [list, setlist] = useState<any>(Bons);
    // const { db } = useOrbitdb();
    const [order, setOrder] = useState([true, false, false]);
    const [ScrollingLeftPerCen, setScrollingLeftPerCen] = useState(0);
    const [panel, setPanel] = useState(false);
    const leftListRef = useRef(null);
    useEffect(() => {
        hydrate()
        setlist(Bons);
        return () => {
            setlist([]);
        };
    }, []);
    const TEST = new Array(9).fill(null);
    const [scrollX, setScrollX] = useState(0);
    const [number, setNumber] = useState(null)
    const scrolled = useRef(null);
    const [ShowDatePicker, setShowDatePicker] = useState(false);
    //  useEffect(() => {
    //  }, [ScrollingLeftPerCen]);
    const style0 = useSpring({
        top: `${scrollX}%`,
        config: { mass: 5, tension: 500, friction: 80 },
    })
    // useEffect(()=>{
    // }, [order])
    return (
        <Corp className="undraggble">
            <LeftCorp >
                <LeftCorpHeader>
                    <LeftCorpHeaderItem onClick={() => setOrder([!order[0], false, false])} active={Array.isArray(order) && order[0]}>
                        Nº
                    </LeftCorpHeaderItem>
                    <LeftCorpHeaderItem onClick={() => setOrder([false, !order[1], false])} active={order[1]}>
                        Date
                    </LeftCorpHeaderItem>
                    <LeftCorpHeaderItem onClick={() => setOrder([false, false, !order[2]])} active={order[2]}>
                        Order
                    </LeftCorpHeaderItem>
                </LeftCorpHeader>
                {/* <LiftScrollBar draggable={false} onMouseDown={
                    (e) => {
                        let limits = [136, 462]
                        let rate = 672;
                        let ev = (e.clientY / 395) - .3;
                        setScrollingLeftPerCen(ev)
                        leftListRef.current.scrollTo({
                            top: ScrollingLeftPerCen * 100
                        })
                    }
                } className="undraggble" scrollRate={ScrollingLeftPerCen} /> */}
                <ListScroller ref={leftListRef} onScroll={(ev) => setScrollingLeftPerCen(ev.currentTarget.scrollTop / (ev.currentTarget.scrollHeight - 17.8 * 20))}>
                    {Array(20).fill({ fac_code: "091231238071", date: "03/04/2021", fac_num: "019/2021" })
                        .map((e, i) => <ListScrollerItm key={i} {...e} />)}
                </ListScroller>
            </LeftCorp>
            <RightCorp>
                <SearchTools>
                    <SearchToolsInputs>
                        <SearchToolsInput placeholder="Nº de facture _" type="text" pattern="\d*" maxLength={15} />
                        <SearchToolsInput placeholder="Nº de Bon _" type="text" pattern="\d*" maxLength={15} />
                        <SearchToolsInput placeholder="Station_" type="text" pattern="[A-Za-z0-9]+" maxLength={15} />
                    </SearchToolsInputs>
                    <IconsSearch>
                        <CalandarIcon onClick={() => setShowDatePicker(!ShowDatePicker)} />
                        <SearchIcon />
                    </IconsSearch>
                </SearchTools>
                <ListBonsScroller>
                    {
                        Array(10).fill({ letter: "M", code: "208472", date: "01/01/2021", facNum: "091231238071" })
                            .map((e, i) => <BonItem bon={e} order={i} key={i} />)
                    }
                </ListBonsScroller>
            </RightCorp>
            <DaterangePicker ShowDatePicker={ShowDatePicker} />
        </Corp>
    )
})
const ListScrollerItm = ({
    fac_code,
    date,
    fac_num
}: {
    fac_code: string;
    date: string;
    fac_num: string;
}) => {
    return (
        <Item className="undraggble">
            <CodeAndDate before={fac_code} after={date}>
                <hr />
            </CodeAndDate>
            <FacNum>
                {fac_num}
            </FacNum>
        </Item>
    )
}
/*
* scrolling percentage 
* (ev)=>console.log((ev.currentTarget.scrollTop /(ev.currentTarget.scrollHeight - 17.8*20))*100+"%", )
*/
const LeftCorp = styled.div`

    max-width: 282px;
    width: 282px;
    margin: -3px 4px;
    height: 423px;
    /* box-shadow: 0px 0px 2px 0px #444; */
     background:url(${bodySvg});
     background-position: center;
     background-size: cover;
     background-repeat: no-repeat;
     position: relative;
     /* left: 6px; */
     /* top: -2px; */
     display: flex;
     flex-direction: column;
     /* justify-content: center; */
     align-items: center;
`;
const Corp = styled.div`
        flex: 1;
        flex-direction: row;
        justify-content: flex-start;
        /* position: absolute; */
        /* top:-2.8; */
        /* display: flex; */
        /* justify-content:space-around; */
`;
/**
 * right corp styled component
 */
const RightCorp = styled.div`
    position: absolute;
    top: 2px;
    width: 574px;
    height: 419px;
    /* background-color: #cccc; */
    left: 288px;
    border-radius: 9px;
`;
const SearchToolsInputs = styled.div`
    width: 125.29px;
    height: 26px;
    display: flex;
    margin-left: 5px;
    /* flex-direction: row;
    justify-content: center;
    align-items: center; */
    padding: 0px 0px;
    /* margin: auto; */
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 1px;
    grid-template-areas: ". . .";
`;
const SearchToolsInput = styled.input`
    border-radius: 34px;
    color: #6C6C6C;
    background-color: #E5E5E5;
    text-align: center;
    padding: 7px 1px;
    margin: 0px 2px;
    padding: 3px 5px;
    outline: unset !important;
    border: unset !important;
    ::-webkit-inner-spin-button {
     -webkit-appearance: none;
    }
`;
const SearchTools = styled.div`
    width: 100%;
    height: 49px;
    border-radius: 9px;
    position: absolute;
    top: 5px;
    box-shadow: 0px 0px 2px 0px #444;
    left: 0px;
    background-color: #FDFDFD;
    display: grid;
    grid-template-columns: 6fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 1px;
    grid-template-areas: ". .";
    align-items: center;
`;
const IconsSearch = styled.div`
     display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 76px;
`;
const LeftCorpHeader = styled.div`
     width: 187px;
     height: 15px;
     margin-top: 20px;
     display: flex;
     flex-direction: row;
     align-items: center;
     justify-content: space-around;
`;
const LeftCorpHeaderItem = styled.span<{ active: Boolean }>`
    background-color: #C4C4C4;
    border-radius: 8px;
    width: 49px;
    border: ${({ active }) => active ? '1px solid #000' : '1px solid #00000000'};
    text-align: center;
    color: #000000;
    font-size: 10px;
    cursor: pointer;
`;
const ListScroller = styled.div`
  width: 234px;
  height: 356px;
  /* background-color: #ccc; */
  position: absolute;
  left: 18px;
  top: 45px;
  overflow-y: scroll;
  overflow-x: unset;
  /* Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #50a081;
    border-radius: 32px;
  }
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ListBonsScroller = styled.div`
    width: 575px;
    height: 363px;
    /* background-color: #ccc; */
    position: absolute;
    left: 0px;
    top: 57px;
    overflow-y: scroll;
    overflow-x: unset;
    scroll-behavior: smooth;
    scroll-snap-type: both;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
  &::-webkit-scrollbar{
    display: none;
  }
`;

const Item = styled.div`
  border-radius: 76px;
  border:.5px solid #6C6C6C ;
  margin: 2px 0px;
  width: 226px;
  height: 17px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  &:hover{
      transform: scale(1.01);
  }
  &:active{
      transform: scale(.99);
  }
  /* margin: 3px 3px; */
  justify-content: space-between;
`;
const FacNum = styled.span`
    background-color: #4C7A6C;
    border-radius: 8px;
    color: #fff;
    width: 47px;
    padding: 0.5px 0.5px;
    margin: 0px 2px;
    height: 13px;
    font-family: Arial,Helvetica,sans-serif;
    font-weight: 500;
    font-size: 8.5px;
    font-weight: bold;
    text-align: center;
`;
const CodeAndDate = styled.div<{ before: string, after: string }>`
   /* width: 10px; */
   font-size:15.5px;
   /* color: #C4C4C4; */
   /* text-align: center; */
   width: 166px;
   display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    position:relative;
    height: 16px;
   /* flex-direction: row; */
   /* justify-content: space-around; */
   hr{
    position: absolute;
    background: #8a8a8a;
    width: 16px;
    height: .1px;
    color: #C4C4C4;
    transform: rotate(90deg);
    margin: unset;
    padding: unset;
    position: relative;
    align-self: center;
    left: 48%;
    border-style: unset;
   }
   &:before{
       display: block;
       position: absolute;
       content: ${({ before }) => "'" + String(before) + "'"};
       color: #000;
       font-size: 10px;
       font-family: Arial, Helvetica, sans-serif;
       text-align: center;
       width: 78px;
       height: 9px;
       left: 6px;
    top: 1px;
   }
   &:after{
       content: ${({ after }) => "'" + String(after) + "'"};
       color: #000;
       font-size: 10px;
       font-family: Arial, Helvetica, sans-serif;
       text-align: center;
       width: 78px;
       height: 9px;
   }
`;
const LiftScrollBar = styled.div<{ scrollRate }>`
    position: absolute;
    left: 7px;
    top: 39px;
    width: 2px;
    height: 365px;
    overflow: visible;
    background-color: #EFE9E9;
    cursor: pointer;
    &:active{
        cursor: grabbing;
     }
     /* &:before:active{
        cursor: grabbing;
     } */
   &:before{
    content: "";
    height: 34px;
    width: 7px;
    border-radius: 7px;
    background: #C4C4C4;
    position: absolute;
    left: -2px;
     top: ${({ scrollRate }) => scrollRate * 331}px;
     cursor: grab;
   }
   /* height: 100%; */
   background-color: #ccc;
`;
export default ListScreen
