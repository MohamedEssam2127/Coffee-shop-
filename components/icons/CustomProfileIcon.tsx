import * as React from 'react';
import Svg, { Path, Circle, type SvgProps } from 'react-native-svg';
import { iconWithClassName } from './iconWithClassName';

function ProfileSvg({
  size = 24,
  color = 'currentColor',
  focused = false,
  ...props
}: SvgProps & { size?: number; color?: string; focused?: boolean }) {
  if (focused) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
        <Circle cx="12" cy="7.5" r="4.5" fill={color} />
        <Path 
          d="M4 19.5C4 16.4624 6.46243 14 9.5 14H14.5C17.5376 14 20 16.4624 20 19.5V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V19.5Z" 
          fill={color} 
        />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx="12" cy="7.5" r="4" stroke={color} strokeWidth="2" />
      <Path 
        d="M4.5 20C4.5 16.9624 6.96243 14.5 10 14.5H14C17.0376 14.5 19.5 16.9624 19.5 20" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
    </Svg>
  );
}

iconWithClassName(ProfileSvg);

export { ProfileSvg as CustomProfileIcon };
