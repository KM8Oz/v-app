import * as React from "react"
import { useState } from "react";
import { useHistory } from 'react-router-dom';
// import { useStore } from "store";
interface _COLORS {
    NORMAL: string[];
    ERROR: string[];
}
const TEST = [{name:"dup", pass:"dup1234"}];
function Login(props: any) {
    const COLORS:_COLORS = {NORMAL:["#4C7A6C", "#6C6C6C", "Login"], ERROR:["#F45C5C", "#575757", "Try again"]};
    const history = useHistory();
    // const  { User } = useStore();
    // User.login()
     const [color, setColor] = useState(COLORS.NORMAL);
     const [userName, setUserName] = useState("");
     const [userPass, setUserPass] = useState("");
    //  console.log(history);
     
     const LoginAction = ()=>{
        //  const { path } = useRouteMatch();
         let Index = TEST.findIndex(e=>e.name = userName);
         console.log("test:", userName, userPass, Index);
          if(Index !== -1 && TEST[Index].pass === userPass){
              console.log("##### success:", history.location);
              setColor(COLORS.NORMAL);
              history.push("Home");
          } else {
              setColor(COLORS.ERROR)};
     }
  return (
    <svg
      width={291}
      height={351}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
      <rect
        x={26.5}
        y={133.5}
        width={237}
        height={39}
        rx={19.5}
        stroke={color[0]}
      />
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
      <foreignObject x="25.8908" y="133.228" width="238" height="40">
      <div style={{
          height: "100%",
          display: "flex",
          justifyContent:"center",
          alignItems:"center",
          
      }}>
            <input placeholder="Username" style={{
                 height: "96%",
                 padding: "unset",
                 border: "unset",
                 width: "96%",
                 borderRadius:20,
                 textAlign:"center",
                 fontFamily:"Archivo",
                 fontSize:19,
                 color: color[1]
            }} onChange={(ev)=>setUserName(ev.target.value)} />
          </div>
       </foreignObject>
        <foreignObject x="25.8908" y="262.228" width="238" height="40">
      <div 
       onClick={LoginAction}
      style={{
          height: "100%",
          width:"70%",
          margin: "0px auto",
          display: "flex",
          justifyContent:"center",
          alignItems:"center",
          cursor:"pointer",
          borderRadius:20
      }}>
            <p 
            style={{
                fontFamily:"Arial",
                fontSize:19,
                color:"#fff"
            }}>
                {color[2].toString()}
            </p>
          </div>
       </foreignObject>
       <foreignObject x="25.8908" y="184.228" width="238" height="40">
      <div style={{
          height: "100%",
          display: "flex",
          justifyContent:"center",
          alignItems:"center",
      }}>
            <input type="password"  placeholder="Mot de pass" style={{
                 height: "96%",
                 padding: "unset",
                 border: "unset",
                 width: "96%",
                 borderRadius:20,
                 textAlign:"center",
                 fontFamily:"Archivo",
                 fontSize:19,
                 color: color[1]
            }} onChange={(ev)=>setUserPass(ev.target.value)} onKeyUp={(event)=>{if(event.keyCode === 13){
              LoginAction()
            }}} />
          </div>
       </foreignObject>
    </svg>
  )
}

const Login_ = React.memo(Login)
export default Login_;
