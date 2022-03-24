import { DatePicker, Select } from "antd";
import styled from "styled-components"
import AddIconSettings from '../buttons/AddIconSettings'
export const IconAdd = styled(AddIconSettings)`
  grid-area: add;
  transition: all .2s ease-in-out;
  cursor:pointer;
  &:hover{
      transform:scale(1.02)
  }
  &:active{
      transform:scale(.98)
  }
`;


export const Body = styled.div`
  flex: 1;
  grid-area: body-settings;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  justify-content:center;
`;


export const Direction = styled.input`
  width: 98px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #AEAEAE;
  background-color: #F1F4F2;
  outline: unset;
  text-align: center;
  border: 1px solid #E5E5E5;
  border-radius: 22px;
  grid-area: direction;
`;


export const Format = styled.input`
  width: 85px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #AEAEAE;
  background-color: #F1F4F2;
  outline: unset;
  text-align: center;
  border: 1px solid #E5E5E5;
  border-radius: 22px;
  grid-area: format;
`;


export const Code = styled.input<{area?:string}>`
  width: 85px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #AEAEAE;
  background-color: #F1F4F2;
  outline: unset;
  text-align: center;
  border: 1px solid #E5E5E5;
  border-radius: 22px;
  grid-area: ${({area})=>area?area:'code'};
`;
export const ItemFormat = styled.input`
  font-family: Archivo;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  width: 85px;
  height: 19px;
  outline: none;
  border: unset;
  grid-area: format;
  background-color: transparent;
`;
export const ItemFormatSetect = styled(Select)`
  font-family: Archivo;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  width: 85px;
  height: 19px;
  outline: none;
  border: unset;
  grid-area: format;
  background-color: transparent;
  box-shadow:unset;
  .ant-select-selection-item{
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 0px;
    margin: unset;
  }
 .ant-select-selector{
    padding: unset !important;
    border: unset !important;
    height: 21px !important;
    box-shadow:unset !important;
    background-color: #f1f1f1 !important;
  }
`;


export const ItemCode = styled.input<{area?:string}>`
  font-family: Archivo;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  width: 85px;
  height: 19px;
  outline: none;
  border: unset;
  grid-area: ${({area})=>area?area:'code'};
  background-color: transparent;
`;
export const ItemDate = styled(DatePicker)<{area?:string}>`
  font-family: Archivo;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  width: 135px;
  box-shadow:unset;
  height: 19px;
  outline: none;
  border: unset;
  grid-area: ${({area})=>area?area:'code'};
  background-color: transparent;
`;


export const ItemNom = styled.input`
  font-family: Archivo;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  width: 61px;
  height: 19px;
  outline: none;
  border: unset;
  grid-area: nom;
  background-color: transparent;
`;
export const ItemNomStation = styled.input`
  font-family: Archivo;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  width: 80%;
  height: 19px;
  outline: none;
  border: unset;
  grid-area: nom;
  background-color: transparent;
`;


export const SettingItem = styled.div<{areas?:string}>`
  width: 496px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr .5fr .5fr;
  grid-template-areas: ${({areas})=>areas?areas:"'nom code format direction remove add'"};
  justify-items: center;
  align-items: center;
  background-color: #F1F4F2;
  margin: 14px auto 0px auto;
`;
export const SettingItemStation = styled.div<{areas?:string}>`
  width: 496px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 3fr 1fr .5fr .5fr;
  grid-template-areas: ${({areas})=>areas?areas:"'nom . remove add'"};
  justify-items: center;
  align-items: center;
  background-color: #F1F4F2;
  margin: 14px auto 0px auto;
`;
export const SettingItemArticle = styled.div<{areas?:string}>`
  width: 496px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr .5fr .5fr;
  grid-template-areas: ${({areas})=>areas?areas:"'nom Code taux format direction remove add'"};
  justify-items: center;
  align-items: center;
  background-color: #F1F4F2;
  margin: 14px auto 0px auto;
`;

export const Nomination = styled.input`
  width: 98px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #AEAEAE;
  background-color: #F1F4F2;
  outline: unset;
  text-align: center;
  border: 1px solid #E5E5E5;
  border-radius: 22px;
  grid-area: nom;
`;
export const NominationArticle = styled.input`
  width: 120px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #AEAEAE;
  background-color: #F1F4F2;
  outline: unset;
  text-align: center;
  border: 1px solid #E5E5E5;
  border-radius: 22px;
  grid-area: nom;
`;


export const Header = styled.div<{areas?:string}>`
  grid-area: header-settings;
  display: grid;
  padding-top: 8px;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr .5fr .5fr;
  grid-template-areas:${({areas})=>areas?areas:"'nom code format direction . add'"};
  justify-items: center;
  align-content: center;
  height: 100%;
`;
export const HeaderStation = styled.div<{areas?:string}>`
  grid-area: header-settings;
  display: grid;
  padding-top: 8px;
  grid-template-rows: 1fr;
  grid-template-columns: 4fr .5fr .5fr;
  grid-template-areas:${({areas})=>areas?areas:"'nom  . add'"};
  justify-items: center;
  align-content: center;
  height: 100%;
`;
export const HeaderArticle = styled.div<{areas?:string}>`
  grid-area: header-settings;
  display: grid;
  padding-top: 8px;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr .4fr .6fr;
  grid-template-areas:${({areas})=>areas?areas:"'nom Code taux format direction . add'"};
  grid-gap:2px;
  justify-items: center;
  align-content: center;
  height: 100%;
`;


export const SettingsWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 8.3fr;
  grid-template-columns: 1fr;
  grid-template-areas: "header-settings" "body-settings";
`;