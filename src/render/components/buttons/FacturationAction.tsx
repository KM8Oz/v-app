import * as React from "react";
import { animated } from "react-spring";

function FacturaionAction(props:any | React.SVGProps<SVGSVGElement>) {
  return (
    <animated.svg
      width={147}
      height={30}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#prefix__filter0_i)">
        <rect width={147} height={30} rx={15} fill="#4C7A6C" />
      </g>
      <defs>
        <filter
          id="prefix__filter0_i"
          x={0}
          y={0}
          width={147}
          height={30}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={0.5} />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect1_innerShadow" />
        </filter>
      </defs>
    </animated.svg>
  );
}

export default FacturaionAction;