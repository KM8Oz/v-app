import * as React from "react";

function CheckBox({active,...props}: React.SVGProps<SVGSVGElement>&{active?:boolean}) {
    
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22 11.08V12a10 10 0 11-5.93-9.14"
        stroke={active ? "#4C7A6C" : "#ec016f"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    {active && <path
        d="M22 4L12 14.01l-3-3"
        stroke="#4C7A6C"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />}
    </svg>
  );
}

export default CheckBox;