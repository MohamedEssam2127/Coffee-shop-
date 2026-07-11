import * as React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';
import { iconWithClassName } from './iconWithClassName';

function WalletSvg({
  size = 18,
  color = '#C67C4E',
  ...props
}: SvgProps & { size?: number; color?: string }) {
  return (
    <Svg width={size} height={(size * 17) / 18} viewBox="0 0 18 17" fill="none" {...props}>
      <Path
        d="M16.6991 10.2464H13.3255C12.0868 10.2457 11.0828 9.24242 11.082 8.00371C11.082 6.76501 12.0868 5.76175 13.3255 5.76099H16.6991"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.7071 7.95237H13.4474"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.12305 0.75H12.3259C14.741 0.75 16.699 2.70793 16.699 5.12305V11.1039C16.699 13.519 14.741 15.477 12.3259 15.477H5.12305C2.70792 15.477 0.75 13.519 0.75 11.1039V5.12305C0.75 2.70793 2.70792 0.75 5.12305 0.75Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.52966 4.53178H9.02879"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

iconWithClassName(WalletSvg);

export { WalletSvg as CustomWalletIcon };
