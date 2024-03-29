import React, { useState } from 'react'
import styled from "styled-components";
import { observer } from "mobx-react-lite"
import { usePersistentStore } from '../store';
import { Popover, Button, notification } from 'antd';
import { BonSimpleType, BonsModel } from '../store/vignettes/BonsModel';
import { makeid } from '../tools';
import { VignettestypeFromServer } from '../tools/formatters';
import { IOPrivate } from '../tools/sockets';
import moment from 'moment';
import { formatDate } from '../tools/formaters';
const { machineId } = require("node-machine-id")
interface Props {
   setMenuConf: any,
   Bon?: BonSimpleType;
   setStoreBon?: React.Dispatch<React.SetStateAction<BonSimpleType>>,
   reset?: () => void
}

const openNotification = (title: string, description: string) => {
   const key = makeid(10);

   const btn = () => (
      <Button type="primary" size="small" onClick={() => {
         notification.close(key)
      }}>
         "Reset"
      </Button>
   );
   notification.open({
      message: title,
      description: description,
      btn,
      key,
      onClose: () => notification.close(key),
   });
};
const MenuLeftEdit = observer(({ Bon, setStoreBon, reset, setMenuConf }: Props) => {
   const text = <span>Comment</span>;
   const content = (
      <div>
         <TextInput value={Bon.comment || ""} onChange={(ev) => {
            let _value = ev.currentTarget?.value;
            setStoreBon((bon: BonSimpleType) => ({
               ...bon,
               comment: _value
            }))
         }} />
      </div>
   );
   const { Bons, User,Settings } = usePersistentStore()
   //  const [ShowModel, setShowModel] = useState(false);
   const [saved, setSaved] = useState(false);
   const save = () => {
      if (Math.abs(Number(Bon.MontantTotalBrut) - Number(Bon.MontantVignette)) >= 5) return openNotification("échec de l'enregistrement", "(MontantVignette - MontantTotalBrut) > 5 dh")
      // console.log(!Bon?.CArticle , !Bon?.CBar ,!Bon?.CBon ,!Bon?.CFournisseur ,!Bon?.DBon  ,!Bon?.Kilos ,!Bon?.MontantTotal ,!Bon?.MontantTotalBrut,!Bon?.MontantVignette,!Bon?.PU,!Bon?.Quantity,!Bon?.Signature,!Bon?.Ville,!Bon?.station);
      
      if (!Bon?.CArticle || !Bon?.CBar ||!Bon?.CBon ||!Bon?.CFournisseur ||!Bon?.DBon  ||!Bon?.Kilos ||!Bon?.MontantTotal ||!Bon?.MontantTotalBrut||!Bon?.MontantVignette||!Bon?.PU||!Bon?.Quantity||!Bon?.Signature||!Bon?.Ville||!Bon?.station) return openNotification("échec de l'enregistrement", "Certaines informations manquent")
      setSaved(true)
      //  let datebon = moment(Bon.DBon, "fom").toDate();
      // console.log("datebon",Bon.DBon);
      
      // let _DBon = `${datebon?.getDate()?.toString()?.padStart(2,"0")}${datebon?.getMonth()?.toString()?.padStart(2,"0")}${datebon?.getFullYear()}`;
      Bons.edit({
         ...Bon,
         meta: {
            createById: User.ssid,
            lastEditById: User.ssid,
         }
      })
      .then((res:string) => {
            let _private = IOPrivate(User.ssid);
            machineId().then((ID) => {
               let onlineBon = {
                  bon:{
                  MontantTotalBrut:Bon.MontantTotalBrut,
                  MontantVignette:Bon.MontantVignette,
                  MontantTotal:Bon.MontantTotal,
                  CFournisseur:Bon.CFournisseur,
                  Quantity:Bon.Quantity,
                  CArticle:Bon.CArticle,
                  Kilos:Bon.Kilos,
                  station:Bon.station,
                  uuid:Bon.uuid,
                  CBar:Bon.CBar,
                  CBon:Bon.CBon,
                  // DBon:formatDate(new Date(Bon.DBon), Settings.DBon[0]?.format || "DDMMYYYY"),
                  DBon:`${Bon.DBon}`,
                  // DBon:`${new Date(Bon.DBon).getFullYear()}-${String(new Date(Bon.DBon).getMonth()+1).padStart(2,"0")}-${String(new Date(Bon.DBon).getDate()-1).padStart(2,"0")}`,
                  PU:Bon.PU,
                  SNTL:res,
                  Signature:Bon.Signature,
                  Ville:Bon.Ville,
                  archived:false,
                  factured:false
                  },
                  FP:ID,
               } 
               _private.emit("call", "vignettes.editBon", onlineBon , async (err:any, res:any) => {
                   if(res){
                     console.log(res);
                   } else {
                      console.log(err);
                   }
               })
           })
            setMenuConf([false, true, false, false])
            setSaved(false)
         })
         .catch((err) => {
            setSaved(false)
            console.log(err);
            openNotification("échec de l'enregistrement", "le bon a n'existe pas ou bien malformé")
         })
   }
   return (
      <MenuLeftWrapper>
         <ProfileBtn type="dashed" block>
            <Burrger />
            <ProfileName>
               {User.meta?.username || "Machine " + User.ssid.substring(0, 4)}
            </ProfileName>
         </ProfileBtn>
         <ResetBtn onClick={() => reset()}>RESET</ResetBtn>
         <Popover placement="right" title={text} content={content} trigger="click">
            <Commentaire>
               COMMENTAIRE
            </Commentaire>
         </Popover>
         {/* <Archiver>ARCHIVER</Archiver> */}
         <Souvegarder loading={saved} onClick={save}>SOUVEGARDER</Souvegarder>
      </MenuLeftWrapper>
   )
})
/**
 * coded by @kmoz000
 * styled component suited by profile brodcum
 * */
