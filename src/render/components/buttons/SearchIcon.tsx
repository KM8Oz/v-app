import * as React from "react";
import styled from "styled-components";
function SearchIcon(props: React.SVGProps<SVGSVGElement>&{ref?:any}) {
  return (
    <CustomSvg
      viewBox="0 0 25 24"
      {...props}
    >
      <path
        d="M11.682 19c4.48 0 8.11-3.582 8.11-8s-3.63-8-8.11-8c-4.479 0-8.11 3.582-8.11 8s3.631 8 8.11 8zM21.82 21l-4.41-4.35"
        stroke="#4C7A6C"
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
export default SearchIcon;