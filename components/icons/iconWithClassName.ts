import { cssInterop } from 'nativewind';
import type { LucideIcon } from 'lucide-react-native';

export function iconWithClassName(icon: LucideIcon | React.ComponentType<any>) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}