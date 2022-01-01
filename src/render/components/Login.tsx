/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 17/12/2021 - 23:52:48
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/12/2021
    * - Author          : 
    * - Modification    : 
**/
import * as React from "react"
import { useState } from "react";
import { useHistory, useRouteMatch } from 'react-router-dom';
import { IOPrivate, IOPublic } from "../tools/sockets";
// import { useStore } from "store";
import QRCode from "qrcode.react"
import { ipcRenderer } from 'electron';
import { animated } from "react-spring";
import styled from "styled-components";
import Icon from "../assets/icon.svg"
import { usePersistentStore } from "../store";
import { usePrivate } from "../hooks/privateconnection";
interface _COLORS {
  NORMAL: string[];
  ERROR: string[];
  ACTIVATION: string[]
}
function Login(props: any) {
  const COLORS: _COLORS = { NORMAL: ["#4C7A6C", "#6C6C6C", "Login"], ERROR: ["#F45C5C", "#575757", "Try again"], ACTIVATION: ["#f31237", "#575757", "Activate"] };
  const history = useHistory();
  const { User } = usePersistentStore()
  const [color, setColor] = useState(COLORS.NORMAL);
  const [key, setkey] = useState("");
  const [userPass, setUserPass] = useState("");
  const [show, setshow] = useState(false);
  const [machinID, setmachinID] = useState(null);
  const [showqrcode, setshowqrcode] = useState(false);
  const [QrUrl, setQrUrl] = useState("");

  React.useEffect(() => {
    setColor(COLORS.ERROR)
    setshow(true)
    ipcRenderer.invoke("id").then((ID) => {
      setmachinID(ID);
      setColor(COLORS.NORMAL)
      IOPublic.emit("call", "licence.check", { deviceid: ID }, (err, res) => {
        if (!res?.status || err) {
          setshow(false)
          setColor(COLORS.ACTIVATION)
        } else {
          let _private = IOPrivate(User.ssid);
          _private.on("error", () => {
            history.push("Login")
            setshow(true)
            setshowqrcode(false)
          });
          _private.on("tk_save", (res:any)=>{
              if(res.tk){
                User.setssid(res.tk)
                history.push("Home")
              }
          })
        }
      })
    })

  }, []);
  const keylog = () => {
    IOPublic.emit("call", "licence.activate", { deviceid: machinID, key: key }, (err, res) => {
      if (!res?.status || err) {
        setshow(false)
        setshowqrcode(false)
        setColor(COLORS.ERROR)
      } else {
        setshowqrcode(true)
        setQrUrl(res.authurl)
      }
    })
  }

  const LoginAction = () => {
    IOPublic.emit("call", "machine.login", { deviceid: machinID, otpcode:userPass }, (err, res)=>{
      if (res && res?.status) {
        setColor(COLORS.NORMAL);
        User.setssid(res?.ssid)
       if(User.ssid) history.push("Home");
      } else {
        setColor(COLORS.ERROR)
      };
    })
  }
  return (
    show ? <animated.svg
      width={291}
      height={351}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="draggable"
    >
      <rect
        x={2}
        y={2}
        width={287}
        height={347}
        rx={13}
        fill="#FDFDFD"
        stroke={color[0]}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <path
        d="M145.171 103C122.551 103 104 84.644 104 62c0-18.47 12.228-34.087 29.011-39.217v5.688c-13.449 4.973-23.209 17.923-23.209 33.114v1.69c.171 19.375 16.06 34.463 35.411 34.6.832.016 1.657-.009 2.475-.07V37.827l.853-.854 20.905 12.215V75.24l-11.263 6.235v-5.552l5.12-3.502.341-19.39-9.557-5.979V102.02c-2.872.641-5.857.98-8.916.98z"
        fill="#fff"
      />
      <path
        d="M145 21c22.686 0 41.094 18.46 41 41.17.075 18.038-11.727 33.372-27.988 38.763v-5.58c13.097-5.424 22.455-17.211 22.635-32.078l.001-1.38c-.013-19.48-15.963-35.6-35.423-35.6-.576 0-1.149.015-1.718.042v60.86l-1.024.599-20.65-12.386V48.846l11.178-5.894v6.577l-4.693 3.16v19.22l9.301 5.808V21.664A41.178 41.178 0 01145 21z"
        fill="#fff"
      />
      <path
        d="M145.171 103C122.551 103 104 84.644 104 62c0-18.47 12.228-34.087 29.011-39.217v5.688c-13.449 4.973-23.209 17.923-23.209 33.114v1.69c.171 19.375 16.06 34.463 35.411 34.6.832.016 1.657-.009 2.475-.07V37.827l.853-.854 20.905 12.215V75.24l-11.263 6.235v-5.552l5.12-3.502.341-19.39-9.557-5.979V102.02c-2.872.641-5.857.98-8.916.98z"
        stroke={color[0]}
      />
      <path
        d="M145 21c22.686 0 41.094 18.46 41 41.17.075 18.038-11.727 33.372-27.988 38.763v-5.58c13.097-5.424 22.455-17.211 22.635-32.078l.001-1.38c-.013-19.48-15.963-35.6-35.423-35.6-.576 0-1.149.015-1.718.042v60.86l-1.024.599-20.65-12.386V48.846l11.178-5.894v6.577l-4.693 3.16v19.22l9.301 5.808V21.664A41.178 41.178 0 01145 21z"
        stroke={color[0]}
      />
      {/* <rect
        x={26.5}
        y={133.5}
        width={237}
        height={39}
        rx={19.5}
        stroke={color[0]}
      /> */}
      <rect
        x={61.5}
        y={264.5}
        width={168}
        height={35}
        rx={17.5}
        fill={color[0]}
        stroke={color[0]}
      />
      <rect
        x={26.5}
        y={184.5}
        width={237}
        height={39}
        rx={19.5}
        stroke={color[0]}
      />
      <foreignObject x="25.8908" y="153.228" width="238" height="40">
        <div style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

        }}>
        <p style={{
          fontFamily:"Arial",
          fontSize:17,
          fontWeight:600,
          textAlign:"center"
        }}>
          TOTP CODE
        </p>
        </div>
      </foreignObject>
      <foreignObject x="25.8908" y="262.228" width="238" height="40">
        <div
          onClick={LoginAction}
          style={{
            height: "100%",
            width: "70%",
            margin: "0px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            borderRadius: 20
          }}>
          <BtnAction>
            {color[2].toString()}
          </BtnAction>
        </div>
      </foreignObject>
      <foreignObject x="25.8908" y="184.228" width="238" height="40">
        <div style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <input type="password" placeholder="XXXXXX" maxLength={6} style={{
            height: "96%",
            padding: "unset",
            border: "unset",
            width: "96%",
            borderRadius: 20,
            textAlign: "center",
            fontFamily: "Archivo",
            fontSize: 19,
            color: color[1]
          }} onChange={(ev) => setUserPass(ev.target.value)} onKeyUp={(event) => {
            if (event.keyCode === 13) {
              LoginAction()
            }
          }} />
        </div>
      </foreignObject>
    </animated.svg> :
      <animated.svg
        width={291}
        height={351}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="draggable"
      >
        <rect
          x={2}
          y={2}
          width={287}
          height={347}
          rx={13}
          fill="#FDFDFD"
          stroke={color[0]}
          strokeWidth={3}
          strokeLinejoin="round"
        />
        {!showqrcode && <path
          d="M145.171 103C122.551 103 104 84.644 104 62c0-18.47 12.228-34.087 29.011-39.217v5.688c-13.449 4.973-23.209 17.923-23.209 33.114v1.69c.171 19.375 16.06 34.463 35.411 34.6.832.016 1.657-.009 2.475-.07V37.827l.853-.854 20.905 12.215V75.24l-11.263 6.235v-5.552l5.12-3.502.341-19.39-9.557-5.979V102.02c-2.872.641-5.857.98-8.916.98z"
          fill="#fff"
        />}
        {!showqrcode && <path
          d="M145 21c22.686 0 41.094 18.46 41 41.17.075 18.038-11.727 33.372-27.988 38.763v-5.58c13.097-5.424 22.455-17.211 22.635-32.078l.001-1.38c-.013-19.48-15.963-35.6-35.423-35.6-.576 0-1.149.015-1.718.042v60.86l-1.024.599-20.65-12.386V48.846l11.178-5.894v6.577l-4.693 3.16v19.22l9.301 5.808V21.664A41.178 41.178 0 01145 21z"
          fill="#fff"
        />}
        {!showqrcode && <path
          d="M145.171 103C122.551 103 104 84.644 104 62c0-18.47 12.228-34.087 29.011-39.217v5.688c-13.449 4.973-23.209 17.923-23.209 33.114v1.69c.171 19.375 16.06 34.463 35.411 34.6.832.016 1.657-.009 2.475-.07V37.827l.853-.854 20.905 12.215V75.24l-11.263 6.235v-5.552l5.12-3.502.341-19.39-9.557-5.979V102.02c-2.872.641-5.857.98-8.916.98z"
          stroke={color[0]}
        />}
        {!showqrcode && <path
          d="M145 21c22.686 0 41.094 18.46 41 41.17.075 18.038-11.727 33.372-27.988 38.763v-5.58c13.097-5.424 22.455-17.211 22.635-32.078l.001-1.38c-.013-19.48-15.963-35.6-35.423-35.6-.576 0-1.149.015-1.718.042v60.86l-1.024.599-20.65-12.386V48.846l11.178-5.894v6.577l-4.693 3.16v19.22l9.301 5.808V21.664A41.178 41.178 0 01145 21z"
          stroke={color[0]}
        />}
        {showqrcode && <AnimatedRect
          x={61.5}
          y={63.5}
          width={168}
          height={35}
          rx={17.5}
          fill={color[0]}
          stroke={color[0]}
        />}
        {showqrcode && <foreignObject x="25.8908" y="60.228" width="238" height="40">
          <div
            onClick={()=>{
              setshow(true)
              setshowqrcode(false)
            }}
            style={{
              height: "100%",
              width: "70%",
              margin: "0px auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: 20
            }}>
            <BtnAction>
              {"Go Back"}
            </BtnAction>
          </div>
        </foreignObject>}
        {showqrcode && <foreignObject style={{ borderRadius: 20 }} x="41.8908" y="117.228" width="208" height="208">
          <QRCode
            value={QrUrl}
            size={208}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
            renderAs={"canvas"}
            imageSettings={{
              src: Icon,
              x: null,
              y: null,
              height: 40,
              width: 40,
              excavate: true,
            }} />
        </foreignObject>}

        {!showqrcode && <foreignObject style={{ borderRadius: 20 }} x="25.8908" y="184.228" width="238" height="30">
          <div style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

          }}>
            <input placeholder="xxxxxxxxxxxxxxxxxxxxx" style={{
              height: "96%",
              padding: "unset",
              border: "unset",
              width: "96%",
              borderRadius: 20,
              textAlign: "center",
              fontFamily: "Archivo",
              fontSize: 14,
              color: color[1]
            }} onChange={(ev) => setkey(ev.target.value)} />
          </div>
        </foreignObject>}
        {!showqrcode && <AnimatedRect
          x={61.5}
          y={264.5}
          width={168}
          height={35}
          rx={17.5}
          fill={color[0]}
          stroke={color[0]}
        />}
        {!showqrcode && <rect
          x={16.5}
          y={184.5}
          width={257}
          height={29}
          rx={13.5}
          stroke={color[0]}
        />}
        {!showqrcode && <foreignObject x="25.8908" y="262.228" width="238" height="40">
          <div
            onClick={keylog}
            style={{
              height: "100%",
              width: "70%",
              margin: "0px auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: 20
            }}>
            <BtnAction>
              {color[2].toString()}
            </BtnAction>
          </div>
        </foreignObject>}

      </animated.svg>
  )
}
const BtnAction = styled.p`
    font-family:Arial;
    font-size:19px;
    color:white;
    margin-bottom:unset !important;
`;
const AnimatedRect = styled.rect`
    transition: all;
     transition-timing-function: ease-in-out;
     cursor:pointer;
    :hover{
     transform:scale(1.01);
    }
    :active{
      transform:scale(9.91);
    }
`;
const Login_ = React.memo(Login)
export default Login_;
