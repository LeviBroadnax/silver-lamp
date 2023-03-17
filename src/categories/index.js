import "./categories.css";

import React, { useEffect, useState } from "react";

import { Notyf } from "notyf";
import { frenchStore } from "../store";

const options = [
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
  const [byCategories, setSelectedCategories, selectedCategories] = frenchStore(
    (e) => [e.byCategories, e.setSelectedCategories, e.selectedCategories]
  );
  if (selectedCategories().length === 0) {
    setSelectedCategories(defaultSelected);
  }
  const [selected, setSelected] = useState(selectedCategories());
  const assertSelection = () => {
    const currentSelection = byCategories(selected);
    for (let opt of options) {
      if (!selected.includes(opt.value)) {
        const newSelection = byCategories([...selected, opt.value]);
        if (newSelection.length === currentSelection.length) {
          addToSelected(opt);
        }
      }
    }
  };

  useEffect(() => {
    assertSelection();
    setSelectedCategories(selected);
  }, [selected]);

  const selectionWillChange = (opt) => {
    const currentSelection = byCategories(selected);
    const selection = new Set(selected);
    selection.delete(opt.value);
    const newSelection = byCategories(selection);
    return newSelection.length !== currentSelection.length;
  };

  const isChecked = (opt) => {
    const selectedSet = new Set(selected);
    return selectedSet.has(opt.value);
  };

  const addToSelected = (opt) => {
    const selectedSet = new Set(selected);
    selectedSet.add(opt.value);
    setSelected([...selectedSet]);
  };

  const removeFromSelected = (opt) => {
    if (selectionWillChange(opt)) {
      const selectedSet = new Set(selected);
      selectedSet.delete(opt.value);
      setSelected([...selectedSet]);
    } else {
      const notyf = new Notyf();
      notyf.success("Selection will not change, try nouns/verbs/adjectives");
    }
  };

  const onClick = (e, opt) => {
    e.preventDefault();
    e.stopPropagation();
    if (isChecked(opt)) {
      removeFromSelected(opt);
    } else {
      addToSelected(opt);
    }
  };

  const getOptionClass = (opt) =>
    isChecked(opt) ? "Option Selected" : "Option";

  return (
    <div className='CategoryContainer fade-out'>
      {options.map((opt, idx) => (
        <div
          key={opt.display + idx}
          className={getOptionClass(opt)}
          onClick={(ev) => onClick(ev, opt)}>
          <div className='slightlyinteresting'>{opt.display}</div>
        </div>
      ))}
    </div>
  );
}
