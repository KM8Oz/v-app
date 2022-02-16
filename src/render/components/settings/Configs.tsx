import * as React from 'react';
import { useRef, useState } from 'react';
import styled from "styled-components";
import { Tabs, Upload } from "antd"
import ImgCrop from 'antd-img-crop';
import 'antd/es/modal/style';
import 'antd/es/slider/style';

// facturation [logo, ste informations, min-max bons in facturation]
export interface IAppProps {

}
export function Configs(props: IAppProps) {
    // const [tabPosition, settabPosition] = useState(0);
    const facturationref = useRef<HTMLDivElement>(null)
    const templatesref = useRef<HTMLDivElement>(null)
    return (
        <Corps>
            <Header>
                <Button onClick={() => facturationref.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })}>
                    Facturation
                </Button>
                <Button onClick={() => templatesref.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })}>
                    Templates
                </Button>
            </Header>
            <Body>
                <Facturations ref={facturationref} />
                <Templates ref={templatesref} />
            </Body>
        </Corps>
    );
}
const Templates = React.forwardRef((props: any, ref: any) => {
    return (
        <Templatesbody {...props} ref={ref}>

        </Templatesbody>
    )
})
const Facturations = React.forwardRef((props: any, ref: any) => {
    const [factrations, setFacturation] = useState({
        BonsNumber: 25,
        minfacturesNumber: 10,
        logo: null
    })
    return (
        <Facturationsbody {...props} ref={ref}>
            <ImgCrop zoom={true} minZoom={-2} aspect={3/1} onModalOk={(file:File)=>{
                console.log(file);
            }}>
                <Upload  listType="text">+ Add image</Upload>
            </ImgCrop>
        </Facturationsbody>
    )
})
const Templatesbody = styled.div`
    min-width: 100%;
    height: 316px;
    background-color: #f0f0f0;
    overflow-y: scroll;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
     display: none;
   }
`;
const Facturationsbody = styled.div`
    min-width: 100%;
    height: 316px;
    background-color: #1d5050;
    overflow-y: scroll;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
     display: none;
   }
`;
const Button = styled.button`
    width: auto;
    height: 30px;
    background-color: #4c7a6c;
    box-shadow: 0px 0px 2px 0.1px #4c7a6c;
    margin: 0px 4px;
    border-radius: 18px;
    color: #fff;
    font-family: Archivo;
    text-align: center;
    padding: 5px 21px;
    outline: unset;
    &:active{
        transform:scale(.9);
    }
`;
const Body = styled.div`
    grid-area:b;
    max-width:100%;
    height:100%;
    display:flex;
    flex-direction:row;
    flex-wrap:nowrap;
    overflow-x:scroll;
    &::-webkit-scrollbar {
     display: none;
   }
`;
const Corps = styled.div`
       height:100%;
       width:100%;
       display:grid;
       grid-template:
        "1fr"
        "11fr";
    grid-template-areas:
        "h"
        "b";
`;
const Header = styled.div`
        grid-area:h;
        width:100%;
        height:50px;
        display:flex;
        flex-direction:row;
        flex-wrap:nowrap;
        justify-content:flex-end;
        align-items:center;
        border-bottom:1px solid #eee;
        padding: 5px 0px 5px 0px;
`;