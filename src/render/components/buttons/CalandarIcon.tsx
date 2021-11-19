import * as React from "react";
import styled from "styled-components";

function CalandarIcon(props: React.SVGProps<SVGSVGElement>&{ref?:any}) {
  return (
    <CustomSvg
      viewBox="0 0 26 24"
    //   xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.979 4H5.784c-1.12 0-2.027.895-2.027 2v14c0 1.105.907 2 2.027 2H19.98c1.12 0 2.027-.895 2.027-2V6c0-1.105-.908-2-2.027-2zM16.937 2v4M8.826 2v4M3.758 10h18.248"
        stroke="#6C6C6C"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </CustomSvg>
  );
}
const CustomSvg = styled.svg`
  width: 1.5em;
  height: 1.5em;
  fill:none;
  cursor: pointer;
  &:hover{
      transform: scale(1.01);
  }
  &:active{
      transform: scale(.99);
  }
`;
export default CalandarIcon;