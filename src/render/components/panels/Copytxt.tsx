import React, { useState } from "react";
import { animated, config, useSpring, AnimatedProps } from "react-spring";

function Copytxt({size,...props}: AnimatedProps<any>&{size?:number}) {
    const [status, setstatus] = useState(false)
    const style = useSpring({
        transform: `scale(${status ? 1 : 0.8})`,
        config: config.wobbly
    })
  return (
    <animated.svg
      width={size||24}
      height={size||24}
      onMouseDown={()=>setstatus(true)}
      onMouseUp={()=>setstatus(false)}
      onMouseLeave={()=>setstatus(false)}
      viewBox="0 0 24 24"
      fill="none"
      onClick={props.onClick}
      style={{...style,...props.style}}
    >
      <path
        d="M20 9h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </animated.svg>
  );
}

export default Copytxt;