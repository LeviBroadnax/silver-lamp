import { createJSONStorage, persist } from "zustand/middleware";

import { create } from "zustand";
import { distance } from "./jaroWinkler";
import french from "./french.json";
import { gameStore } from "./gameStore";

export const frenchStore = create(
  persist(
    (set, get) => ({
      _selectedCategories: [],
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
      version: "1.0.5-alpha",
    }
  )
);
