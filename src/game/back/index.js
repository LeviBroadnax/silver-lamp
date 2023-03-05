import "./Back.css";

import React from "react";
import { frenchStore } from "../../store";

export default function Back(props) {
  const state = frenchStore.byId(props.idx);

  return (
    <div className='CardContainer Back'>
      <h1 className='Word'>{state.english}</h1>
      <h1 className='Category'>{state.cat}</h1>
    </div>
  );
}
