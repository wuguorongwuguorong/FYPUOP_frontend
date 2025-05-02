import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useJwt } from './UserStore';
import { useFlashMessage } from './FlashMessageStore';
import { useLocation } from 'wouter';

// Validation Schema using Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});


function UserLogin() {

    const { setJwt } = useJwt();
    const { showMessage } = useFlashMessage(); // Hook for flash messages
    const [, setLocation] = useLocation(); // Hook for navigation

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values, actions) => {
        try {
            // Replace this URL with your backend endpoint
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, values);

            console.log('Login successful:', response.data);
            setJwt(response.data.token); // Store the JWT
            actions.setSubmitting(false);
            showMessage('Login successful!', 'success'); // Show success message
            setLocation('/products'); // Redirect to a dashboard or another page
        } catch (error) {
            console.error('Login failed:', error);
            actions.setErrors({ submit: error.response.data.message });
            actions.setSubmitting(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {function (formik) {
                    return (
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <Field type="email" id="email" name="email" className="form-control" />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <Field type="password" id="password" name="password" className="form-control" />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>

                            {formik.errors.submit && <div className="alert alert-danger">{formik.errors.submit}</div>}

                            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};
export default UserLogin;