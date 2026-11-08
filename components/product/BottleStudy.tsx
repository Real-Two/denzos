import Image from 'next/image';
import type { CSSProperties } from 'react';

export default function BottleStudy({ name, image, accent, tint, large = false }: {
  name: string; image: string; accent: string; tint: string; large?: boolean;
}) {
  return <div className={'bottle-study' + (large ? ' bottle-study-large' : '')} style={{'--ink': tint, '--light': accent} as CSSProperties}>
    <div className="study-halo"/><div className="study-bottle"><div className="study-cap"/><div className="study-glass"><Image src={image} alt={name} fill sizes={large ? '240px' : '145px'} /></div></div>
  </div>;
}
