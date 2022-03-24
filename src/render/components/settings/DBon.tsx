import React, { ReactElement, useState } from 'react'
import DirectionArrows from '../buttons/DirectionArrows';
import CheckBox from '../buttons/CheckBox';
import { filter, frmt } from "@render/tools/formaters"
import { DeleteOutlined } from '@ant-design/icons';
import { usePersistentStore } from '../../store';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useMemo } from 'react';
import { Body, Code, Direction, Format, Header, IconAdd, ItemCode, ItemDate, ItemFormat, ItemFormatSetect, ItemNom, Nomination, SettingItem, SettingsWrapper } from "./styledComponents";
import { DateInput } from '..';
import { DatePicker, Select } from 'antd';
import moment from 'moment';
import { useRef } from 'react';
import AddIconSettings from '../buttons/AddIconSettings'
interface Props {
}
const DBon: FC = observer(({ }: Props) => {
    const { Settings } = usePersistentStore()
    let { DBon } = Settings
    let emtyfilter = { code: "", format: "", direction: "" }
    const [filters, setFilters] = useState({ code: "", format: "", direction: "" });
    const remove = (id: string) => {
        Settings.rmDBon(id)
    }
    const em = (id: string, payload: any) => {
        Settings.editDBon(id, payload)
    }
    return (
        <SettingsWrapper >
            {useMemo(() => <Header areas={"'code code format direction . add'"}  >
                {/* <Nomination type='text' maxLength={10} onChange={(ev=>setFilters({...emtyfilter, nom:ev.currentTarget.value.replace(/[^a-zA-Z]/g, '')}))}  value={filters.nom} placeholder='Nomination' /> */}
                {/* <Code area='code' type='date'  placeholder='Code' maxLength={8} onChange={(ev=>setFilters({...emtyfilter, code:ev.currentTarget.value.replace(/[^0-9]/g, '')}))}  value={filters.code}/> */}
                <Format type='text' placeholder='Format' maxLength={10} onChange={(ev => setFilters({ ...emtyfilter, format: ev.currentTarget.value.replace(/[^dmyDMY]/g, "").toLocaleUpperCase() }))} value={filters.format} />
                {/* <Direction type='text' placeholder='Direction' maxLength={10} onChange={(ev=>setFilters({...filters, direction:ev.currentTarget.value.replace(/[^a-zA-Z]/g, '')}))}  value={filters.nom}/> */}
                <AddIconSettings className='add-btn' onClick={() => Settings.genDBon()} />
            </Header>, [filters])}
            <Body >
                {
                    DBon.filter(s => filter(filters, s)).map((s, i) => (<ItemSetting id={s.id} key={i} rm={remove} em={em} format={s.format} code={s.code} active={s.active} direction={s.direction} />))
                }
            </Body>
        </SettingsWrapper>
    )
})
interface itemsSetting {
    code: string,
    format: string,
    active: boolean,
    direction: boolean,
    id?: string,
    em: (id: string, payload: any) => void
    rm: (id: string) => void
}

const ItemSetting = ({ em, id, rm, code, format, direction, active }: itemsSetting) => {
    const [item, setITEM] = useState({ code, format, direction, active });
    const [temp, setTemp] = useState({ code, format, direction, active });
    const DIRECTIONS = ["DDMMYYYY", "MMDDYYYY", "MMYYYYDD"]
    const { Option } = Select;
    const inputdate = useRef<typeof ItemDate>(null);
    return (
        <SettingItem areas={"'code code format direction remove add'"} >
            {/* <ItemNom type='text' maxLength={10} onChange={(ev=>setITEM({...item, nom:ev.currentTarget.value.replace(/[^a-zA-Z]/g, ''), active:false}))} placeholder='Nom' value={item.nom} /> */}
            {/* <ItemDate   pattern="\d{2}\d{2}\d{4}" type='date' maxLength={10} onChange={(ev)=>{
        //.match(/([\sa-zA-Z]{0,2})([\d0-9]{0,6})$/g)[0]?.toLocaleUpperCase()
      setITEM({...item, code:ev.currentTarget.value.toLocaleUpperCase(), active:false})
      setTemp({...item, code:ev.currentTarget.value.toLocaleUpperCase(),})
    }} placeholder='Code' area='code' value={item.code} /> */}
            {/* <ItemFormat type='text' maxLength={8} onChange={(ev=>setITEM({...item, format:ev.currentTarget.value.replace(/[^dmyDMY]/g, "").toLocaleUpperCase(), code:frmt(temp.code, ev.currentTarget.value.replace(/[^XY]/g, ""), item.active), active:false}))} placeholder='Format' value={item.format} /> */}
            <ItemFormatSetect
                defaultValue={DIRECTIONS[0]}
                style={{ width: 120 }}
                onChange={(value) => setITEM({ ...item, format: value.toString().toLocaleUpperCase(), active: false,code:item.format? moment(item.code, item.format).toString():item.code })}>
                {DIRECTIONS.map((s: any) => <Option value={s}>{s}</Option>)}
            </ItemFormatSetect>
            <ItemDate size='small' ref={inputdate as any}  style={{ width: '80%' }} area='code' format={item.format} onChange={(date: any, dateString: string) => {
                setITEM({ ...item, code: dateString, active: false })
                setTemp({ ...item, code: dateString, })
            }} />
            <DirectionArrows direction={item.direction} onClick={() =>setITEM({ ...item, direction: !item.direction, format:item.format? item.format.split("").reverse().join(""):item.format,code:item.format? moment(item.code, item.format).toString():item.code, active: false })} />
            <DeleteOutlined color='red' onClick={() => rm(id)} style={{
                gridArea: "remove",
                cursor: "pointer"
            }} />
            <CheckBox style={{
                gridArea: "add",
                cursor: "pointer"
            }} active={item.active} onClick={() => {
                setITEM({ ...item, active: !item.active })
                em(id, { ...item, active: !item.active })
            }} />
        </SettingItem>
    )
}
export default DBon;