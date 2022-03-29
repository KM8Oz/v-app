import { Button, Popover } from "antd"
import moment from "moment"
import * as React from "react"
import { usePersistentStore } from "../store"
import { BonSimpleType, BonType } from "../store/vignettes/BonsModel"
import { getDATE } from "../tools/formaters"
import CheckBox from "./buttons/CheckBox"
import styled from "styled-components";
import { observer } from "mobx-react-lite"
import { animated, AnimationProps, config, useSpring } from "react-spring"
import { useState } from "react"
import { VignettestypeFromServer } from "../tools/formatters"
import { machineId } from "node-machine-id"
import { IOPrivate } from '../tools/sockets';

interface Props {
  bon?: BonType
  factured?: () => Promise<any>,
  remove?: () => Promise<any>,
  selected?: boolean,
  edit?:any
}
let ListFormats = {
  "DDMMYYYY": "DD-MM-YYYY",
  "MMDDYYYY": "MM-DD-YYYY",
  "DDYYYYMM": "DD-YYYY-MM",
  "YYYYMMDD": "YYYY-MM-DD",
  "YYYYDDMM": "YYYY-DD-MM",
  "MMYYYYDD": "MM-YYYY-DD"
}
const dateoptions = { year: 'numeric', month: 'long', day: 'numeric' };
function ItemSendScreen({ selected = false, remove, factured, bon,edit, ...props }: AnimationProps<SVGAElement> & Props) {
  const { Settings, Bons, User, TempBon } = usePersistentStore()
  const [popover, setPopover] = useState(false)
  let _private = IOPrivate(User.ssid);
  const EditComponent = (
    <div style={{
      display: "flex",
      justifyContent: "center",
      flexDirection: "row"
    }}>
      <Button type="dashed" size="small"
        onClick={() => {
          remove().then((res) => {
            console.log(res);
            machineId().then((ID) => {
              let onlineBon:VignettestypeFromServer|any = {
                 archived:true,
                 machine:ID,
                 uuid: bon.uuid
              } 
              _private.emit("call", "vignettes.addOrUpdate", onlineBon , async (err:any, res:any) => {
                  if(res){
                    console.log("removed:", res);
                  } else {
                    console.log("removing err:", res);
                  }
              })
          })
            setPopover(false)
          })
            .catch((err) => {
              console.log(err);
              setPopover(false)
            })
        }}
        style={{
          marginLeft: 5,
          marginRight: 5
        }} danger>
        supprimer
      </Button>
      {bon.meta.factured &&<Button type="dashed" size="small"
        onClick={() => {
          Bons.deFacturationData(bon.CBon).then((res)=>{
            machineId().then((ID) => {
               let onlineBon:VignettestypeFromServer|any = {
                  factured:false,
                  machine:ID,
                  uuid: bon.uuid
               } 
               _private.emit("call", "vignettes.addOrUpdate", onlineBon , async (err:any, res:any) => {
                   if(res){
                     console.log(res);
                   } else {
                      console.log(err);
                   }
               })
           })
            setPopover(false)
          })
        }}
        style={{
          marginLeft: 5,
          marginRight: 5
        }} danger>
        DeFacturé
      </Button>}
      {
      !bon.meta.factured &&<Button style={{
        marginLeft: 5,
        marginRight: 5
      }} 
      onClick={()=>{
        let _bon = {
          CFournisseur: bon.CFournisseur,
          CArticle: bon.CArticle,
          CBon: bon.CBon,
          station:bon.station,
          CBar:bon.CBar,
          DBon: bon.DBon,
          Count: bon.Count,
          MontantTotalBrut: bon.MontantTotalBrut,
          Kilos: bon.Kilos,
          Ville: bon.Ville,
          MontantVignette:bon.MontantVignette,
          MontantTotal: bon.MontantTotal,
          PU: bon.PU,
          Quantity: bon.Quantity,
          Signature: bon.Signature
        }
        TempBon.setTempBon(_bon).then(()=>{
          edit()
        }).catch((err)=>{
          console.log(err);
        })
        }}
      type="primary" size="small">
        modifier
      </Button>}
    </div>
  )

  // const scale0 = useSpring({
  //   transform: `matrix3d(${animate ? "1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1" : "2.652174, 0.013378, 0, 0.000033, 0.003815, 3.01526, 0, 0.000038, 0, 0, 1, 0, 100, 100, 0, 1"})`,
  //   config: config.wobbly,
  // })
  return (
    <animated.svg
      width={670}
      height={58}
      fill="none"
    >
      <path
        d="M1 16C1 7.716 7.716 1 16 1h620c8.284 0 15 6.716 15 15v28c0 8.284-6.716 15-15 15H16C7.716 59 1 52.284 1 44V16z"
        fill="#FDFDFD"
      />
      {
        /* <path
          d="M52.18 19.16c.16-.867.58-1.547 1.26-2.04.693-.507 1.533-.76 2.52-.76.96 0 1.747.287 2.36.86.627.56.94 1.327.94 2.3 0 1.173-.74 2.287-2.22 3.34-1.6 1.133-2.487 2.013-2.66 2.64h5.14V27h-7.48c.133-1.107.513-2.033 1.14-2.78.627-.76 1.573-1.607 2.84-2.54.96-.693 1.44-1.4 1.44-2.12 0-.453-.127-.847-.38-1.18-.24-.333-.653-.5-1.24-.5-1.067 0-1.687.527-1.86 1.58l-1.8-.3zm9.506 2.64c0-1.667.366-2.993 1.1-3.98.733-.987 1.686-1.48 2.86-1.48 1.186 0 2.14.493 2.86 1.48.72.987 1.086 2.313 1.1 3.98 0 1.653-.367 2.987-1.1 4-.72 1-1.674 1.5-2.86 1.5-1.24 0-2.214-.52-2.92-1.56-.694-1.04-1.04-2.353-1.04-3.94zm5.96.02c0-2.627-.667-3.94-2-3.94-1.334 0-2 1.313-2 3.94s.666 3.94 2 3.94c1.333 0 2-1.313 2-3.94zm5.645-.5c-.773-.533-1.16-1.253-1.16-2.16 0-.907.327-1.6.98-2.08.667-.48 1.434-.72 2.3-.72.854 0 1.614.24 2.28.72.667.48 1 1.173 1 2.08s-.386 1.627-1.16 2.16v.02c.52.24.934.6 1.24 1.08.32.467.48.98.48 1.54 0 .907-.353 1.687-1.06 2.34-.706.653-1.633.98-2.78.98-1.186 0-2.126-.327-2.82-.98-.68-.667-1.02-1.447-1.02-2.34 0-.56.154-1.073.46-1.54.32-.48.74-.84 1.26-1.08v-.02zm2.12-.56c.4 0 .76-.12 1.08-.36.334-.24.5-.587.5-1.04 0-.493-.16-.86-.48-1.1a1.672 1.672 0 00-1.1-.38c-.466 0-.846.133-1.14.4-.293.267-.44.627-.44 1.08 0 .44.16.787.48 1.04.334.24.7.36 1.1.36zm0 5c.507 0 .954-.147 1.34-.44.387-.293.58-.747.58-1.36 0-.493-.186-.907-.56-1.24-.373-.333-.826-.5-1.36-.5-.52 0-.973.167-1.36.5-.373.333-.56.747-.56 1.24 0 .613.194 1.067.58 1.36.387.293.834.44 1.34.44zM86.097 27v-2.32h-5.24v-.98l5.8-7.24h1.12v6.86h1.62v1.36h-1.62V27h-1.68zm-3.2-3.68h3.2v-4l-3.2 4zm8.385-5.18v-1.5h7.22v1.18c-.853.853-1.566 2.14-2.14 3.86a16.595 16.595 0 00-.86 5.32h-1.8c0-1.773.274-3.5.82-5.18.547-1.68 1.174-2.907 1.88-3.68h-5.12zm9.726 1.02c.16-.867.58-1.547 1.26-2.04.693-.507 1.533-.76 2.52-.76.96 0 1.747.287 2.36.86.627.56.94 1.327.94 2.3 0 1.173-.74 2.287-2.22 3.34-1.6 1.133-2.487 2.013-2.66 2.64h5.14V27h-7.48c.133-1.107.513-2.033 1.14-2.78.627-.76 1.573-1.607 2.84-2.54.96-.693 1.44-1.4 1.44-2.12 0-.453-.127-.847-.38-1.18-.24-.333-.653-.5-1.24-.5-1.067 0-1.687.527-1.86 1.58l-1.8-.3zM60.282 43h-1.47l-5.348-8.302h-.056l.07 1.218c.028.485.042.985.042 1.498V43h-1.162v-9.996h1.456l5.334 8.274h.056l-.042-.672c-.01-.299-.023-.625-.042-.98-.01-.355-.014-.681-.014-.98v-5.642h1.176V43zm2.307-4.144v-1.4h1.4v1.4h-1.4zm0 4.144v-1.4h1.4V43h-1.4zm7.764-5.95c.971-.224 1.732-.7 2.282-1.428h.728V43h-1.231v-5.6c-.411.317-1.004.523-1.779.616v-.966zm5.982 2.31c0-1.167.257-2.095.77-2.786.514-.69 1.181-1.036 2.002-1.036.831 0 1.498.345 2.002 1.036.504.69.761 1.62.77 2.786 0 1.157-.256 2.09-.77 2.8-.504.7-1.17 1.05-2.002 1.05-.868 0-1.549-.364-2.044-1.092-.485-.728-.728-1.647-.728-2.758zm4.172.014c0-1.839-.466-2.758-1.4-2.758-.933 0-1.4.92-1.4 2.758 0 1.839.467 2.758 1.4 2.758.934 0 1.4-.92 1.4-2.758z"
          fill="#6C6C6C"
        /> */
      }
      <foreignObject x="38" y="13" width="81" height="36">
        <p style={{
          color: "#6C6C6C",
          fontSize: 14,
          // fontWeight:"bold",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          margin: "auto"
        }}>
          <strong
            style={{
              color: "#6C6C6C",
              fontSize: 12,
              // fontWeight:"bold",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              margin: "auto"
            }}
          >
            {bon?.CBar}
          </strong>
          <i>N: {bon?.CBon?.replace(/[^0-9]/g, '')}</i>
        </p>
      </foreignObject>
      {/* <path
        d="M13.191 45V14.22h6.131l7.286 21.794c.672 2.03 1.162 3.548 1.47 4.556.35-1.12.896-2.765 1.637-4.934l7.37-21.416h5.48V45h-3.926V19.238L29.694 45H26.02l-8.902-26.203V45H13.19z"
        fill="#F30505"
      /> */}
      <foreignObject x="5.19" y="4" width="39" height="39">
        <p style={{
          color: "#F30505",
          fontSize: 34,
          fontWeight: "bold",
          margin: "auto"
        }}>
          {bon?.CBon?.replace(/[^a-zA-Z]/g, '')}
        </p>
      </foreignObject>
      <path
        d="M335.986 17.242l-.676 1.275-1.415-.739.659-1.283 1.432.747zm3.49 8.183h-1.205c-.709 0-1.212-.132-1.511-.396-.299-.263-.448-.7-.448-1.31 0-.228.029-.512.087-.852l.097-.51c-1.002.305-1.758.566-2.267.783-.938.398-1.665.85-2.18 1.353-.651.633-.976 1.354-.976 2.162 0 1.26.656 2.206 1.969 2.84 1.143.55 2.669.825 4.579.825h1.617l.053.097-1.986 1.397h-.51c-1.266 0-2.317-.117-3.155-.351-1.002-.281-1.761-.733-2.277-1.354-.586-.709-.879-1.646-.879-2.812 0-1.002.249-1.878.747-2.628.387-.586.953-1.122 1.697-1.608.217-.147.82-.484 1.81-1.011a12.97 12.97 0 00-.747-.07 10.58 10.58 0 00-2.144.044c-.123.017-.507.096-1.152.237.2-.575.408-.973.624-1.196.487-.492 1.248-.738 2.285-.738.569 0 1.184.056 1.846.167.662.106 1.219.158 1.67.158.299 0 .589-.011.87-.035.287-.023.586-.056.897-.097l-.352 1.495c-.24.029-.513.07-.817.123-.194.035-.46.085-.8.15l-.018.491c0 .48.147.803.44.967.181.1.492.15.931.15h1.205v1.529zm4.403 0h-5.01v-1.53h4.368c0-.69-.082-1.218-.246-1.581-.111-.253-.387-.616-.826-1.09l.686-1.433c.421.533.685.95.791 1.248.158.451.237 1.198.237 2.241v2.145zm-.044 1.758l-.686 1.265-1.423-.756.659-1.256 1.45.747zm-2.022.79l-.667 1.275-1.424-.738.65-1.275 1.441.739zm10.864-2.548c0 .644-.276 1.312-.826 2.004a6.79 6.79 0 01-1.793 1.573c-.68.422-1.24.633-1.679.633-.404 0-.841-.059-1.31-.176a11.649 11.649 0 01-1.283-.413c-.422-.158-.841-.316-1.257-.475l.15-.351c.386.076.788.152 1.204.228.422.082.803.123 1.142.123.75 0 1.533-.24 2.347-.72a6.777 6.777 0 001.89-1.662c.521-.673.782-1.28.782-1.819 0-.463-.135-.95-.404-1.459a6.344 6.344 0 00-.914-1.266l.501-1.38c.48.446.835.891 1.063 1.337.258.503.387 1.066.387 1.687v2.136zm4.139 0h-1.23c-.398 0-.718-.161-.958-.484-.211-.28-.372-.7-.483-1.256a18.342 18.342 0 01-.247-2.057 344.79 344.79 0 00-.114-2.04c-.035-.696-.085-1.224-.149-1.581a3.507 3.507 0 00-.246-.888 2.308 2.308 0 00-.536-.738l1.081-1.705c.228.703.389 1.544.483 2.522.059.61.117 2.051.176 4.325.105 1.042.258 1.71.457 2.003.164.247.343.37.536.37h1.23v1.529zm4.351-8.684l-.686 1.266-1.423-.756.659-1.257 1.45.747zm-2.021.791l-.668 1.275-1.424-.739.65-1.274 1.442.738zm2.065 7.893h-5.01v-1.53h4.368c0-.69-.082-1.218-.246-1.581-.111-.253-.386-.616-.826-1.09l.686-1.433c.421.533.685.95.791 1.248.158.451.237 1.198.237 2.241v2.145zm4.394 0h-5.009v-1.53h4.368c0-.69-.082-1.218-.246-1.581-.112-.253-.387-.616-.826-1.09l.685-1.433c.422.533.686.95.791 1.248.158.451.237 1.198.237 2.241v2.145zm-.896 2.136l-.686 1.274-1.423-.738.65-1.284 1.459.748zM145.318 26V13.115h1.705V24.48h6.346V26h-8.051zm16.278-3.006l1.634.202c-.257.955-.735 1.697-1.432 2.224-.697.527-1.588.79-2.672.79-1.365 0-2.449-.418-3.252-1.256-.797-.844-1.195-2.024-1.195-3.542 0-1.57.404-2.789 1.213-3.656.808-.867 1.857-1.3 3.146-1.3 1.248 0 2.268.424 3.059 1.274.791.85 1.186 2.044 1.186 3.585 0 .094-.003.235-.009.422h-6.961c.059 1.026.349 1.81.871 2.356.521.545 1.171.817 1.951.817.58 0 1.075-.152 1.485-.457.41-.305.735-.79.976-1.459zm-5.195-2.558h5.212c-.07-.785-.269-1.373-.597-1.766-.504-.61-1.158-.914-1.96-.914-.727 0-1.339.243-1.837.73-.492.486-.765 1.136-.818 1.95zM172.635 26v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.801V26h-1.801zm5.009 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.801V26h-1.801zm5.009 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.801V26h-1.801zm5.009 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.801V26h-1.801zm5.009 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.801V26h-1.801zm5.009 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.801V26h-1.801zm5.009 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.801V26h-1.801zm5.009 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.802V26h-1.802zm5.01 0v-1.802h1.801V26h-1.801z"
        fill="#4C7A6C"
      />
      <foreignObject x="189" y="12" width="250" height="20">
        <p style={{
          color: "#404e4a",
          fontSize: 14,
          // fontWeight:"bold",
          margin: "auto"
        }}>
          {
            getDATE(bon?.DBon, Settings.DateBon()[0].format).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })
          }
        </p>
      </foreignObject>
      {/* <path
        d="M153.282 44h-1.47l-5.348-8.302h-.056l.07 1.218c.028.485.042.985.042 1.498V44h-1.162v-9.996h1.456l5.334 8.274h.056l-.042-.672a42.162 42.162 0 00-.042-.98 38.982 38.982 0 01-.014-.98v-5.642h1.176V44zm6.185-7.742c0 .756-.201 1.344-.602 1.764-.402.41-.938.616-1.61.616-.626 0-1.144-.2-1.554-.602-.411-.41-.616-1.003-.616-1.778 0-.765.196-1.349.588-1.75.392-.41.928-.616 1.61-.616.662 0 1.19.2 1.582.602.401.401.602.99.602 1.764zm-3.5 0c0 .541.102.952.308 1.232.205.27.536.406.994.406.457 0 .788-.135.994-.406.205-.28.308-.69.308-1.232 0-.55-.103-.957-.308-1.218-.206-.27-.537-.406-.994-.406-.458 0-.789.135-.994.406-.206.261-.308.667-.308 1.218zm11.68 7.882c-.933 0-1.68-.322-2.24-.966-.56-.653-.84-1.624-.84-2.912 0-1.288.28-2.259.84-2.912.569-.663 1.321-.994 2.254-.994.579 0 1.05.107 1.414.322.373.215.677.476.91.784h.084a12.967 12.967 0 00-.056-.532 7.737 7.737 0 01-.028-.574V33.36h1.232V44h-.994l-.182-1.008h-.056a2.91 2.91 0 01-.896.812c-.373.224-.854.336-1.442.336zm.196-1.022c.793 0 1.349-.215 1.666-.644.327-.439.49-1.097.49-1.974v-.224c0-.933-.154-1.647-.462-2.142-.308-.504-.877-.756-1.708-.756-.663 0-1.162.266-1.498.798-.327.523-.49 1.227-.49 2.114 0 .896.163 1.591.49 2.086.336.495.84.742 1.512.742zm8.655-6.762c.644 0 1.195.14 1.652.42.467.28.821.677 1.064 1.19.252.504.378 1.097.378 1.778v.742h-5.138c.019.85.233 1.498.644 1.946.42.439 1.003.658 1.75.658a5.64 5.64 0 001.26-.126 7.606 7.606 0 001.148-.392v1.078c-.383.168-.761.29-1.134.364a6.129 6.129 0 01-1.33.126c-.709 0-1.339-.145-1.89-.434a3.085 3.085 0 01-1.274-1.288c-.299-.579-.448-1.283-.448-2.114 0-.821.135-1.526.406-2.114.28-.588.667-1.04 1.162-1.358.504-.317 1.087-.476 1.75-.476zm-.014 1.008c-.588 0-1.055.191-1.4.574-.336.373-.537.896-.602 1.568h3.822c-.009-.635-.159-1.148-.448-1.54-.289-.401-.747-.602-1.372-.602zm12.373.084h-1.89V44h-1.232v-6.552h-1.316v-.574l1.316-.42v-.434c0-.97.215-1.666.644-2.086.429-.43 1.027-.644 1.792-.644.299 0 .569.028.812.084.252.047.467.103.644.168l-.322.966a7.797 7.797 0 00-.518-.14 2.59 2.59 0 00-.602-.07c-.411 0-.719.14-.924.42-.196.27-.294.7-.294 1.288v.49h1.89v.952zm4.196-1.078c.915 0 1.592.2 2.03.602.439.401.658 1.04.658 1.918V44h-.896l-.238-1.064h-.056c-.326.41-.672.714-1.036.91-.354.196-.849.294-1.484.294-.681 0-1.246-.177-1.694-.532-.448-.364-.672-.929-.672-1.694 0-.747.294-1.32.882-1.722.588-.41 1.494-.635 2.716-.672l1.274-.042v-.448c0-.625-.135-1.06-.406-1.302-.27-.243-.653-.364-1.148-.364-.392 0-.765.06-1.12.182a7.385 7.385 0 00-.994.392l-.378-.924a5.399 5.399 0 011.162-.448c.448-.13.915-.196 1.4-.196zm.364 4.004c-.933.037-1.582.187-1.946.448-.354.261-.532.63-.532 1.106 0 .42.126.728.378.924.262.196.593.294.994.294.635 0 1.162-.173 1.582-.518.42-.355.63-.896.63-1.624v-.672l-1.106.042zm7.652 3.766c-.663 0-1.255-.135-1.778-.406-.513-.27-.919-.69-1.218-1.26-.289-.57-.434-1.297-.434-2.184 0-.924.154-1.675.462-2.254.308-.579.723-1.003 1.246-1.274.532-.27 1.134-.406 1.806-.406.383 0 .751.042 1.106.126.355.075.644.168.868.28l-.378 1.022a7.269 7.269 0 00-.784-.238 3.475 3.475 0 00-.84-.112c-1.475 0-2.212.947-2.212 2.842 0 .905.177 1.6.532 2.086.364.476.901.714 1.61.714.411 0 .77-.042 1.078-.126.317-.084.607-.187.868-.308v1.092c-.252.13-.532.229-.84.294a4.572 4.572 0 01-1.092.112zm6.223-1.008c.186 0 .378-.014.574-.042.196-.037.354-.075.476-.112v.938a1.97 1.97 0 01-.56.154c-.243.047-.476.07-.7.07-.392 0-.756-.065-1.092-.196a1.722 1.722 0 01-.798-.714c-.206-.336-.308-.807-.308-1.414v-4.368h-1.064v-.588l1.078-.49.49-1.596h.728v1.722h2.17v.952h-2.17v4.34c0 .457.107.798.322 1.022.224.215.508.322.854.322zm8.824-6.636V44h-1.008l-.182-.994h-.056a2.172 2.172 0 01-1.008.868 3.555 3.555 0 01-1.372.266c-.905 0-1.586-.215-2.044-.644-.457-.439-.686-1.134-.686-2.086v-4.914h1.246v4.83c0 1.195.556 1.792 1.666 1.792.831 0 1.405-.233 1.722-.7.327-.467.49-1.139.49-2.016v-3.906h1.232zm5.883-.14c.14 0 .289.01.448.028.168.01.312.028.434.056l-.154 1.134a4.108 4.108 0 00-.812-.098c-.383 0-.742.107-1.078.322-.336.205-.607.5-.812.882-.196.373-.294.812-.294 1.316V44h-1.232v-7.504h1.008l.14 1.372h.056c.242-.41.555-.765.938-1.064.382-.299.835-.448 1.358-.448zm4.907 0c.644 0 1.195.14 1.652.42.467.28.822.677 1.064 1.19.252.504.378 1.097.378 1.778v.742h-5.138c.019.85.234 1.498.644 1.946.42.439 1.004.658 1.75.658a5.64 5.64 0 001.26-.126 7.568 7.568 0 001.148-.392v1.078c-.382.168-.76.29-1.134.364a6.123 6.123 0 01-1.33.126c-.709 0-1.339-.145-1.89-.434a3.085 3.085 0 01-1.274-1.288c-.298-.579-.448-1.283-.448-2.114 0-.821.136-1.526.406-2.114.28-.588.668-1.04 1.162-1.358.504-.317 1.088-.476 1.75-.476zm-.014 1.008c-.588 0-1.054.191-1.4.574-.336.373-.536.896-.602 1.568h3.822c-.009-.635-.158-1.148-.448-1.54-.289-.401-.746-.602-1.372-.602zm4.781 2.492v-1.4h1.4v1.4h-1.4zm0 4.144v-1.4h1.4V44h-1.4zm6.882-3.08v-1.092h3.654v1.092h-3.654zm4.881 0v-1.092h3.654v1.092h-3.654zm4.881 0v-1.092h3.654v1.092h-3.654zm4.881 0v-1.092h3.654v1.092h-3.654zm4.881 0v-1.092h3.654v1.092h-3.654zm4.881 0v-1.092h3.654v1.092h-3.654zm4.881 0v-1.092h3.654v1.092h-3.654zm4.88 0v-1.092h3.654v1.092h-3.654zm4.881 0v-1.092h3.654v1.092h-3.654zm4.881 0v-1.092h3.654v1.092h-3.654z"
        fill="#6C6C6C"
      /> */}
      <foreignObject x="146" y="31" width="250" height="20">
        <p style={{
          color: "#6C6C6C",
          fontSize: 14,
          // fontWeight:"bold",
          margin: "auto"
        }}>
          facture: {bon.NFacture} {bon.NFacture ? "--" : ""} {bon.DFacture ? 
          new Date(`${"20"+bon.DFacture.substring(4,6)}-${bon.DFacture.substring(2,4)}-${bon.DFacture.substring(0,2)}`).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }) : ""}
        </p>
      </foreignObject>
      {/* <path
        d="M579 1h57c8.284 0 15 6.716 15 15v28c0 8.284-6.716 15-15 15h-57V1z"
        fill="#F45C5C"
      />
      <path
        d="M595.358 26l-3.757-4.342V26h-2.639v-8.944h2.509l3.757 4.407v-4.407h2.639V26h-2.509zm7.8-7.02c1.205 0 2.149.308 2.834.923.693.607 1.04 1.495 1.04 2.665s-.347 2.063-1.04 2.678c-.685.607-1.629.91-2.834.91s-2.149-.303-2.834-.91-1.027-1.5-1.027-2.678c0-1.179.342-2.071 1.027-2.678.685-.607 1.629-.91 2.834-.91zm0 1.755c-.849 0-1.274.49-1.274 1.469v.741c0 .97.425 1.456 1.274 1.456.858 0 1.287-.485 1.287-1.456v-.741c0-.98-.429-1.469-1.287-1.469zm9.854-1.755c.797 0 1.395.221 1.794.663.399.442.598 1.079.598 1.911V26h-2.587v-4.134c0-.295-.078-.529-.234-.702-.147-.182-.36-.273-.637-.273-.321 0-.581.104-.78.312a1.068 1.068 0 00-.299.767V26h-2.587v-6.864h2.119l.169 1.04c.269-.364.62-.654 1.053-.871a3.122 3.122 0 011.391-.325zm-21.437 10.439c.191 0 .429.026.715.078.286.043.516.095.689.156v1.521h-.598c-.277 0-.468.052-.572.156-.104.104-.156.282-.156.533v.273h1.326v1.755h-1.326V39h-2.587v-5.109h-.962v-1.755h.962v-.286c0-.884.217-1.508.65-1.872.433-.373 1.053-.559 1.859-.559zm5.524 2.561c1.048 0 1.902.178 2.561.533.658.347.988.914.988 1.703v2.678c0 .147.034.269.104.364.069.095.173.143.312.143h.468v1.495a1.476 1.476 0 01-.208.091c-.104.035-.256.07-.455.104-.2.043-.429.065-.689.065-.503 0-.919-.074-1.248-.221-.321-.156-.542-.368-.663-.637-.33.26-.698.468-1.105.624-.408.156-.884.234-1.43.234-1.612 0-2.418-.641-2.418-1.924 0-.667.177-1.174.533-1.521.364-.355.884-.598 1.56-.728s1.56-.195 2.652-.195v-.338c0-.269-.096-.472-.286-.611-.182-.139-.421-.208-.715-.208a1.61 1.61 0 00-.702.143.476.476 0 00-.286.455v.052h-2.548a.953.953 0 01-.013-.182c0-.65.307-1.166.923-1.547.624-.381 1.512-.572 2.665-.572zm.962 4.03c-.737 0-1.283.082-1.638.247-.347.156-.52.368-.52.637 0 .433.294.65.884.65.338 0 .632-.091.884-.273.26-.182.39-.407.39-.676v-.585zm7.865-4.03c1.126 0 2.036.243 2.73.728.702.477 1.053 1.209 1.053 2.197H607.2c0-.78-.425-1.17-1.274-1.17-.85 0-1.274.49-1.274 1.469v.741c0 .97.442 1.456 1.326 1.456.884 0 1.326-.399 1.326-1.196h2.405c0 .997-.351 1.738-1.053 2.223-.694.485-1.604.728-2.73.728-1.205 0-2.15-.303-2.834-.91-.685-.607-1.027-1.5-1.027-2.678 0-1.179.342-2.071 1.027-2.678.684-.607 1.629-.91 2.834-.91zm9.698.156v1.755h-1.456v2.613c0 .312.052.542.156.689.104.139.294.208.572.208h.728v1.521c-.208.07-.477.126-.806.169a6.72 6.72 0 01-.858.065c-.763 0-1.352-.139-1.768-.416-.408-.277-.611-.75-.611-1.417v-3.432h-.962v-1.755h1.066l.559-2.08h1.924v2.08h1.456zM621.803 39l-.169-1.04a2.816 2.816 0 01-1.066.884 3.145 3.145 0 01-1.378.312c-.797 0-1.395-.221-1.794-.663-.399-.442-.598-1.079-.598-1.911v-4.446h2.587v4.134c0 .295.074.533.221.715.156.173.373.26.65.26.321 0 .581-.104.78-.312.199-.208.299-.464.299-.767v-4.03h2.587V39h-2.119zm7.865-7.033c.199 0 .377.026.533.078.156.043.234.07.234.078v2.171h-.832c-.537 0-.927.139-1.17.416-.234.277-.351.689-.351 1.235V39h-2.587v-6.864h2.119l.169 1.04c.156-.399.403-.698.741-.897a2.138 2.138 0 011.144-.312zm3.904-.663l1.209-1.729h2.496l.026.052-2.067 1.677h-1.664zm1.248.676c1.257 0 2.215.295 2.873.884.668.59 1.001 1.49 1.001 2.704v.442h-5.148c0 .494.109.867.325 1.118.226.251.577.377 1.053.377.434 0 .75-.091.949-.273.208-.182.312-.425.312-.728h2.509c0 .832-.316 1.482-.949 1.95-.632.468-1.555.702-2.769.702-1.274 0-2.262-.295-2.964-.884-.702-.598-1.053-1.5-1.053-2.704 0-1.179.343-2.071 1.027-2.678.685-.607 1.63-.91 2.834-.91zm.104 1.651c-.814 0-1.269.386-1.365 1.157h2.522c0-.355-.104-.637-.312-.845-.199-.208-.481-.312-.845-.312zm8.567-1.651c1.257 0 2.214.295 2.873.884.667.59 1.001 1.49 1.001 2.704v.442h-5.148c0 .494.108.867.325 1.118.225.251.576.377 1.053.377.433 0 .75-.091.949-.273.208-.182.312-.425.312-.728h2.509c0 .832-.316 1.482-.949 1.95-.633.468-1.556.702-2.769.702-1.274 0-2.262-.295-2.964-.884-.702-.598-1.053-1.5-1.053-2.704 0-1.179.342-2.071 1.027-2.678.685-.607 1.629-.91 2.834-.91zm.104 1.651c-.815 0-1.27.386-1.365 1.157h2.522c0-.355-.104-.637-.312-.845-.199-.208-.481-.312-.845-.312z"
        fill="#fff"
      /> */}
      <foreignObject width="85" height="58" x="592" y="1">
        <animated.svg id="facturation_status_svg" width="85" height="58" viewBox="0 0 72 58" fill="none" >
          <path d="M0 0H54C63.9411 0 72 8.05887 72 18V40C72 49.9411 63.9411 58 54 58H0V0Z" fill={bon.NFacture ? "#019267" : "#D82148"} />
          <foreignObject width="85" height="58" x="0" y="0">
            <Center>
              <CheckBox
                active={bon.meta.selected}
                onClick={() => {
                  factured().then((res) => {
                    // console.log(res);
                  })
                    .catch((err) => {
                      console.log(err);
                    })
                }} />
            </Center>
          </foreignObject>
        </animated.svg>
      </foreignObject>
      <path stroke="#C4C4C4" strokeWidth={2} d="M132 8v45" />
      <foreignObject width="20" height="20" x="534" y="22"
        style={{
          cursor: "pointer"
        }}
      >
        <Popover placement="bottom" onVisibleChange={(v)=>setPopover(v)} visible={popover} title={<div>Options d'Édition</div>} content={EditComponent} trigger="click">
          <svg id="edit_icon" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.79175 2.83334H2.83341C2.45769 2.83334 2.09736 2.9826 1.83168 3.24828C1.566 3.51395 1.41675 3.87429 1.41675 4.25001V14.1667C1.41675 14.5424 1.566 14.9027 1.83168 15.1684C2.09736 15.4341 2.45769 15.5833 2.83341 15.5833H12.7501C13.1258 15.5833 13.4861 15.4341 13.7518 15.1684C14.0175 14.9027 14.1667 14.5424 14.1667 14.1667V9.20834" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.1042 1.77082C13.386 1.48903 13.7682 1.33072 14.1667 1.33072C14.5653 1.33072 14.9475 1.48903 15.2292 1.77082C15.511 2.05261 15.6693 2.43481 15.6693 2.83332C15.6693 3.23184 15.511 3.61403 15.2292 3.89582L8.50008 10.625L5.66675 11.3333L6.37508 8.49999L13.1042 1.77082Z" stroke="#4C7A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Popover>
      </foreignObject>
    </animated.svg>
  )
}
const Center = styled.div`
  display:flex;
  height:100%;
  justify-content:center;
  align-items:center;
`;
export default observer(ItemSendScreen)
