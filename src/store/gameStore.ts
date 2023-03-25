import { IWord, french, frenchStore } from "./index";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { create } from "zustand";

interface GameState {
  _words: any;
  _seen: Set<number | unknown>;
  _correct: number;
  _currentWord: IWord | undefined;
  inputType: "text" | "oral";
  successRate: () => number;
  currentWord: () => IWord;
  incrementCorrect: () => void;
  take: (idx: number) => IWord[];
  seen: (idx: number) => boolean;
  add: (idx: number) => void;
}

export const gameStore = create<GameState>()(
  persist(
    (set, get) => ({
      _words: { next: null },
      _seen: new Set<number>(),
      _correct: 0,
      _currentWord: undefined,
      inputType: "text",
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
      take: (idx) => {
        const words: IWord[] = [];
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
      seen: (idx: number) => "has" in get()._seen && get()._seen.has(idx),
      add: (idx: number) => {
        return set((state) => ({
          _seen:
            "has" in get()._seen
              ? new Set(get()._seen).add(idx)
              : new Set().add(idx),
          _words: {
            next: state._words,
            word: french[idx],
          },
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
