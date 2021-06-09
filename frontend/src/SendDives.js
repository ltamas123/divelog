import React from 'react';
import { useFormik } from 'formik';
import { postDive } from './apiCalls';
import useDecode from './useDecode';

const SendDives = ({ setDives, dives }) => {
  const { getUserId } = useDecode();

  const formik = useFormik({
    initialValues: {
      latitude: '',
      longitude: '',
      depth: 0,
      duration: 0,
    },

    onSubmit: (values) => {
      postDive(values, getUserId());

      setDives([...dives, { values }]); //TODO nem működik
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="latitude">latitude</label>
      <input id="latitude" type="text" {...formik.getFieldProps('latitude')} />
      {formik.touched.latitude && formik.errors.latitude ? (
        <div>{formik.errors.latitude}</div>
      ) : null}

      <label htmlFor="long">longitude</label>
      <input
        id="longitude"
        type="text"
        {...formik.getFieldProps('longitude')}
      />
      {formik.touched.longitude && formik.errors.longitude ? (
        <div>{formik.errors.longitude}</div>
      ) : null}

      <label htmlFor="depth">depth</label>
      <input id="depth" type="number" {...formik.getFieldProps('depth')} />
      {formik.touched.depth && formik.errors.depth ? (
        <div>{formik.errors.depth}</div>
      ) : null}

      <label htmlFor="duration">duration</label>
      <input
        id="duration"
        type="number"
        {...formik.getFieldProps('duration')}
      />
      {formik.touched.duration && formik.errors.duration ? (
        <div>{formik.errors.duration}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};

export default SendDives;
