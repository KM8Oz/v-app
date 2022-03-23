import React, { useState } from "react";
import { animated, config, useSpring, AnimatedProps } from "react-spring";

function XlsxIcon({size,...props}: AnimatedProps<any>&{size?:number}) {
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
      <path fill="url(#prefix__pattern0)" d="M0 0h24v24H0z" />
      <defs>
        <pattern
          id="prefix__pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use xlinkHref="#prefix__image0_504_27" transform="scale(.01111)" />
        </pattern>
        <image
          id="prefix__image0_504_27"
          width={90}
          height={90}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAAEzElEQVR4nO2d2YscRRjAfzMem3hG8Nho0ARRooj4oEG8CDEIHqD4EBSPCD4tHkFfIj7FPyCK7/EAFQ8kiEbFRVCUKGvQVdSgKBKzIFFMJNl4rDHGh28Gq2t7Zrqnqr+a7v1+0OxU1XR/3b+Z+bqqenoWDMMwDMMw6sQiYAMwBRwEjiRc5oDtwKpKjzgBy4AvSCs3b/kTuK7C41ZlEaMpuXGyN5Be5oKQPUV6kQtC9izpJbrL733aai07tVh/uYr+L/5fwE2VmKiY1GL9BRoqO7XYPNHQQNmpxfYSDQ2TnVpsP9HQINmpxQ4SDQ2RnVpsEdHQANmpxRYVDTWXnVpsGdFQY9mpxZYVDTWVnVrsMKKhhrJTix1WNNRMdmqxIaKhRrJTiw0VDTWRnVpsDNEAqxk8xZr0GmRqsf5yZsCxDJK9PWDbwaQW6y8bA4+nn+y5wG0HkVpsnoyNVPfOHppWyMqhwWvI0L7aMffC6I2JVsJEK2GilTDRSphoJUy0EiZaCROthIlWwkQrcbRSnElgv1O+CLjAKe8Cdjjl05DJnS5fAt845RXApSXizwAfdP62gHOAK4CzS2wjKUVn1e7z1rvFa3/Ia9/ktT/itd9bMO6PwM3kTwa1ga0ljiHpBFrRHZzy1juO7FTkhU5bC/jBW38Y0d8BZwzY/09KHEOQaK0cvQpY6ZT/AN7pPJ4Bdjptq5HUEMqdwM992o9CUpgKmifDu7zya52/k179PRFifUj2U9QCHgW+Ar4HtiE3Oi2OEEuFMh+7XWRf2NOBw8DtTt2J5N8QWjZ1bPKef1vJfa1t6gA501/jlH8BPgPec+rWAcdHiLXHK58fYZtBaPej7/bKj5OVEiNtgHQPXd4A/om07SSU/ejtR3oceZwH/NtjvbKpw8/7ADcA+4bY59qlDoCTkD50HusJv1jcZS1wiVf3FtKNfD1SjFKkGIL7vQ+Q/fDTSggt4EVgiVe/B3mhHwYORYw3kBSiT8ipWwKMR46zEunGLfXqjwBPABOR4/Ulhejnc+r2ISes2FyJ9GzW5LQ9hbzrVdAWPQe80qNtS0Uxx4F3gc3IaNBlc0Ux56Etehvwm1O+zHk8CeyuKG4LyctPevWfAr9WFDODtujnnMcrkGFwl8PAMxXHn2D+OWKm4piArui9wNtO+Vqkb+vOiT+NCK+KNvKrOS4xRqKFAmvxMvC3U14DnIJ8477LbvIHG2XZCxzIqX+JbKo4GVgeId5AtK6wQDZttJFBBcCtwPtO2xbg+gHb2sH80SLAY8AY8CqSk9cC5yKTVdPIOcJlHXBsgX1PTtGh67feepc7bT+R7Q0cgwws+g3Be3Gg8/wHCzx3vBO7UUNwv+98o/N4KXC1Uz4EPBsY7+sB7cuR84U/mKkMrdTxJpKPu/h3Od2B/Kxbl61kb5NY7K3fi+5cyXpktm6a/3N1G7gYmf+eQNKJGgvhG/+ziOxTkfwdwtC+FoLomNitFaOOiVbCRCthopUw0UqYaCVMtBImWgkTrYSJVsJEK2GilQgVfTDKXtSDvEtjhQkVvXPwUxpD0LGGin4hcP06kfRYx4DPifNt+lFephmBi7jLaLbsaeCsaLYCGQMeAD5m9P43yzDLLPARcD8j8E42DMMwDMMozn+2ud8GX8+yCQAAAABJRU5ErkJggg=="
        />
      </defs>
    </animated.svg>
  );
}

export default XlsxIcon;