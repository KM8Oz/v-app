import React, { ReactElement, useState } from 'react'
import DirectionArrows from '../buttons/DirectionArrows';
import CheckBox from '../buttons/CheckBox';
import {filter, frmt} from "@render/tools/formaters"
import { DeleteOutlined } from '@ant-design/icons';
import { usePersistentStore } from '../../store';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useMemo } from 'react';
import {Body,Code,Direction,Format,Header,HeaderStation,IconAdd,ItemCode,ItemFormat,ItemNom,ItemNomStation,Nomination,SettingItem,SettingItemStation,SettingsWrapper } from "./styledComponents";

interface Props {
}
const Station:FC = observer(({ }: Props) => {
      const { Settings } = usePersistentStore()
      let { Station } = Settings
      let emtyfilter = {nom:""}
      const [filters, setFilters] = useState({nom:""});
      const remove = (id:string)=>{
        Settings.rmStation(id)
      }
      const em = (id:string,payload:any)=>{
        Settings.editStation(id,payload)
      }
    return (
        <SettingsWrapper >
            {useMemo(()=><HeaderStation  >
                <Nomination type='text' maxLength={10} onChange={(ev=>setFilters({...emtyfilter, nom:ev.currentTarget.value.replace(/[^a-zA-Z0-9 ]/g, '')}))}  value={filters.nom} placeholder='Nomination' />
                {/* <Direction type='text' placeholder='Direction' maxLength={10} onChange={(ev=>setFilters({...filters, nom:ev.currentTarget.value.replace(/[^a-zA-Z]/g, '')}))}  value={filters.nom}/> */}
                <IconAdd onClick={()=>Settings.genStation()} />
            </HeaderStation>,[filters])}
            <Body >
              {
                Station.filter(s=>filter(filters, s)).map((s, i) => (<ItemSetting id={s.id} key={i} rm={remove} em={em} nom={s.nom}  active={s.active}   />))
              }
            </Body>
        </SettingsWrapper>
    )
})
interface itemsSetting{
    nom:string,
    active:boolean,
    id?:string,
    em:(id:string,payload: any) => void
    rm:(id: string) => void
}

const ItemSetting = ({em,id, nom,rm, active}:itemsSetting)=>{
        const [item, setITEM] = useState({nom, active});
        const [temp, setTemp] = useState({nom, active});
   return (
    <SettingItemStation >
    <ItemNomStation type='text' maxLength={50} onChange={(ev=>setITEM({...item, nom:ev.currentTarget.value.replace(/[^a-zA-Z0-9 ]/g, ''), active:false}))} placeholder='Nom' value={item.nom} />
    <DeleteOutlined color='red' onClick={()=>rm(id)}  style={{
      gridArea:"remove",
      cursor:"pointer"
    }} />
    <CheckBox style={{
        gridArea:"add",
        cursor:"pointer"
    }} active={item.active} onClick={()=>{
      setITEM({...item,active:!item.active})
      em(id,{...item,active:!item.active})
    }}/>
</SettingItemStation>
   )
}

export default Station;