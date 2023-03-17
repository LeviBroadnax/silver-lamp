import "./Legend.css";

import {
  BackspaceKeyIcon,
  CtrlKeyIcon,
  EnterKeyIcon,
  ShiftKeyIcon,
} from "../styles/keys";

import React from "react";

export default function Legend(_props) {
  return (
    <div className='legend hardlyinteresting fade-out-hover'>
      <div className='legend-item'> {EnterKeyIcon()} Guess</div>
      <div className='legend-item'> {ShiftKeyIcon()} Flip</div>
      <div className='legend-item'>
        {CtrlKeyIcon()}
        {BackspaceKeyIcon()} Clear
      </div>
    </div>
  );
}
