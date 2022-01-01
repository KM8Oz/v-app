import React, { ReactElement, useState } from 'react'
import DirectionArrows from '../buttons/DirectionArrows';
import CheckBox from '../buttons/CheckBox';
import {filter, frmt} from "@render/tools/formaters"
import { DeleteOutlined } from '@ant-design/icons';
import { usePersistentStore } from '../../store';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useMemo } from 'react';
import {Body,Code,Direction,Format,Header,IconAdd,ItemCode,ItemFormat,ItemNom,Nomination,SettingItem,SettingsWrapper } from "./styledComponents";

interface Props {
}
const CFournisseurs:FC = observer(({ }: Props) => {
      const { Settings } = usePersistentStore()
      let { CFournisseurs } = Settings
      let emtyfilter = {nom:"", code:"", format:"", direction:""}
      const [filters, setFilters] = useState({nom:"", code:"", format:"", direction:""});
      const remove = (id:string)=>{
        Settings.rmCFournisseurs(id)
      }
      const em = (id:string,payload:any)=>{
        Settings.editCFournisseurs(id,payload)
      }
    return (
        <SettingsWrapper >
            {useMemo(()=><Header  >
                <Nomination type='text' maxLength={10} onChange={(ev=>setFilters({...emtyfilter, nom:ev.currentTarget.value.replace(/[^a-zA-Z]/g, '')}))}  value={filters.nom} placeholder='Nomination' />
                <Code type='text' placeholder='Code' maxLength={6} onChange={(ev=>setFilters({...emtyfilter, code:ev.currentTarget.value.replace(/[^0-9]/g, '')}))}  value={filters.code}/>
                <Format type='text' placeholder='Format' maxLength={10} onChange={(ev=>setFilters({...emtyfilter, format:ev.currentTarget.value.replace(/[^XYxy]/g, "").toLocaleUpperCase()}))}  value={filters.format}/>
                {/* <Direction type='text' placeholder='Direction' maxLength={10} onChange={(ev=>setFilters({...filters, nom:ev.currentTarget.value.replace(/[^a-zA-Z]/g, '')}))}  value={filters.nom}/> */}
                <IconAdd onClick={()=>Settings.genCFournisseurs()} />
            </Header>,[filters])}
            <Body >
              {
                CFournisseurs.filter(s=>filter(filters, s)).map((s, i) => (<ItemSetting id={s.id} key={i} rm={remove} em={em} nom={s.nom} format={s.format} code={s.code} active={s.active} direction={s.direction}  />))
              }
            </Body>
        </SettingsWrapper>
    )
})
interface itemsSetting{
    nom:string,
    code:string,
    format:string,
    active:boolean,
    direction:boolean,
    id?:string,
    em:(id:string,payload: any) => void
    rm:(id: string) => void
}

const ItemSetting = ({em,id, nom,rm, code, format, direction, active}:itemsSetting)=>{
        const [item, setITEM] = useState({nom, code, format, direction, active});
        const [temp, setTemp] = useState({nom, code, format, direction, active});
   return (
    <SettingItem >
    <ItemNom type='text' maxLength={10} onChange={(ev=>setITEM({...item, nom:ev.currentTarget.value.replace(/[^a-zA-Z]/g, ''), active:false}))} placeholder='Nom' value={item.nom} />
    <ItemCode type='text' maxLength={7} onChange={(ev)=>{
      setITEM({...item, code:ev.currentTarget.value.replace(/[^0-9]/g, ""), active:false})
      setTemp({...item, code:ev.currentTarget.value.replace(/[^0-9]/g, "")})
    }} placeholder='Code' value={item.code} />
    <ItemFormat type='text' maxLength={10} onChange={(ev=>setITEM({...item, format:ev.currentTarget.value.replace(/[^XYxy]/g, "").toLocaleUpperCase(), code:frmt(temp.code, ev.currentTarget.value.replace(/[^XY]/g, ""), item.active), active:false}))} placeholder='Format' value={item.format} />
    <DirectionArrows direction={item.direction} onClick={()=>setITEM({...item,direction:!item.direction, code:frmt(temp.code, item.format, !item.direction), active:false})} />
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
</SettingItem>
   )
}

export default CFournisseurs;