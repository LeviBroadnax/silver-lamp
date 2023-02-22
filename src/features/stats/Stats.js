import "./Stats.css";

import React from "react";

export default function Stats(props) {
  const success = (props.correct / props.total) * 100;
  if (!Number.isNaN(success)) {
    return <div className='Stats hardlyinteresting'>{success.toFixed(2)}%</div>;
  } else {
    return <div className='Stats hardlyinteresting'>0.00%</div>;
  }
}
