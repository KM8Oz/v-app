import React, { useState } from 'react'
import styled from "styled-components";
import { observer } from "mobx-react-lite"
import { usePersistentStore } from '../store';
interface Props {
    Bon?:any;
    setBon?:React.Dispatch<React.SetStateAction<any>>;
    saveAction?:()=>void
}


 const MenuLeft = observer(({Bon, setBon, saveAction}: Props) => {
    const { Bons } = usePersistentStore()
    //  const [ShowModel, setShowModel] = useState(false);
     return (
        <MenuLeftWrapper>
            <ProfileBtn>
                 <Burrger/>
                  <ProfileName>
                      {"O. Karimm"} 
                  </ProfileName>
                </ProfileBtn>
            <ResetBtn onClick={()=>setBon(Bons.default as any)}>RESET</ResetBtn>
            <Commentaire>
            COMMENTAIRE
            </Commentaire>
            <Archiver>ARCHIVER</Archiver>
            <Souvegarder onClick={saveAction}>SOUVEGARDER</Souvegarder>
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
  width: 100%;
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  -webkit-app-region: no-drag;
`;

const ProfileBtn = styled.div`
   /* border:none;
   outline:unset; */
   cursor: pointer;
   &:hover{
       opacity: .9;
   }
    /* flex: 1; */
    margin-bottom:2em;
    margin-top: 10px;
    width:90px;
    height:21px;
    border-radius:17px;
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
const ProfileName =  styled.p`
   margin: unset;
   padding: unset;
   font-size: 12px;
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
 const Souvegarder = styled.button`
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
const Burrger = ()=>(
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.875 7.5H13.125" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.875 3.75H13.125" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.875 11.25H13.125" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

)
export { MenuLeft, Souvegarder }