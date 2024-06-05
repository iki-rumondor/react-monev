import React, { useRef, useEffect } from 'react';
import $ from 'jquery';
import 'daterangepicker/daterangepicker.css';

export const MyDateRangePicker = ({options}) => {
  const pickerRef = useRef();

  useEffect(() => {
    $(pickerRef.current).daterangepicker(options);
  }, []);

  return (
    <input type="text" ref={pickerRef} />
  );
};
