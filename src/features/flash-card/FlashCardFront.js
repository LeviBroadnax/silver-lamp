import React from "react";
import { playFrench } from "../audio/playFrench";
import { queryStore } from "../../store/FrenchQuery";

export default function FrontFlashCard(props) {
  const state = queryStore.byId(props.idx);
  playFrench(state);
  return (
    <div className='FlashCard Front'>
      <audio
        id='FlashcardFront'
        controls={false}
        autoPlay={true}
        preload='true'
      />
      <div className='FlashRank hardlyinteresting'>({state.rank})</div>
      <h1 className='FlashWord' title={state.ex}>
        {state.french}
      </h1>
    </div>
  );
}
