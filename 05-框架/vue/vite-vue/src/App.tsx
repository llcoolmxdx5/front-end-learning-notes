import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  setup() {
    return () => (
      <>
        {/* @ts-ignore */}
        <RouterView />
      </>
    );
  },
});
