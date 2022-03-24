import * as React from "react";

function Logo({size, ...props}: React.SVGProps<SVGSVGElement>&{size?:number}) {
  return (
    <svg
      width={size || 50}
      height={size || 50}
      viewBox="0 0 50 50"
      fill="#fff"
      {...props}
    >
      <path
        d="M25.104 50C11.311 50 0 38.807 0 25 0 13.738 7.456 4.215 17.69 1.087v3.469C9.489 7.588 3.538 15.484 3.538 24.746v1.031c.104 11.814 9.792 21.014 21.592 21.098.507.01 1.01-.005 1.509-.042V10.26l.52-.52 12.747 7.447v15.886l-6.868 3.802V33.49l3.122-2.136.208-11.823-5.827-3.646V49.402a24.922 24.922 0 01-5.437.598z"
        fill="#fff"
      />
      <path
        d="M25 0c13.833 0 25.057 11.256 25 25.104.046 10.998-7.15 20.348-17.066 23.636v-3.403c7.986-3.307 13.692-10.494 13.802-19.56v-.841C46.73 13.057 37.004 3.229 25.138 3.229c-.351 0-.7.009-1.048.025v37.11l-.624.365-12.591-7.552V16.98l6.816-3.594v4.01l-2.862 1.928v11.719l5.671 3.541V.405A25.11 25.11 0 0125 0z"
        fill="#fff"
      />
    </svg>
  );
}

export default Logo;