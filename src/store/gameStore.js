import { createJSONStorage, persist } from "zustand/middleware";

import { create } from "zustand";
import french from "./french.json";

export const gameStore = create(
  persist(
    (set, get) => ({
      _words: { next: null },
      _seen: new Set(),
      _correct: 0,
      successRate: () => {
        const { _correct, _seen } = get();
        if (_seen.size + _correct === 0) return 0;
        return (_correct / (_seen.size + _correct)) * 100;
      },
      incrementCorrect: () =>
        set((state) => ({ _correct: state._correct + 1 })),
      take: (idx) => {
        const words = [];
        let word = get()._words;
        while (word.next) {
          if (idx === 0) {
            return words;
          }
          words.push(word.word);
          word = word.next;
          idx--;
        }
        return words;
      },
      seen: (idx) => get()._seen.has(idx),
      add: (idx) => {
        const s = get()._seen;
        s.add(idx);
        return set((state) => ({
          _seen: s,
          _words: {
            next: state._words,
            word: french[idx],
          },
        }));
      },
    }),
    {
      name: "french-cards",
      storage: createJSONStorage(),
    }
  )
);
