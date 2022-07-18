/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 18/12/2021 - 09:07:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/12/2021
    * - Author          : 
    * - Modification    : 
**/
import { MenuBoxIcons } from "@render/components";
import React, { useEffect } from "react"
import { useState } from "react";
import { useHistory } from "react-router";
import { animated, Transition, config, useSpring } from "react-spring";
import { usePersistentStore } from "@render/store";
import { MenuButton } from "@render/tools"
import AddScreen from "./pages/AddScreen";
import SendScreen from "./pages/sendSceen";
import SettingsScreen from "./pages/SettingsScreen";
import ListScreen from "./pages/ListScreen";
import { observer } from "mobx-react-lite";
import { IOPrivate } from "../tools/sockets";
import { onSnapshot } from "mobx-state-tree";
import { VignettestypeFromServer } from "../tools/formatters";
import { BonSimpleType } from "../store/vignettes/BonsModel";
import EditScreeen from "./pages/EditScreeen";
const { machineId } = require("node-machine-id")
// import useOrbitdb from "../hooks/useOrbitdb";
const BodyWorkComponent = observer((props: any) => {
  const [menuConf, setMenuConf] = useState([true, false, false, false, false]);
  const history = useHistory();
  const { User, Errors, hydrate, hydrated, Settings, Bons } = usePersistentStore();
  let _private = IOPrivate(User.ssid);
  const addAction = () => {
    var emty = Array(5).fill(false);
    emty[0] = true;
    // console.log(User);
    setMenuConf(emty)
  }
  // const location = useLocation();
  useEffect(() => {
    Settings.init()
  }, [])
  useEffect(() => {
    let dispose = onSnapshot(Bons, (snap) => {
      // let  _json = JSON.stringify(snap, null, 2);
      // useOrbitdb._db?.put(snap);
    })
    hydrate()
    let _private = IOPrivate(User.ssid);
    _private.on("error", () => {
      history.push("Login")
    });
    _private.on("tk_save", (res: any) => {
      if (res.tk) {
        User.setssid(res.tk)
        machineId().then((ID) => {
          _private.emit("call", "vignettes.getAll", { issuedto: "no_company_name", deviceid: ID }, async (err: any, res: any) => {
            if (res) {
              let number_of_machines: number = res && typeof res == "object" ? res.length : [].length
              let list: Array<VignettestypeFromServer | any> = Array.from(res).flat<any>();

              list.forEach((elem: VignettestypeFromServer) => {
                if (elem && !elem.archived) {
                  
                console.log(elem)
                  let bon: BonSimpleType = {
                    CArticle: elem.CArticle,
                    CBar: elem.CBar,
                    CBon: elem.CBon,
                    CFournisseur: elem.CFournisseur,
                    DBon: elem.DBon,
                    DFacture:  elem.facture? elem.facture.DFacture : null,
                    Kilos: elem.Kilos,
                    uuid: elem.uuid,
                    MontantTotal: elem.MontantTotal,
                    MontantTotalBrut: elem.MontantTotalBrut,
                    MontantVignette: elem.MontantVignette,
                    NFacture: elem.facture? elem.facture.NFacture : null,
                    PU: elem.PU,
                    Quantity: elem.Quantity,
                    SNTL: elem.SNTL,
                    Signature: elem.Signature,
                    Ville: elem.Ville,
                    comment: elem.machine?.name || "",
                    meta: {
                      factured: elem.factured,
                      createById: elem.machine?.fingerprint || "",
                      lastEditById: elem.machine?.fingerprint || "",
                      lastEdit: new Date(),
                    },
                    station: elem.station,
                  }
                  Bons.add(bon).catch((err) => {
                    console.log(err);
                  })
                }
              })
            }
          })
        })
        // console.log(res);
      }
    })
    return () => {
      // let list = Array.from(document.getElementsByTagName("svg"));
      // if (list && list?.length > 0) {
      //   list.forEach((element: any) => {
      //     element.style.webkitAppRegion = "no-drag"
      //     element.style.boxSizing = "border-box"
      //   });
      // }
      dispose()
    }
  }, [menuConf]);
  const sendAction = () => {
    var emty = Array(5).fill(false);
    emty[1] = true;
    // history.push("/Send");
    setMenuConf(emty)
  }
  const settingAction = () => {
    var emty = Array(5).fill(false);
    emty[2] = true;
    setMenuConf(emty)
  }
  const listingAction = () => {
    var emty = Array(5).fill(false);
    emty[3] = true;
    setMenuConf(emty)
  }
  const logoutAction = () => {
    var emty = Array(5).fill(false);
    emty[4] = true;
    history.push("login");
    User.setssid(null)
    setMenuConf(emty)
  }
  const style0 = useSpring({
    opacity: menuConf[0] ? 1 : 0,
    transform: `perspective(600px) rotateX(${menuConf[0] ? 0 : 180}deg)`,
    config: { mass: 5, tension: 800, friction: 80 },
  })
  const style1 = useSpring({
    opacity: menuConf[1] ? 1 : 0,
    transform: `perspective(600px) rotateX(${menuConf[1] ? 0 : 180}deg)`,
    config: { mass: 5, tension: 800, friction: 80 },
  })
  const style2 = useSpring({
    opacity: menuConf[2] ? 1 : 0,
    transform: `perspective(600px) rotateX(${menuConf[2] ? 0 : 180}deg)`,
    config: { mass: 5, tension: 800, friction: 80 },
  })
  const style3 = useSpring({
    opacity: menuConf[3] ? 1 : 0,
    transform: `perspective(600px) rotateX(${menuConf[3] ? 0 : 180}deg)`,
    config: { mass: 5, tension: 800, friction: 80 },
  })
  const style4 = useSpring({
    opacity: menuConf[4] ? 1 : 0,
    transform: `perspective(600px) rotateX(${menuConf[4] ? 0 : 180}deg)`,
    config: { mass: 5, tension: 800, friction: 80 },
  })
  const [dragable, setDragable] = useState(false);
  let iconsbtnstyle = {
    position: "absolute" as any,
    left: 120.8908,
    top: 25.228,
    zIndex: 9,
    width: 39,
    height: 39
  }
  let marginf = 50;
  return (
    <>
      <animated.svg
        width={1001}
        height={550}
        fill="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1
        }}
        {...props}
        className={dragable ? "undraggbleimportant" : "draggableimportant"}
      >
        <path
          onMouseDown={() => {
            console.log("log enter =>");
          }}
          d="M986 39c8.284 0 15 6.716 15 15v7c0 8.284-6.716 15-15 15h-53.639a24.9 24.9 0 01-14.964-4.998l-3.246-2.44a18.827 18.827 0 00-20.893-1.159 18.83 18.83 0 01-9.497 2.62L210.5 73l-8.487 5.53a47 47 0 01-49.665 1.025L143 74l-39.225-.72c-8.39-.154-15.275 6.606-15.275 14.998V286.25l3.714 199.882c.157 8.426 7.223 15.07 15.642 14.708l28.294-1.217a10.005 10.005 0 005.206-1.731l13.674-9.33c15.47-10.556 36.195-8.965 49.872 3.83l4.727 4.422a9.998 9.998 0 006.802 2.698L883 501.5c-6.567 20.896-25.782 35.235-47.683 35.583L54 549.5 1.804 18.358C.852 8.668 8.702.382 18.43.808l864.483 37.93a20.73 20.73 0 0110.858 3.644 20.725 20.725 0 0021.417 1.279l3.072-1.616c3.8-2 8.029-3.045 12.323-3.045H986z"
          fill="#4C7A6C"
        />
        {/* <path
          d="M74.491 512.512l-1.36 4.08h-1.054l-1.36-4.08v4.08h-1.632v-4.828h-1.904v4.828H65.55v-4.828h-2.142V510.2h7.854l1.326 3.672 1.292-3.672h2.176v6.392h-1.564v-4.08zm7.185 3.963h4.7c1.883 0 3.317.517 4.3 1.55 1 1.033 1.5 2.408 1.5 4.125V529c0 3.333-1.767 5-5.3 5h-5.2v-17.525zm9.1 5.425c0-.95-.208-1.733-.625-2.35-.4-.633-.917-1.092-1.55-1.375a4.791 4.791 0 00-1.975-.425h-3.55v15h3.4c1.217 0 2.233-.233 3.05-.7.833-.483 1.25-1.417 1.25-2.8v-7.35zm12.304 10.825c-.4.5-.908.883-1.525 1.15-.6.267-1.208.4-1.825.4-3.133 0-4.7-1.525-4.7-4.575v-8.225h1.4v8.4c0 1.067.292 1.858.875 2.375.6.517 1.409.775 2.425.775 1 0 1.784-.25 2.35-.75.584-.517.875-1.317.875-2.4v-8.4h1.4V534h-1.375l.1-1.275zm4.182-11.25h1.4l-.125 1.275c.45-.483.975-.85 1.575-1.1a4.834 4.834 0 011.825-.375c1.55 0 2.725.45 3.525 1.35.817.9 1.225 2.067 1.225 3.5v3.475c0 1.517-.425 2.683-1.275 3.5-.85.8-1.975 1.2-3.375 1.2-.717 0-1.35-.1-1.9-.3-.55-.2-1.042-.55-1.475-1.05v5.75l-1.4.55v-17.775zm8.025 4.55c0-1.217-.325-2.1-.975-2.65-.633-.55-1.392-.825-2.275-.825-.9 0-1.675.275-2.325.825-.65.533-1 1.375-1.05 2.525v3.95c0 1.083.308 1.883.925 2.4.617.517 1.433.775 2.45.775.917 0 1.683-.267 2.3-.8.633-.55.95-1.342.95-2.375v-3.825zm11.99-8.1a.872.872 0 01-.6-.25.872.872 0 01-.25-.6.79.79 0 01.25-.575.818.818 0 01.6-.25c.233 0 .425.083.575.25.167.15.25.342.25.575a.818.818 0 01-.25.6.79.79 0 01-.575.25zm-.725 3.55h1.4V534h-1.4v-12.525zm12.99 3.95c0-1.017-.3-1.75-.9-2.2-.583-.467-1.341-.7-2.275-.7-.566 0-1.141.083-1.725.25-.583.15-1.1.35-1.55.6V534h-1.4v-12.525h1.4l-.1.85c.4-.35.909-.608 1.525-.775a6.736 6.736 0 011.925-.275c.917 0 1.7.15 2.35.45.667.3 1.184.75 1.55 1.35.384.6.575 1.358.575 2.275V534h-1.375v-8.575zm12 8.425a11.97 11.97 0 01-3 .4c-.9 0-1.65-.1-2.25-.3-.983-.333-1.7-.842-2.15-1.525-.433-.7-.65-1.675-.65-2.925v-3.2c0-1.65.434-2.9 1.3-3.75.867-.867 1.984-1.3 3.35-1.3 1.084 0 2.2.267 3.35.8l-.4 1.025c-.95-.383-1.866-.575-2.75-.575-1.033 0-1.866.3-2.5.9-.633.583-.95 1.5-.95 2.75v3.625c0 1.15.342 1.983 1.025 2.5.7.517 1.625.775 2.775.775.75 0 1.6-.108 2.55-.325l.3 1.125zM43.104 64C29.311 64 18 52.807 18 39c0-11.262 7.456-20.785 17.69-23.913v3.469c-8.201 3.032-14.152 10.928-14.152 20.19v1.031c.104 11.814 9.792 21.014 21.592 21.098.507.01 1.01-.005 1.509-.042V24.26l.52-.52 12.747 7.448v15.885l-6.868 3.802V47.49l3.122-2.136.208-11.823-5.827-3.646V63.402a24.922 24.922 0 01-5.437.598z"
          fill="#fff"
        />
        <path
          d="M43 14c13.833 0 25.057 11.256 25 25.104.046 10.998-7.15 20.348-17.066 23.636v-3.403c7.986-3.307 13.692-10.494 13.802-19.56v-.842C64.73 27.057 55.004 17.23 43.138 17.23c-.351 0-.7.009-1.048.025v37.11l-.624.365-12.591-7.552V30.98l6.816-3.594v4.01l-2.862 1.928v11.719l5.671 3.541V14.405A25.103 25.103 0 0143 14z"
          fill="#fff"
        /> */}
        <foreignObject id="errors"  x="67.8908" y="520.228" width="200" height="39">
            <p style={{
              color:"whitesmoke",
              fontSize:14
            }} >© kmoz.dev 2022-2025</p>
        </foreignObject>
        <foreignObject id="errors"  x="17.8908" y="20.228" width="50" height="50">
           <div style={{
            borderRadius:"50%",
            border:"2px solid #fff",
            width: 50,
            height: 50,
            display: "flex",
            justifyContent:"center",
            alignItems:"center"
           }}>
           <p style={{
              color:"#000",
              fontSize:15,
              width: 30,
              padding: "unset",
              margin: "unset",
            height: 30,
              fontWeight:"bolder",
              lineHeight:1,
              whiteSpace:"nowrap",
              textAlign:"center",
              background: "white",
              borderRadius:3
            }} >KM<br/>OZ</p>
           </div>
        </foreignObject>
        <defs>
          <clipPath id="prefix__clip0">
            <path fill="#fff" transform="translate(203 31)" d="M0 0h17v17H0z" />
          </clipPath>
        </defs>
      </animated.svg>
      <div style={{ ...iconsbtnstyle }}>
        <MenuButton icon="add" active={menuConf[0]} action={addAction} />
      </div>
      {
        Settings.ismaster &&
        <div style={{ ...iconsbtnstyle, left: iconsbtnstyle.left + marginf }}>
          <MenuButton icon="send" active={menuConf[1]} action={sendAction} />
        </div>
      }
      <div style={{ ...iconsbtnstyle, left: iconsbtnstyle.left + marginf * 2 }}>
        <MenuButton icon="setting" active={menuConf[2]} action={settingAction} />
      </div>
      <div style={{ ...iconsbtnstyle, left: iconsbtnstyle.left + marginf * 3 }}>
        <MenuButton icon="listing" active={menuConf[3]} action={listingAction} />
      </div>
      <div style={{ ...iconsbtnstyle, left: iconsbtnstyle.left + marginf * 4 }}>
        <MenuButton icon="logout" active={menuConf[4]} action={logoutAction} />
      </div>
      <div style={{
        position: "absolute",
        right: 38.8908,
        top: 43.228,
        zIndex: 9,
        width: 39,
        height: 39,
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 10
      }}>
        <MenuBoxIcons />
      </div>
      <animated.svg
        style={{
          position: "absolute",
          top: 59,
          left: 92
        }}
        width={881}
        height={432}
        fill="none"
        {...props}
        className={!dragable ? "undraggbleimportant" : "draggableimportant"}
      >

        <foreignObject x="6" y="18" width="900" height="413">
          <animated.div style={style0}>
            {menuConf[0] && <AddScreen setMenuConf={setMenuConf} />}
          </animated.div>
          <animated.div style={style1}>
            {menuConf[1] && <SendScreen setMenuConf={setMenuConf} />}
          </animated.div>
          <animated.div style={style2}>
            {menuConf[2] && <SettingsScreen />}
          </animated.div>
          <animated.div style={style3}>
            {menuConf[3] && <ListScreen />}
          </animated.div>
          <animated.div style={style4}>
            {menuConf[4] && <EditScreeen setMenuConf={setMenuConf} />}
          </animated.div>
        </foreignObject>

        {/* <use xlin="#errors"/> */}
      </animated.svg>
    </>
  )
})

const BodyWork = React.memo(BodyWorkComponent)
export default BodyWork