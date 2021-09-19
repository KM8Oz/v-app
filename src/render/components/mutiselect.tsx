import React, { ReactElement } from 'react'
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
/*
* @copyright kmoz000
* max:number>5
*/
interface Props {
     x:number,
     y:number,
     width:number,
     height:number,
     max:number | 5
}
enum Carburant {
  Diesel= "Diesel",
  Essence = "Essence",
  Melange = "Melange"
}
enum Designations {
 Carburant= "Carburant",
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
export default function Mutiselect({ max, y, x, width, height }: Props): ReactElement {
  const Menu = (props:any) => {
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
        DropdownIndicator:false as any,
        Menu
        // ClearIndicator:false as any
      }}
    //   defaultValue={[colourOptions[4], colourOptions[5]]}
    placeholder="choisir..."
    noOptionsMessage={()=>"Rien à choisir" as any}
      autoFocus={false}
      openMenuOnFocus={false}
      // menuIsOpen={true}
      filterOption={(option, rawInput)=>{
          // console.log(colourOptions.length - option);
          return true;
      }}
      styles={{
        valueContainer:(styles, {})=>({
         ...styles,
         padding: "unset !important",
         " div":{
          width: "53px !important",
              marginRight: ".3px"
         }
        }),
        control: styles => {
          return ({ ...styles,
           backgroundColor: 'transparent',
            border:"unset !important" ,
            fontSize:".6em", 
            padding: "2px 2px 1px 2px",
            outline:"0 !important",
            borderColor:"none !important"
           })},
        menu:( styles )=>({
           ...styles,
              margin:'unset',
              maxHeight: "135px",
              boxShadow: "unset",
              backgroundColor: "transparent",
              overflowY:'hidden',
              borderRadius:"unset",
              paddingTop: "3px",
            " dev":{
              "::-webkit-scrollbar":{
                display:"none "
              },
             " div[tabindex]":{
              border: "1px solid #4c7a6c",
              padding: "2px 7px",
              cursor: "pointer",
              margin:"3px auto",
              borderRadius:"unset",
              backgroundColor: "#fff"
            },
               borderRadius:"unset",
              maxHeight: "23vh",
              backgroundColor: "transparent"
            }
        }),
        option:(styles, { 
          // data, isDisabled, isFocused, isSelected 
        })=>({
             ...styles,
             color:"#444",
             backgroundColor:"#FFF",
             fontSize:".6em"
           }),
           multiValueLabel: (styles, { data }) => ({
                 ...styles,
                 color: "#444",
                     margin:" unset !important"
                //  backgroundColor:"#444"
              }),
          multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "#ccc",
      fontSize:".3em",
      transform: 'scale(0.6)',
      display:"none",
      ':hover': {
        backgroundColor: "#F30505",
        color: 'white',
      },
    }),
           multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "transparent",
        width:'57.7656px',
        margin:"unset",
        borderRadius: "unset",
        border: "1px solid #4c7a6c"
      };
    },
      }}
      isMulti
      options={colourOptions}
    />
        </foreignObject>
    )
}
