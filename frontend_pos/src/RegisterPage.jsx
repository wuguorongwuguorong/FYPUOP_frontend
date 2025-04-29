import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

function RegisterPage() {

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = (values, formikHelpers) => {
    // Here you would typically make an API call to register the user
    console.log('Form values:', values);
    formikHelpers.setSubmitting(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),

  });

  return (
    <div className="container mt-5">
      <h1>Register</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <div className="mb-3">
            {formik.errors.name && formik.touched.name ? <div className="text-danger">{formik.errors.name}</div> : null}
              <label htmlFor="name" className="form-label">Name</label>
              <Field
                type="text"
                className="form-control"
                id="name"
                name="name"
              />
            </div>

            <div className="mb-3">
            {formik.errors.name && formik.touched.email ? <div className="text-danger">{formik.errors.email}</div> : null}
              <label htmlFor="email" className="form-label">Email</label>
              <Field
                type="email"
                className="form-control"
                id="email"
                name="email"
              />
            </div>

            <div className="mb-3">
            {formik.errors.name && formik.touched.password ? <div className="text-danger">{formik.errors.password}</div> : null}
              <label htmlFor="password" className="form-label">Password</label>
              <Field
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
            </div>

            <div className="mb-3">
            {formik.errors.name && formik.touched.confirmPassword ? <div className="text-danger">{formik.errors.confirmPassword}</div> : null}
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <Field
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={formik.isSubmitting}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterPage;
