// import MidiPlayer from "midi-player-js";

export const playMidi = (scale) => {
  const midiRoute = "/fx/Gershwin_Rhapsody_in_Blue_Piano_solo.mid";
  fetch(midiRoute)
    .then((response) => response.arrayBuffer())
    .then((midiData) => {
      if (midiData === undefined) return;
      //     // Request access to the Web MIDI API
      //     navigator.requestMIDIAccess().then((midiAccess) => {
      //       // Get the default MIDI output port
      //       const outputs = midiAccess.outputs.values();
      //       const output = outputs.next().value;

      //       // Create a new MIDI file player
      //       const player = new MidiPlayer(midiData);

      //       // Connect the player to the output port
      //       player.connect(output);

      //       // Start playing the MIDI file
      //       player.play();
    });
};
