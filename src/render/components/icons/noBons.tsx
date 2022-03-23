import * as React from "react"
// import Svg, { SvgProps, Defs, G, path, ellipse } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

import { Ref, forwardRef } from "react"
interface SvgProps{

}
const NoBons = (props: SvgProps) => (
  <svg
    width={347}
    height={328}
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path
        fill="#F2F2F2"
        fillRule="nonzero"
        d="M144.831 73.163c-36.375 16.752-102.71 53.897-69.849 106.58 32.862 52.682 75.233 106.06 110.81 82.382 35.578-23.677 109.875-75.904 94.784-114.566-15.09-38.662-99.37-91.149-135.745-74.396z"
      />
      <path
        fill="#D2D8DF"
        fillRule="nonzero"
        d="M10.058 150.729c0-1.032.563-1.867 1.257-1.867.695 0 1.257.835 1.257 1.867v3.835c0 1.03-.562 1.867-1.257 1.867-.694 0-1.257-.836-1.257-1.867v-3.835zm-7.06 2.265a1.68 1.68 0 0 1 .035-2.393 1.721 1.721 0 0 1 2.416.035l2.869 2.924a1.68 1.68 0 0 1-.035 2.392 1.721 1.721 0 0 1-2.417-.034l-2.868-2.924zm-1.273 9.744c-.953 0-1.725-.564-1.725-1.261s.772-1.262 1.725-1.262h4.094c.952 0 1.724.565 1.724 1.262 0 .697-.772 1.261-1.724 1.261H1.725zm3.724 7.057a1.72 1.72 0 0 1-2.416.034 1.68 1.68 0 0 1-.035-2.392l2.868-2.924a1.721 1.721 0 0 1 2.417-.035 1.68 1.68 0 0 1 .035 2.393l-2.869 2.924zm7.123-.093c0 1.031-.562 1.867-1.257 1.867-.694 0-1.257-.836-1.257-1.867v-3.835c0-1.031.563-1.867 1.257-1.867.695 0 1.257.836 1.257 1.867v3.835zm8.255-3.852a1.877 1.877 0 0 1 0 2.648 1.861 1.861 0 0 1-2.639 0l-2.555-2.564a1.877 1.877 0 0 1 0-2.647 1.861 1.861 0 0 1 2.639 0l2.555 2.563zm2.457-5.635c1.028 0 1.86.565 1.86 1.262 0 .697-.832 1.261-1.86 1.261h-3.822c-1.027 0-1.86-.564-1.86-1.261s.833-1.262 1.86-1.262h3.822zm-3.838-8.282a1.861 1.861 0 0 1 2.638 0 1.877 1.877 0 0 1 0 2.647l-2.555 2.564a1.861 1.861 0 0 1-2.638 0 1.877 1.877 0 0 1 0-2.647l2.555-2.564zM194.873 1.873c0-1.035.563-1.873 1.257-1.873.695 0 1.258.838 1.258 1.872v2.564c0 1.034-.563 1.872-1.258 1.872-.694 0-1.257-.838-1.257-1.872V1.872zm-6.935 8.22c-1.03 0-1.866-.566-1.866-1.262 0-.697.836-1.262 1.866-1.262h2.555c1.03 0 1.866.565 1.866 1.262 0 .696-.836 1.261-1.866 1.261h-2.555zm9.45 5.696c0 1.034-.563 1.873-1.258 1.873-.694 0-1.257-.839-1.257-1.873v-2.563c0-1.034.563-1.872 1.257-1.872.695 0 1.258.838 1.258 1.872v2.563zm4.42-8.22c1.03 0 1.866.565 1.866 1.262 0 .696-.835 1.261-1.866 1.261h-2.555c-1.03 0-1.865-.565-1.865-1.261 0-.697.835-1.262 1.865-1.262h2.555zM62.862 97.744c0-1.031.563-1.867 1.258-1.867.694 0 1.257.836 1.257 1.867v3.835c0 1.031-.563 1.867-1.257 1.867-.695 0-1.258-.836-1.258-1.867v-3.835zm-9.454 10.748c-1.028 0-1.86-.565-1.86-1.261 0-.697.832-1.262 1.86-1.262h3.822c1.028 0 1.86.565 1.86 1.262 0 .696-.832 1.261-1.86 1.261h-3.822zm11.969 9.487c0 1.031-.563 1.867-1.257 1.867-.695 0-1.258-.836-1.258-1.867v-3.835c0-1.031.563-1.867 1.258-1.867.694 0 1.257.836 1.257 1.867v3.835zm6.94-12.01c1.027 0 1.86.565 1.86 1.262 0 .696-.833 1.261-1.86 1.261h-3.822c-1.028 0-1.86-.565-1.86-1.261 0-.697.832-1.262 1.86-1.262h3.822zm235.08 117.04a1.748 1.748 0 0 1-1.745-1.751c0-.967.781-1.75 1.745-1.75 3.818 0 6.915 3.107 6.915 6.938 0 3.832-3.096 6.939-6.915 6.939-3.82 0-6.915-3.107-6.915-6.939 0-.967.781-1.75 1.745-1.75.963 0 1.744.783 1.744 1.75a3.432 3.432 0 0 0 3.426 3.438 3.432 3.432 0 0 0 3.425-3.438 3.432 3.432 0 0 0-3.425-3.438zm23.259-45.762c2.83-.898 7.168-4.416 8.172-8.2.91 3.345 4.728 7.302 8.172 7.602-3.877 1.395-7.584 5.54-8.172 8.797-.4-3.32-5.527-7.716-8.172-8.2zM31.43 220.138c1.525-.483 3.86-2.377 4.4-4.415.49 1.8 2.546 3.932 4.4 4.094-2.087.75-4.082 2.983-4.4 4.737-.215-1.788-2.976-4.156-4.4-4.416zM57.833 61.815a3.778 3.778 0 0 1-3.771 3.785 3.777 3.777 0 0 1-3.772-3.785 3.778 3.778 0 0 1 3.772-3.784 3.778 3.778 0 0 1 3.771 3.784zm255.221 10.723c0 3.833-3.096 6.939-6.914 6.939-3.82 0-6.915-3.106-6.915-6.939 0-3.832 3.095-6.938 6.915-6.938 3.818 0 6.914 3.106 6.914 6.938zm-182.3 218.877c0 2.787-2.252 5.047-5.03 5.047-2.777 0-5.028-2.26-5.028-5.047 0-2.786 2.25-5.046 5.028-5.046 2.778 0 5.03 2.26 5.03 5.046zm-3.445 0c0-.879-.71-1.59-1.585-1.59s-1.584.711-1.584 1.59c0 .88.71 1.592 1.584 1.592.876 0 1.585-.713 1.585-1.592zm.93-253.569c0 2.787-2.251 5.046-5.029 5.046-2.777 0-5.029-2.259-5.029-5.046 0-2.787 2.252-5.046 5.03-5.046 2.777 0 5.028 2.26 5.028 5.046zm-3.05 0a1.983 1.983 0 0 0-1.979-1.986c-1.093 0-1.979.89-1.979 1.986 0 1.098.886 1.987 1.98 1.987 1.092 0 1.978-.89 1.978-1.987zM216.7 323.53c-1.358-3.582.435-7.59 4.003-8.95 3.568-1.363 7.562.435 8.919 4.015 1.359 3.58-.434 7.588-4.002 8.95-3.568 1.363-7.562-.435-8.92-4.015zm9.56-3.652a3.312 3.312 0 0 0-4.278-1.926 3.332 3.332 0 0 0-1.92 4.295 3.314 3.314 0 0 0 4.279 1.927 3.332 3.332 0 0 0 1.92-4.296z"
      />
      {/* <path
        stroke="#3E3D3F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={7.056}
        d="M143.304 122.913V92.034c0-16.734 13.57-30.302 30.31-30.302s30.313 13.568 30.313 30.302v30.879"
      /> */}
      <path fill="#E0E5EC" d="M122.541 162.74h102.975V97.153H122.541z" />
      <path
        fill="#CFD4DC"
        d="M122.542 97.153v99.626h-16.61v-60.244l8.307-12.743zm102.145 0v99.626h16.61v-60.244l-8.307-12.743z"
      />
      <path
        fill="#D25D27"
        d="m235.877 146.393-8.743 22.012-41.475-8.449 8.744-22.014z"
      />
      <path
        fill="#1B3554"
        d="M17.755 177.73h102.976v9.962H17.755z"
        // filter="url(#a)"
        transform="translate(104.372 60.695)"
      />
      <path
        fill="#FFF"
        d="M105.63 136.387h135.363v110a7.06 7.06 0 0 1-7.062 7.06H112.69a7.062 7.062 0 0 1-7.062-7.06v-110z"
      />
      <path
        d="M200.511 189.832c-1.442.624-2.864.937-4.265.937-1.373 0-2.745-.3-4.117-.897a3.41 3.41 0 0 1-2.047-3.127 1.176 1.176 0 0 1 1.68-1.062c1.493.708 2.998 1.062 4.515 1.062 1.524 0 3.049-.357 4.573-1.073a1.185 1.185 0 0 1 1.688 1.073 3.364 3.364 0 0 1-2.027 3.087zm-42.352 0c-1.442.624-2.864.937-4.266.937-1.372 0-2.744-.3-4.116-.897a3.41 3.41 0 0 1-2.048-3.127 1.176 1.176 0 0 1 1.68-1.062c1.493.708 2.998 1.062 4.515 1.062 1.524 0 3.049-.357 4.573-1.073a1.185 1.185 0 0 1 1.689 1.073 3.364 3.364 0 0 1-2.027 3.087zm24.143 24.335c-2.077.883-4.124 1.324-6.141 1.324-1.978 0-3.956-.424-5.934-1.272a4.581 4.581 0 0 1-2.776-4.21 1.627 1.627 0 0 1 2.31-1.478c2.131.985 4.28 1.477 6.444 1.477 2.175 0 4.35-.497 6.526-1.491a1.64 1.64 0 0 1 2.322 1.491 4.52 4.52 0 0 1-2.751 4.16z"
        fill="#3E3D3F"
        opacity={0.5}
      />
      {/* <g transform="translate(138.857 92.307)">
        <ellipse
          cx={5.041}
          cy={61.436}
          fill="#1B3554"
          opacity={0.149}
          rx={4.983}
          ry={4.981}
        />
        <ellipse
          cx={65.664}
          cy={61.436}
          fill="#1B3554"
          opacity={0.149}
          rx={4.983}
          ry={4.981}
        />
        <path
          stroke="#3E3D3F"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={7.056}
          d="M5.04 61.18V30.303C5.04 13.567 18.613 0 35.353 0s30.312 13.567 30.312 30.303V61.18"
        />
      </g> */}
    </g>
  </svg>
)

export default NoBons
