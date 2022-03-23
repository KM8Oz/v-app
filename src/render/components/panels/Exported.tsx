import * as React from "react";
import { animated } from "react-spring";
import Closebtn from "../buttons/CloseBtn";
function Exported({estyle,setopen, ...props}: any | React.SVGProps<SVGSVGElement>) {
  return (
    <animated.svg
      width={664}
      height={423}
      fill="none"
      style={estyle}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
     <g filter="url(#prefix__filter0_d)" shapeRendering="crispEdges">
        <rect
          x={5}
          y={5}
          width={654}
          height={413}
          rx={23}
          fill="#C4C4C4"
          fillOpacity={0.39}
        />
        <rect
          x={5}
          y={5}
          width={654}
          height={413}
          rx={23}
          stroke="#4C7A6C"
          strokeWidth={2}
          strokeLinejoin="round"
        />
      </g>
      <circle style={{
        cursor: "pointer"
      }} 
       onClick={()=>setopen(false)}
      cx={634} cy={24} r={10} fill="#E65E5E" />
      <path
        d="M630.36 29l2.842-4.043-2.63-3.735h1.648l1.194 1.823c.225.347.405.638.542.872.215-.322.413-.608.593-.857l1.311-1.838h1.575l-2.688 3.662L637.64 29h-1.619l-1.596-2.417-.425-.652L631.957 29h-1.597z"
        fill="#fff"
      />
      <path
        d="M582 387h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-16c-1.1 0-2-.9-2-2v-12c0-1.1.9-2 2-2z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M600 389l-10 7-10-7"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="prefix__filter0_d"
          x={0}
          y={0}
          width={664}
          height={423}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </animated.svg>
  );
}

export default Exported;