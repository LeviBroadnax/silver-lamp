import { createJSONStorage, persist } from "zustand/middleware";
import { distance, french, gameStore } from "./index";

import { create } from "zustand";

interface FrenchState {
  _selectedCategories: string[];
  _semiRandomIndex: () => number;
  setSelectedCategories: (categories: string[]) => void;
  selectedCategories: () => string[];
  byId: (idx: number) => IWord;
  byCategories: (categories: string[]) => number[];
  nextWord: () => void;
  highEnough: (word: IWord, userInput: string) => boolean;
  highEnoughOral: (word: IWord, vocal: string, confidence: number) => boolean;
}

export const frenchStore = create<FrenchState>()(
  persist(
    (set, get) => ({
      _selectedCategories: [],
      _semiRandomIndex: () => {
        const contains = gameStore.getState().seen;
        const choices = get().byCategories(get()._selectedCategories);
        const randomIndex = () => Math.floor(Math.random() * choices.length);
        let newIdx = randomIndex();
        while (contains(newIdx)) {
          newIdx = randomIndex();
        }
        return choices[newIdx];
      },
      setSelectedCategories: (categories) =>
        set(() => ({ _selectedCategories: [...categories] })),
      selectedCategories: () => get()._selectedCategories,
      byId: (idx) => french[idx],
      byCategories: (categories) => {
        const result = [];
        for (let i = 0; i < french.length; i++) {
          for (let c of categories) {
            if (french[i].categories.includes(c)) {
              result.push(i);
              break;
            }
          }
        }
        return result;
      },

      nextWord: () => {
        const idx = get()._semiRandomIndex();
        gameStore.setState({ _currentWord: french[idx] });
      },
      highEnough: (word, userInput) => {
        const obj = word.english;
        let result = false;
        if (obj !== undefined) {
          const english = obj.split(/[,;]+/);
          userInput = userInput.trim();
          for (let e of english) {
            e = e.trim();
            if (distance(e, userInput) > 0.97) {
              result = true;
            }
          }
        }
        return result;
      },
      highEnoughOral: (word, vocal, confidence) => {
        if (word === undefined) return false;
        vocal = vocal.trim();
        return distance(word.french, vocal) > 0.75 && confidence > 0.75;
      },
    }),
    {
      name: "french-store",
      storage: createJSONStorage(() => sessionStorage),
      version: 0.06,
    }
  )
);
