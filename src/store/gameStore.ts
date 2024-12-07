import { createJSONStorage, persist } from "zustand/middleware";

import { create } from "zustand";
import { frenchStore } from "./index";

interface GameState {
  _seen: Set<number | unknown>;
  _correct: number;
  _currentWord: IWord | undefined;
  successRate: () => number;
  currentWord: () => IWord;
  incrementCorrect: () => void;
  seen: (idx: number) => boolean;
  add: (idx: number) => void;
}

export const gameStore = create<GameState>()(
  persist(
    (set, get) => ({
      _seen: new Set<number>(),
      _correct: 0,
      _currentWord: undefined,
      successRate: () => {
        const { _correct, _seen } = get();
        if (_seen.size + _correct === 0) return 0;
        return (_correct / (_seen.size + _correct)) * 100;
      },
      currentWord: () => {
        if (get()._currentWord === undefined) {
          frenchStore.getState().nextWord();
        }
        return get()._currentWord!;
      },
      incrementCorrect: () =>
        set((state) => ({ _correct: state._correct + 1 })),
      seen: (idx: number) => "has" in get()._seen && get()._seen.has(idx),
      add: (idx: number) => {
        return set((_state) => ({
          _seen:
            "has" in get()._seen
              ? new Set(get()._seen).add(idx)
              : new Set().add(idx),
        }));
      },
    }),
    {
      name: "game-store",
      storage: createJSONStorage(() => sessionStorage),
      version: 0.06,
    }
  )
);
