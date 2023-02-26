import { createJSONStorage, persist } from "zustand/middleware";

import { create } from "zustand";
import french from "./french.json";

const useStore = create(
  persist(
    (set, get) => ({
      _words: { next: null },
      _seen: new Set(),

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
      contains: (idx) => get()._seen.has(idx),
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
export default useStore;
