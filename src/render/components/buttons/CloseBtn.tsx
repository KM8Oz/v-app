import * as React from "react";

function CloseBtn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={10} cy={10} r={10} fill="#E65E5E" />
      <path
        d="M6.36 15l2.842-4.043-2.63-3.735H8.22l1.194 1.823c.225.347.405.638.542.872.215-.322.413-.608.593-.857l1.311-1.838h1.575l-2.688 3.662L13.64 15h-1.619l-1.596-2.417-.425-.652L7.957 15H6.36z"
        fill="#fff"
      />
    </svg>
  );
}

export default CloseBtn;