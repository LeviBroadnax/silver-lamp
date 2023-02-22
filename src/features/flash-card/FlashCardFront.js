import React from "react";
import { queryStore } from "../../store/FrenchQuery";
export default function FrontFlashCard(props) {
  const state = queryStore.byId(props.idx);
  return (
    <div className='FlashCard Front'>
      <div className='FlashRank hardlyinteresting'>({state.rank})</div>
      <h1 className='FlashWord' title={state.ex}>
        {state.french}
      </h1>
    </div>
  );
}
