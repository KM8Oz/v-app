import * as React from "react";
import { useState } from "react";
import { animated, AnimatedProps, useSpring, config } from "react-spring";

function CheckBox({active,...props}: AnimatedProps<any>&{active?:boolean}) {
  const [animate, setAnimate] = useState(true)
  const scale = useSpring({
    transform: `scale(${animate ? 1 : 0.9})`,
    config: config.wobbly
  })
  return (
    <animated.svg
      width={24}
      height={24}
      fill="none"
      onMouseDown={() => setAnimate(false)}
              onMouseUp={() => setAnimate(true)}
              onMouseLeave={() => setAnimate(true)}
      style={{...scale, gridArea: "add",
      cursor: "pointer"}}
      {...props}
    >
      <path
        d="M22 11.08V12a10 10 0 11-5.93-9.14"
        stroke={active ? "#4C7A6C" : "#fff"}
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
    </animated.svg>
  );
}

export default CheckBox;