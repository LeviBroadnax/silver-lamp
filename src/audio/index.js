import { playCorrect, playWrong } from "./playFx";

import React from "react";
import { playFrench } from "./playFrench";
import { playMidi } from "./playMidi";
import { playSong } from "./playSong";

export { playCorrect, playWrong, playFrench, playSong, playMidi };
export default function Audio() {
  return (
    <>
      <audio
        id='song'
        autoPlay={false}
        src='/fx/Aux_Champs_Elysees.mp3'
        loop={true}
        preload='auto'></audio>
      <audio
        id='FrenchPronunciation'
        controls={false}
        autoPlay={true}
        preload='true'
      />
    </>
  );
}
