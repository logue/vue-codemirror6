/**
 * h-demi - h function for Vue 2 and 3
 *
 * @see {@link https://github.com/vueuse/vue-demi/issues/65}
 */

import {
  type Component,
  h as hDemi,
  isVue2,
  type VNode,
  type VNodeProps,
} from 'vue-demi';

type Options = VNodeProps & {
  class?: string;
  domProps?: VNodeProps;
  on?: Record<string, () => void>;
  props?: VNodeProps;
  style?: string;
  'aria-hidden'?: string;
};

const adaptOnsV3 = (
  ons: Record<string, () => void>,
): Record<string, () => void> => {
  if (!ons) return {};
  return Object.entries(ons).reduce((ret, [key, handler]) => {
    key = key.charAt(0).toUpperCase() + key.slice(1);
    key = `on${key}`;
    return { ...ret, [key]: handler };
  }, {});
};

/**
 * Cross-version `h` (hyperscript) function that normalizes Vue 2 style
 * options (`props`, `domProps`, `on`) into Vue 3's flat VNode data object.
 *
 * @param type - Element tag name or component.
 * @param options - VNode options, accepting both Vue 2 and Vue 3 shapes.
 * @param children - Child VNode(s).
 * @returns Created VNode.
 */
export default function h(
  type: string | Component,
  options: Options = {},
  children?: VNode | VNode[],
): VNode {
  if (isVue2) {
    // Makeshift support :(
    // Since Vue2.7 includes the Composition API, the functions in vue-demi are not used.
    return hDemi(type, options, children);
  }
  const { props, domProps, on, ...extraOptions } = options;
  const ons = on ? adaptOnsV3(on) : {};

  return hDemi(
    type,
    { ...extraOptions, ...props, ...domProps, ...ons },
    children,
  );
}

/**
 * Normalize a default slot into a VNode array, invoking it if it is a function.
 *
 * @param defaultSlots - Default slot content or slot function.
 * @returns Resolved VNode array.
 */
export const slot = (
  defaultSlots: (() => VNode[]) | VNode[] | undefined,
): VNode[] =>
  typeof defaultSlots === 'function' ? defaultSlots() : (defaultSlots ?? []);
