import React, { useEffect } from 'react';
import { connect } from 'dva';

const Counter = ({ number, dispatch }) => {
  useEffect(() => {
    // Only catch the first one. 2
    dispatch({ type: 'counter/addWatcher', payload: 2 });
    dispatch({ type: 'counter/addWatcher', payload: 3 });
  }, []);

  // useEffect(() => {
  //   // Only catch the last one. 3
  //   dispatch({ type: "counter/addDelay", payload: 2 });
  //   dispatch({ type: "counter/addDelay", payload: 3 });
  // }, []);

  return (
    <div>
      <p>{number}</p>
      <button onClick={() => dispatch({ type: 'counter/add' })}>+</button>
      <button onClick={() => dispatch({ type: 'counter/asyncAdd' })}>asyncAdd</button>
      <button onClick={() => dispatch({ type: 'counter/minus' })}>-</button>
    </div>
  );
};

export default connect(({ counter }) => ({
  ...counter,
}))(Counter);
