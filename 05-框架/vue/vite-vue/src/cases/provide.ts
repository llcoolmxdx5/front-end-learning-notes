import type { InjectionKey, Ref } from 'vue';

export type Pole = 'North Pole' | 'South Pole';

type LocationValue = {
  location: Ref<Pole>;
  updateLocation: () => void;
};

export const locationKey = Symbol('location') as InjectionKey<LocationValue>;
