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
