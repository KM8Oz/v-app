import * as React from "react";

function ArrowRight({direction,...props}: any&{direction:boolean}) {
  return (
    <svg
      style={{
        cursor: "pointer",
        gridArea:"direction"
      }}
      width={26}
      height={12}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {!direction && <path
        d="M.226 6L6 11.774 11.774 6 6 .226.226 6zM26 5H6v2h20V5z"
        fill="#000"
      />}
        {direction && <path
        d="M25.773 6L20 .226 14.226 6 20 11.774 25.773 6zM0 7h20V5H0v2z"
        fill="#000"
      />}
    </svg>
  );
}

export default ArrowRight;