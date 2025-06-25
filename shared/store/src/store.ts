// shared/store/src/store.ts
import { create } from 'zustand';

interface SharedState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

type SetState = {
  set: (fn: (state: SharedState) => Partial<SharedState> | SharedState) => void;
}

export const useSharedStore = create<SharedState>((set: (partial: Partial<SharedState> | ((state: SharedState) => Partial<SharedState>)) => void) => ({
  count: 0,
  increment: () => set((state: SharedState) => ({ count: state.count + 1 })),
  decrement: () => set((state: SharedState) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));