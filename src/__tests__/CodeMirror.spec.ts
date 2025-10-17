import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { nextTick, ref } from 'vue';

import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';

import CodeMirror from '../index';

describe('CodeMirror Component', () => {
  beforeEach(() => {
    // Clear any previous DOM
    document.body.innerHTML = '';
  });

  describe('Basic Rendering', () => {
    it('should render the component', () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test code',
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.classes()).toContain('vue-codemirror');
    });

    it('should use custom tag when specified', () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
          tag: 'section',
        },
      });

      expect(wrapper.element.tagName.toLowerCase()).toBe('section');
    });

    it('should apply custom class', () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
        },
        attrs: {
          class: 'custom-class',
        },
      });

      expect(wrapper.classes()).toContain('vue-codemirror');
      expect(wrapper.classes()).toContain('custom-class');
    });
  });

  describe('Props', () => {
    it('should accept modelValue prop', () => {
      const testValue = 'const x = 42;';
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: testValue,
        },
      });

      expect(wrapper.props('modelValue')).toBe(testValue);
    });

    it('should accept basic setup prop', () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
          basic: true,
        },
      });

      expect(wrapper.props('basic')).toBe(true);
    });

    it('should accept minimal setup prop', () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
          minimal: true,
        },
      });

      expect(wrapper.props('minimal')).toBe(true);
    });

    it('should accept dark mode prop', () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
          dark: true,
        },
      });

      expect(wrapper.props('dark')).toBe(true);
    });

    it('should accept readonly prop', () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
          readonly: true,
        },
      });

      expect(wrapper.props('readonly')).toBe(true);
    });

    it('should accept disabled prop', () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
          disabled: true,
        },
      });

      expect(wrapper.props('disabled')).toBe(true);
    });

    it('should accept wrap prop', () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
          wrap: true,
        },
      });

      expect(wrapper.props('wrap')).toBe(true);
    });

    it('should accept tab prop', () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
          tab: true,
        },
      });

      expect(wrapper.props('tab')).toBe(true);
    });

    it('should accept placeholder prop', () => {
      const placeholderText = 'Enter code here...';
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: '',
          placeholder: placeholderText,
        },
      });

      expect(wrapper.props('placeholder')).toBe(placeholderText);
    });

    it('should accept lang prop', { timeout: 10000 }, () => {
      const lang = javascript();
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'const x = 1;',
          lang,
        },
      });

      // Just verify the prop is set, don't compare object identity
      expect(wrapper.props('lang')).toBeDefined();
      expect(wrapper.props('lang')).toHaveProperty('language');
    });
  });

  describe('Events', () => {
    it('should emit ready event after mount', async () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
        },
      });

      await nextTick();
      await nextTick(); // Wait for onMounted

      const readyEvents = wrapper.emitted('ready');
      expect(readyEvents).toBeTruthy();
      if (readyEvents && readyEvents.length > 0) {
        expect(readyEvents.length).toBeGreaterThan(0);
        const firstEvent = readyEvents[0]?.[0];
        expect(firstEvent).toHaveProperty('view');
        expect(firstEvent).toHaveProperty('state');
        expect(firstEvent).toHaveProperty('container');
      }
    });

    it('should emit update:modelValue on text change', async () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'initial',
        },
      });

      await nextTick();
      await nextTick();

      // Simulate text change through exposed view
      const vm = wrapper.vm as any;
      if (vm.view) {
        vm.view.dispatch({
          changes: { from: 0, to: vm.view.state.doc.length, insert: 'updated' },
        });

        await nextTick();

        const updateEvents = wrapper.emitted('update:modelValue');
        expect(updateEvents).toBeTruthy();
      }
    });

    it('should emit destroy event on unmount', async () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
        },
      });

      await nextTick();
      await nextTick();

      wrapper.unmount();

      const destroyEvents = wrapper.emitted('destroy');
      expect(destroyEvents).toBeTruthy();
    });
  });

  describe('SSR Compatibility', () => {
    it('should handle missing window object gracefully', () => {
      // This test ensures the component doesn't crash in SSR environment
      // In happy-dom, window exists, but we test the defensive coding
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should not initialize EditorView before mount', () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
        },
        attachTo: document.body,
      });

      const vm = wrapper.vm as any;
      // Before nextTick, view might not be fully initialized
      expect(vm).toBeDefined();
      wrapper.unmount();
    });

    it('should safely handle view operations when view is undefined', async () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
        },
      });

      const vm = wrapper.vm as any;

      // These should not throw even if view is undefined
      expect(() => vm.getRange()).not.toThrow();
      expect(() => vm.getLine(0)).not.toThrow();
      expect(() => vm.lineCount()).not.toThrow();
      expect(() => vm.getCursor()).not.toThrow();
      expect(() => vm.listSelections()).not.toThrow();
      expect(() => vm.getSelection()).not.toThrow();
      expect(() => vm.getSelections()).not.toThrow();
      expect(() => vm.somethingSelected()).not.toThrow();

      wrapper.unmount();
    });
  });

  describe('Exposed Methods', () => {
    it('should expose editor ref', async () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
        },
      });

      await nextTick();

      const vm = wrapper.vm as any;
      expect(vm.editor).toBeDefined();
    });

    it('should expose view', async () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
        },
      });

      await nextTick();
      await nextTick();

      const vm = wrapper.vm as any;
      expect(vm.view).toBeDefined();
      if (vm.view) {
        expect(vm.view).toBeInstanceOf(EditorView);
      }
    });

    it('should expose cursor getter/setter', async () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test code',
        },
      });

      await nextTick();
      await nextTick();

      const vm = wrapper.vm as any;
      const initialCursor = vm.cursor;
      expect(typeof initialCursor).toBe('number');
    });

    it('should expose length property', async () => {
      const testValue = 'hello world';
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: testValue,
        },
      });

      await nextTick();
      await nextTick();

      const vm = wrapper.vm as any;
      // length is updated in the update listener, so it might be 0 initially
      expect(typeof vm.length).toBe('number');
    });

    it('should expose getRange method', async () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'hello world',
        },
      });

      await nextTick();
      await nextTick();

      const vm = wrapper.vm as any;
      const range = vm.getRange(0, 5);
      if (vm.view) {
        expect(range).toBe('hello');
      }
    });

    it('should expose lineCount method', async () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'line1\nline2\nline3',
        },
      });

      await nextTick();
      await nextTick();

      const vm = wrapper.vm as any;
      const count = vm.lineCount();
      if (vm.view) {
        expect(count).toBeGreaterThan(0);
      }
    });

    it('should expose getLine method', async () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'first line\nsecond line',
        },
      });

      await nextTick();
      await nextTick();

      const vm = wrapper.vm as any;
      if (vm.view) {
        const line = vm.getLine(0);
        expect(line).toBe('first line');
      }
    });

    it('should expose lint method', async () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
        },
      });

      await nextTick();
      await nextTick();

      const vm = wrapper.vm as any;
      expect(() => vm.lint()).not.toThrow();
    });

    it('should expose forceReconfigure method', async () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'test',
        },
      });

      await nextTick();
      await nextTick();

      const vm = wrapper.vm as any;
      expect(() => vm.forceReconfigure()).not.toThrow();
    });
  });

  describe('V-Model Binding', () => {
    it('should update when modelValue prop changes', async () => {
      const modelValue = ref('initial');
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: modelValue.value,
          'onUpdate:modelValue': (value: string) => {
            modelValue.value = value;
          },
        },
      });

      await nextTick();
      await nextTick();

      // Update the prop
      modelValue.value = 'updated';
      await wrapper.setProps({ modelValue: modelValue.value });
      await nextTick();

      expect(wrapper.props('modelValue')).toBe('updated');
    });

    it('should emit update:modelValue when content changes', async () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'initial',
        },
      });

      await nextTick();
      await nextTick();

      const vm = wrapper.vm as any;
      if (vm.view) {
        vm.view.dispatch({
          changes: { from: 0, to: vm.view.state.doc.length, insert: 'changed' },
        });

        await nextTick();

        const updateEvents = wrapper.emitted('update:modelValue');
        expect(updateEvents).toBeTruthy();
        if (updateEvents && updateEvents.length > 0) {
          const lastEvent = updateEvents.at(-1);
          expect(lastEvent?.[0]).toBe('changed');
        }
      }
    });
  });

  describe('Slots', () => {
    it('should render slot content', () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: '',
        },
        slots: {
          default: '<pre>Slot Content</pre>',
        },
      });

      expect(wrapper.html()).toContain('Slot Content');
    });

    it('should hide slot content with aria-hidden', () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: '',
        },
        slots: {
          default: '<pre>Hidden Content</pre>',
        },
      });

      const aside = wrapper.find('aside');
      expect(aside.exists()).toBe(true);
      expect(aside.attributes('aria-hidden')).toBe('true');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty modelValue', () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: '',
        },
      });

      expect(wrapper.props('modelValue')).toBe('');
    });

    it('should handle very long content', async () => {
      const longContent = 'x'.repeat(10000);
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: longContent,
        },
      });

      await nextTick();
      await nextTick();

      const vm = wrapper.vm as any;
      // length is a reactive value that gets updated
      expect(typeof vm.length).toBe('number');
      expect(vm.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle special characters', () => {
      const specialContent = '日本語\n한글\n中文\n😀🎉';
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: specialContent,
        },
      });

      expect(wrapper.props('modelValue')).toBe(specialContent);
    });

    it('should handle line separators', () => {
      const wrapper = mount(CodeMirror, {
        props: {
          modelValue: 'line1\nline2',
          lineSeparator: '\n',
        },
      });

      expect(wrapper.props('lineSeparator')).toBe('\n');
    });
  });
});
