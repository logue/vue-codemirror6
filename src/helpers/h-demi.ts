import { h as hDemi, isVue2 } from 'vue-demi';

interface Options {
  domProps?: Record<any, any>;
  on?: Record<any, any>;
  props?: Record<any, any>;
  ref?: string;
  class?: string;
  style?: string;
}

const adaptOnsV3 = (ons: Object) => {
  if (!ons) return null;
  return Object.entries(ons).reduce((ret, [key, handler]) => {
    key = key.charAt(0).toUpperCase() + key.slice(1);
    key = `on${key}`;
    return { ...ret, [key]: handler };
  }, {});
};

const h = (
  type: string | Record<any, any>,
  options: Options = {},
  chidren?: any
) => {
  if (isVue2) return hDemi(type, options, chidren);

  const { props, domProps, on, ...extraOptions } = options;

  const ons = on ? adaptOnsV3(on) : {};
  const params = { ...extraOptions, ...props, ...domProps, ...ons };
  return hDemi(type, params, chidren);
};

const slot = (defaultSlots: any) => {
  if (typeof defaultSlots == 'function') return defaultSlots();
  return defaultSlots;
};
export { slot, h as default };
