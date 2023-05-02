import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
export const ArrowLeft = (props: SvgProps) => (
  <Svg
    width={16 * 1.5}
    height={14 * 1.5}
    viewBox="0 0 16 14"
    fill="none"
    style={{position: 'absolute', zIndex: 100, top: 75, left: 16}}
    {...props}>
    <Path
      d="M15.344 7a.469.469 0 0 1-.469.469H2.257l4.824 4.825a.47.47 0 1 1-.662.662L.794 7.331a.469.469 0 0 1 0-.662l5.625-5.625a.469.469 0 0 1 .662.662L2.257 6.531h12.618a.469.469 0 0 1 .469.469Z"
      fill="#555"
    />
  </Svg>
);
