import * as React from "react";

function Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={17}
      height={17}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.5 15.583a7.083 7.083 0 100-14.166 7.083 7.083 0 000 14.166zM10.625 6.375l-4.25 4.25M6.375 6.375l4.25 4.25"
        stroke="#F45C5C"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Icon;