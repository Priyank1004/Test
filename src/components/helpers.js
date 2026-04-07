import { useEffect, useRef, useState } from "react";

export const lerp  = (a,b,t) => a+(b-a)*t;
export const clamp = (v,lo,hi) => Math.max(lo,Math.min(hi,v));
export const ease  = (t) => t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;

export function useInView(threshold=0.25) {
  const ref = useRef(null);
  const [visible,setVisible] = useState(false);
  useEffect(()=>{
    const obs = new IntersectionObserver(
      ([e])=>{ if(e.isIntersecting) setVisible(true); },
      {threshold}
    );
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[threshold]);
  return [ref,visible];
}
