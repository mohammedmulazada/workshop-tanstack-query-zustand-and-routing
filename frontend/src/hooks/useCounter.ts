import create from "zustand";

type CounterState = {
  count: number;
  actions: {
    increment: () => void;
  };
};

const useCounterStore = create<CounterState>()((set) => ({
  count: 0,
  actions: {
    increment: () => set((state) => ({ count: state.count + 1 })),
  },
}));

export const useCounter = useCounterStore((state) => state.count);
export const useCounterActions = useCounterStore((state) => state.actions);
