import "./Legend.css";

import { backspaceKey, ctrlKey, enterKey, shiftKey } from "./Keys";

export default function Legend(_props) {
  return (
    <div className='legend hardlyinteresting'>
      <div className='legend-item'> {enterKey()} Guess</div>
      <div className='legend-item'> {shiftKey()} Flip</div>
      <div className='legend-item'>
        {ctrlKey()}
        {backspaceKey()} Clear
      </div>
    </div>
  );
}
