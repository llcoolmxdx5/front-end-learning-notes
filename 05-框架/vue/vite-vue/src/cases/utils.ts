import { customRef } from 'vue';

export function useDebouncedRef(value: string, delay = 3000) {
  let timeout: number;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
}
