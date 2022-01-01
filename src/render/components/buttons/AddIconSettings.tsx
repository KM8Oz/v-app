import * as React from "react";

function AddIconSettings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={33}
      height={32}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#prefix__filter0_d_323_193)">
        <rect
          x={2.5}
          y={2.5}
          width={28}
          height={27}
          rx={13.5}
          fill="#F1F4F2"
          stroke="#E5E5E5"
        />
        <g
          filter="url(#prefix__filter1_i_323_193)"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 9v14M10 16h14" />
        </g>
      </g>
      <defs>
        <filter
          id="prefix__filter0_d_323_193"
          x={0}
          y={0}
          width={33}
          height={32}
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
          <feGaussianBlur stdDeviation={1} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            mode="screen"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_323_193"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_323_193"
            result="shape"
          />
        </filter>
        <filter
          id="prefix__filter1_i_323_193"
          x={5}
          y={4}
          width={24}
          height={28}
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
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect1_innerShadow_323_193" />
        </filter>
      </defs>
    </svg>
  );
}

export default AddIconSettings;