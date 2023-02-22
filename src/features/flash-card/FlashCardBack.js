import React from "react";
import { queryStore } from "../../store/FrenchQuery";

export default function BackFlashCard(props) {
  const state = queryStore.byId(props.idx);

  return (
    <div className='FlashCard Back'>
      <h1 className='FlashWord'>{state.english}</h1>
      <h1 className='FlashCategory'>{state.cat}</h1>
    </div>
  );
}
