import React from "react";

import { frenchStore } from "../store";
import * as styles from "./Categories.module.css";

interface IOption {
  display: string;
  value: string;
}

const options: Array<IOption> = [
  { display: "Nouns", value: "noun" },
  { display: "Verbs", value: "verb" },
  { display: "Adjectives", value: "adjective" },
  { display: "Fem", value: "feminine" },
  { display: "Masc", value: "masculine" },
  { display: "Plurals", value: "plural" },
  { display: "No distinct Fem", value: "no distinct feminine" },
  { display: "No distinct Plurals", value: "no distinct plural" },
  { display: "Adverbs", value: "adverb" },
  { display: "Conjunctions", value: "conjunction" },
  { display: "Determiners", value: "determiner" },
  { display: "Interjections", value: "interjection" },
  { display: "Invariables", value: "invariable" },
  { display: "Prepositions", value: "preposition" },
  { display: "Pronouns", value: "pronoun" },
];

const defaultSelected = options.map((e) => e.value);
export default function Categories() {
  const { byCategories, setSelectedCategories, selectedCategories } =
    frenchStore((state) => ({
      byCategories: state.byCategories,
      setSelectedCategories: state.setSelectedCategories,
      selectedCategories: state.selectedCategories,
    }));
  if (selectedCategories().length === 0) {
    setSelectedCategories(defaultSelected);
  }
  const _assertSelection = () => {
    const currentSelection = byCategories(selectedCategories());
    for (const opt of options) {
      if (!selectedCategories().includes(opt.value)) {
        const newSelection = byCategories([...selectedCategories(), opt.value]);
        if (newSelection.length === currentSelection.length) {
          addToSelected(opt);
        }
      }
    }
  };

  const isChecked = (opt: IOption): boolean => {
    const selectedSet = new Set(selectedCategories());
    return selectedSet.has(opt.value);
  };

  const addToSelected = (opt: IOption) => {
    const selectedSet = new Set(selectedCategories());
    selectedSet.add(opt.value);
    setSelectedCategories([...selectedSet]);
  };

  const removeFromSelected = (opt: IOption) => {
    const selectedSet = new Set(selectedCategories());
    selectedSet.delete(opt.value);
    setSelectedCategories([...selectedSet]);
  };

  const onClick = (e: React.MouseEvent, opt: IOption) => {
    e.preventDefault();
    e.stopPropagation();
    if (isChecked(opt)) {
      removeFromSelected(opt);
    } else {
      addToSelected(opt);
    }
  };

  const getOptionClass = (opt: IOption) => {
    if (isChecked(opt)) {
      return `${styles.Option} ${styles.Selected}`;
    } else {
      return `${styles.Option}`;
    }
  };

  return (
    <div className={styles.CategoryContainer}>
      {options.map((opt: IOption, idx: number) => (
        <div
          key={opt.display + idx}
          className={getOptionClass(opt)}
          onClick={(ev) => onClick(ev, opt)}
        >
          {opt.display}
        </div>
      ))}
    </div>
  );
}
