import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useJwt } from "./UserStore";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useFlashMessage } from './FlashMessageStore';
import { useLocation } from 'wouter';
import * as Yup from 'yup';


export default function Profile() {
    const { getJwt } = useJwt();
    const [initialValues, setInitialValues] = useState({});
    const { showMessage } = useFlashMessage();
    const [, setLocation] = useLocation();


    useEffect(() => {
        async function fetchData() {
            const token = getJwt();
            const response = await axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setInitialValues(response.data.user);
        }
        fetchData();

    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        salutation: Yup.string(),
        marketingPreferences: Yup.array().of(Yup.string()),
        country: Yup.string(),
    });

    const handleSubmit = async (values, actions) => {
        try {
            const token = getJwt();
            if (!token) {
                showMessage('You must be logged in to update your profile.', 'error');
                actions.setSubmitting(false);
                return;
            }

            await axios.put(import.meta.env.VITE_API_URL + '/api/users/me', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            showMessage('Profile updated successfully!', 'success');
            actions.setSubmitting(false);
        } catch (error) {
            console.error('Error updating profile:', error.response.data);
       
        } finally {
            actions.setSubmitting(false);
            setLocation("/products");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Edit Profile</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize // Allows form to reinitialize with fetched profile data
            >
                {function (formik) {
                    return (
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="User_name" className="form-label"> User Name</label>
                                <Field type="text" id="User_name" name="User_name" className="form-control" />
                                <ErrorMessage name="User_name" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <Field type="email" id="email" name="email" className="form-control" />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">H/P</label>
                                <Field type="phone" id="phone" name="phone" className="form-control" />
                                <ErrorMessage name="phone" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label"> Password </label>
                                <Field type="password" id="password" name="password" className="form-control" />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>
               
      

                            {formik.errors.submit && <div className="alert alert-danger">{formik.errors.submit}</div>}
                            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? 'Updating...' : 'Update Profile'}
                            </button>
                        </Form>
                    );
                }}
            </Formik>

        </div>
    )
}