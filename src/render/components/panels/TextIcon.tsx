import React, { useState } from "react";
import { animated, config, useSpring, AnimatedProps } from "react-spring";

function TextIcon({size,...props}: AnimatedProps<any>&{size?:number}) {
    const [status, setstatus] = useState(false)
    const style = useSpring({
        transform: `scale(${status ? 1 : 0.8})`,
        config: config.wobbly
    })
  return (
    <animated.svg
      width={size||24}
      height={size||24}
      onClick={props.onClick}
      onMouseDown={()=>setstatus(true)}
      onMouseUp={()=>setstatus(false)}
      onMouseLeave={()=>setstatus(false)}
      viewBox="0 0 24 24"
      fill="none"
      style={{...style,...props.style}}
    >
     <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </animated.svg>
  );
}

export default TextIcon;