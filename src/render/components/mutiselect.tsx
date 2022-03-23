import React, { ReactElement } from 'react'
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';
import { observer } from 'mobx-react-lite'
import { usePersistentStore } from '@render/store'
import { BonSimpleType } from '../store/vignettes/BonsModel';
const animatedComponents = makeAnimated();
/*
* @copyright kmoz000
* max:number>5
*/
interface Props {
  x: number,
  y: number,
  width: number,
  height: number,
  setBon:React.Dispatch<React.SetStateAction<BonSimpleType>>,
  max: number | 5
}
enum Carburant {
  Diesel = "Diesel",
  Essence = "Essence",
  Melange = "Melange"
}
enum Designations {
  Carburant = "Carburant",
  Entretien = "Entretien",
  Lavage = "Lavage",
  Lubrifiant = "Lubrifiant",
  Reparation = "Reparation",
  Achat_pieces_de_rechange_et_pneus = "Achat_pieces_de_rechange_et_pneus",
  Carrnet = "Carrnet",
  FraisDImmatriculation = "FraisDImmatriculation",
  VisiteTechnique = "VisiteTechnique"
}
const colourOptions = [
  { value: Carburant.Diesel, label: Carburant.Diesel },
  { value: Carburant.Essence, label: Carburant.Essence },
  { value: Carburant.Melange, label: Carburant.Melange },
  { value: Designations.Lavage, label: Designations.Lavage },
  { value: Designations.Entretien, label: Designations.Entretien },
  { value: Designations.Achat_pieces_de_rechange_et_pneus, label: Designations.Achat_pieces_de_rechange_et_pneus },
  { value: Designations.VisiteTechnique, label: Designations.VisiteTechnique },
  { value: Designations.Lubrifiant, label: Designations.Lubrifiant },
  { value: Designations.Carrnet, label: Designations.Carrnet },
  { value: Designations.FraisDImmatriculation, label: Designations.FraisDImmatriculation },
];
export default observer(({ max, y, x,setBon, width, height }: Props): ReactElement =>{
  const { Settings } = usePersistentStore()
  const Menu = (props: any) => {
    const optionSelectedLength = props.getValue().length || 0;
    return (
      <components.Menu {...props}>
        {optionSelectedLength < max ? (
          props.children
        ) : (
          <div>Max limit achieved</div>
        )}
      </components.Menu>
    );
  };
  return (
    <foreignObject x={x} y={y} width={width} height={height} >
      <Select
        // closeMenuOnSelect={}
        components={{
          ...animatedComponents,
          DropdownIndicator: false as any,
          Menu
          // ClearIndicator:false as any
        }}
        //   defaultValue={[colourOptions[4], colourOptions[5]]}
        placeholder="choisir..."
        noOptionsMessage={() => "Rien à choisir" as any}
        autoFocus={false}
        openMenuOnFocus={false}
        // menuIsOpen={true}
        onChange={(ev=>{
          // console.log(ev);
          let _option = ev[0].value;
          setBon((bon:BonSimpleType)=>({
            ...bon,
            CArticle:_option
          }))
        })}
        filterOption={(option, rawInput) => {
          // console.log(colourOptions.length - option);
          return true;
        }}
        styles={{
          container:(styles, { }) => ({
            ...styles,
            outline:"unset !important"
          }),
          valueContainer: (styles, { }) => ({
            ...styles,
            padding: "unset !important",
            " div": {
              width: "53px !important",
              marginRight: ".3px",
              maxHeight: "16px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }
          }),
          control: styles => {
            return ({
              ...styles,
              backgroundColor: 'transparent',
              border: "unset !important",
              fontSize: ".6em",
              padding: "2px 2px 1px 2px",
              outline: "0 !important",
              borderColor: "none !important",
              boxShadow:"unset !important"
            })
          },
          menu: (styles) => ({
            ...styles,
            margin: 'unset',
            maxHeight: "135px",
            boxShadow: "unset",
            backgroundColor: "transparent",
            overflowY: 'hidden',
            borderRadius: "unset",
            paddingTop: "3px",
            " dev": {
              "::-webkit-scrollbar": {
                display: "none "
              },
              " div[tabindex]": {
                border: "1px solid #4c7a6c",
                padding: "2px 7px",
                cursor: "pointer",
                margin: "3px auto",
                borderRadius: "unset",
                backgroundColor: "#fff"
              },
              borderRadius: "unset",
              maxHeight: "23vh",
              backgroundColor: "transparent",
              boxShadow: "0px 2px 4px -1.2px #444",
            }
          }),
          option: (styles, {
            // data, isDisabled, isFocused, isSelected 
          }) => ({
            ...styles,
            color: "#444",
            backgroundColor: "#FFF",
            fontSize: ".6em"
          }),
          multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: "#444",
            margin: " unset !important"
            //  backgroundColor:"#444"
          }),
          multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: "#ccc",
            fontSize: ".3em",
            padding: "unset !important",
            transform: 'scale(0.6)',
            maxWidth: "13px !important",
            display: "none",
            ':hover': {
              backgroundColor: "#F30505",
              color: 'white',
            },
          }),
          multiValue: (styles, { data }) => {
            return {
              ...styles,
              backgroundColor: "transparent",
              width: '57.7656px',
              margin: "unset",
              borderRadius: "unset",
              border: "1px solid #4c7a6c"
            };
          },
        }}
        isMulti
        options={Settings.Articles()}
      />
    </foreignObject>
  )
})
