/**
 * 汉设计系统 - 主入口
 * 导出组件、样式、令牌、组合式函数与工具
 */

// 样式（副作用）
import './styles/main.css';

// 组件
export {
  // 基础
  Button,
  ButtonSeal,
  Input,
  Tag,
  Avatar,
  // 布局
  Navbar,
  NavbarItem,
  Container,
  Footer,
  Row,
  Col,
  // 数据展示
  ScrollCard,
  Seal,
  CloudPattern,
  InkDivider,
  Signature,
  // 反馈
  Toast,
  Tooltip,
  Modal,
  useToast,
  // 导航
  Pagination,
  Menu,
} from './components';

// 设计令牌
export {
  tokens,
  colors,
  typography,
  spacing,
  layout,
  radius,
  shadows,
  motion,
  zIndex,
} from './tokens';

// 组合式函数
export {
  useTheme,
  useInkSpread,
  useSealDrop,
  useScrollReveal,
} from './composables';

// 工具函数
export { cn, hexToRgb, rgbToHex, hexToRgba, lighten, darken } from './utils';

// 图标
export {
  Cloud as CloudIcon,
  Fan as FanIcon,
  Seal as SealIcon,
  Mountain as MountainIcon,
  Bamboo as BambooIcon,
  Plum as PlumIcon,
  Orchid as OrchidIcon,
  Chrysanthemum as ChrysanthemumIcon,
} from './icons';

// 类型
export type { DesignTokens } from './tokens';
export type { ClassValue } from './utils';

// Vue 插件安装
import type { App } from 'vue';
import * as components from './components';

export const HanDesign = {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      if (component && typeof component === 'object') {
        app.component(`Han${name}`, component as any);
      }
    });
  },
};

export default HanDesign;
