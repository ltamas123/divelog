import React from 'react';
import { useFormik } from 'formik';
import { postDive, getDives } from '../api/apiCalls';
import useDecode from '../Hooks/useDecode';

const SendDives = ({ setDives, position }) => {
  const { getUserId } = useDecode();

  const postNewDive = async (values) => {
    const diveValue = {
      ...values,
      latitude: position.lat,
      longitude: position.lng,
    };
    await postDive(diveValue, getUserId());
    const newDiveList = await getDives(getUserId());
    setDives(newDiveList);
  };

  const formik = useFormik({
    initialValues: {
      depth: 0,
      duration: 0,
    },

    onSubmit: (values) => {
      postNewDive(values);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
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
    </>
  );
};

export default SendDives;
