import * as React from 'react';
import Svg, { Path, Rect, type SvgProps } from 'react-native-svg';
import { iconWithClassName } from './iconWithClassName';

function HistorySvg({
  size = 24,
  color = 'currentColor',
  focused = false,
  ...props
}: SvgProps & { size?: number; color?: string; focused?: boolean }) {
  if (focused) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
        <Path 
          d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2H6Z" 
          fill={color} 
        />
        <Path d="M8 7H16M8 11H16M8 15H12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Rect x="4" y="2" width="16" height="20" rx="2" stroke={color} strokeWidth="2" />
      <Path d="M8 7H16M8 11H16M8 15H12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

iconWithClassName(HistorySvg);

export { HistorySvg as CustomHistoryIcon };
