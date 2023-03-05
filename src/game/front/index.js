import "./Front.css";

import React from "react";
import { frenchStore } from "../../store";
import { playFrench } from "../../audio";

export default function Front(props) {
  const state = frenchStore.byId(props.idx);
  playFrench(state);
  return (
    <div className='CardContainer Front'>
      <div className='Rank hardlyinteresting'>({state.rank})</div>
      <h1 className='Word' title={state.ex}>
        {state.french}
      </h1>
    </div>
  );
}