const ResetBtn = styled.button`
   border:none;
   outline:unset;
   width:90px;
   height: 21px;
   /* font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; */
   font-family: Arial, Helvetica, sans-serif;
   border-radius: 17px;
   font-size: 12px;
   display: flex;
   margin: 5px 0px;
   font-weight: 700;
    justify-content: center;
     align-items: center;
   color:#fff;
   background-color: #F45C5C;
`;
const MenuLeftWrapper = styled.div`
  width: 96%;
  height:100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  -webkit-app-region: no-drag;
`;

const ProfileBtn = styled(Button)`
   /* border:none;
   outline:unset; */
   cursor: pointer;
   &:hover{
       opacity: .9;
   }
    /* flex: 1; */
    margin-bottom:2em;
    margin-top: 10px;
    p{
      margin: unset;
      padding: unset;
      font-size: 10px;
      font-family: Archivo;
      font-weight: 400;
      color: #444;
    }
    width:90px;
    height:21px;
    border-radius:17px;
    padding: 4px 4px;
    display: flex;
    flex-direction: row;
    background-color: #ECECEC;
    justify-content: space-around;
    align-items: center;
`;
const Commentaire = styled.button`
   border:none;
   outline:unset;
   width:90px;
   height: 21px;
   /* font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; */
   font-family: Arial, Helvetica, sans-serif;
   border-radius: 17px;
   font-size: 10px;
   display: flex;
   margin: 5px 0px;
   font-weight: 700;
    justify-content: center;
     align-items: center;
   color:#fff;
   background-color: #4C7A6C;
`;
const ProfileName = styled.p`
   margin: unset;
   padding: unset;
   font-size: 11px;
   font-family:Arial, Helvetica, sans-serif;
   font-weight:400;
   color: #444;
`;
const Archiver = styled.button`
   border:none;
   outline:unset;
   width:90px;
    margin: 5px 0px;
   height: 21px;
   /* font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; */
   font-family: Arial, Helvetica, sans-serif;
   border-radius: 17px;
   font-size: 10px;
   display: flex;
   font-weight: 700;
    justify-content: center;
     align-items: center;
   color:#fff;
   background-color: #4C7A6C;
`;
// export const StyledBurger = styled.button`
//   position: absolute;
//   top: 5%;
//   left: 2rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   width: 2rem;
//   height: 2rem;
//   background: transparent;
//   border: none;
//   cursor: pointer;
//   padding: 0;
//   z-index: 10;
//   span {
//     width: 2rem;
//     height: 0.25rem;
//     background: ${({ theme, open }:any) => open ? theme.primaryDark : theme.primaryLight};
//     border-radius: 10px;
//     transition: all 0.3s linear;
//     position: relative;
//     transform-origin: 1px;
//     :first-child {
//       transform: ${({ open }:any) => open ? 'rotate(45deg)' : 'rotate(0)'};
//     }
//     :nth-child(2) {
//       opacity: ${({ open }:any) => open ? '0' : '1'};
//       transform: ${({ open }:any) => open ? 'translateX(20px)' : 'translateX(0)'};
//     }
//     :nth-child(3) {
//       transform: ${({ open }:any) => open ? 'rotate(-45deg)' : 'rotate(0)'};
//     }
//   }
// `;
const Souvegarder = styled(Button)`
   border:none;
   outline:unset;
   width:90px;
    margin: 5px 0px;
   height: 21px;
   /* font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; */
   font-family: Arial, Helvetica, sans-serif;
   border-radius: 17px;
   font-size: 10px;
   display: flex;
   font-weight: 700;
    justify-content: center;
     align-items: center;
   color:#fff;
   background-color: #3ABC94;
`;
const Burrger = () => (
   <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M1.875 7.5H13.125" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.875 3.75H13.125" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.875 11.25H13.125" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
   </svg>

)
const TextInput = styled.input`
  outline:none;
  border: 1px solid #ccc;
  border-radius: 13px;
  &:focus{
   border: 1px solid #ccc;
  border-radius: 13px;
  }
  font-family: Arial, sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 600;
  padding: 5px 3px;
  text-align: start;
  width: 100%;
`;
export { MenuLeftEdit, Souvegarder }