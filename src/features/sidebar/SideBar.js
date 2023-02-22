import "./SideBar.css";

import React, { useEffect } from "react";

export default function SideBar(props) {
  const take = props.store((e) => e.take);
  const _ = props.store((e) => e._words);
  useEffect(() => {}, [_]);

  return (
    <div className='SideBar'>
      {take(9).map((word, idx) => (
        <div
          className='SideBarWord semiinteresting'
          key={idx}
          title={word.english}>
          {word.french}
        </div>
      ))}
    </div>
  );
}
