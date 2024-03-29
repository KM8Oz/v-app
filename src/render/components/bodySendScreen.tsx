import * as React from "react"

function BodySendScreen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={139}
      height={417}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#prefix__filter0_d)">
        <path
          d="M136.5 6a4 4 0 00-4-4h-18.624c-.477 0-.942.148-1.331.425-20.12 14.293-47.08 14.293-67.2 0A2.298 2.298 0 0044.015 2H6a4 4 0 00-4 4v405a4 4 0 004 4h37.991c.488 0 .96-.174 1.332-.491 19.373-16.515 47.872-16.515 67.244 0 .372.317.844.491 1.332.491H132.5a4 4 0 004-4V6z"
          fill="#FDFDFD"
        />
      </g>
      <path stroke="#EFE9E9" strokeWidth={2} d="M117 21v375" />
      <foreignObject width="100" height="50" x="20" y="50">
            <div className="facture_number">
                <p>Nº de facture:</p>
                  <input value={null} placeholder="numero de facture" />
              </div> 
      </foreignObject>
      <defs>
        <filter
          id="prefix__filter0_d"
          x={0}
          y={0}
          width={138.5}
          height={417}
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
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.228083 0 0 0 0 0.991667 0 0 0 0 0.0371875 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

export default BodySendScreen
