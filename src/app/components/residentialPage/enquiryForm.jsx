"use client";

// import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function EnquiryForm({ onClose, redirectSlug }) {
  
    // console.log(redirectSlug);
    // const [showPopup, setShowPopup] = useState(false);
    // const [redirectSlug, setRedirectSlug] = useState("");
    const router = useRouter();

    // const handleViewDetails = (slug) => {
    //     setRedirectSlug(slug);
    //     setShowPopup(true);
    // };
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setShowPopup(false);
    //     router.push(`/residential/${redirectSlug}`);
    // };

    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[a-zA-Z\s]+$/, "Only characters allowed")
            .required('Name is required'),
        contact: Yup.string()
            .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number")
            .required('Contact number is required'),
        email: Yup.string()
            .email('Invalid email address')
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                'Invalid email address'
            )
            .required('Email is required'),
    });

    const initialValues= {
        name: '',
        contact: '',
        email: ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            // console.log(values);
            submitForm(values);
            resetForm({values: initialValues});
        }
    })

    const submitForm = async (formData) => {
        try {
            const response = await axios.post(
                '/api/enquiry',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            // setFormProcessing(false);

            if (response.status == 200) {
                // alert('Application submitted successfully!');
                router.push(`/residential/${redirectSlug}`);
            }
        } catch (error) {
            //alert('Application ');
            // setFormProcessing(false);
            console.error('Error message:', error);
        }
    }

  return (
    <div className="popup__overlay" style={{ display : 'flex' }}>
        <div className="popup__content">
            <button className="formclose__btn" onClick={onClose}>
            X
            </button>
            <h2>Enquire Form</h2>
            <form onSubmit={formik.handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                className="popup__input"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
                    <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.name}</div>
                    ) : null}
            <input
                type="tel"
                name="contact"
                placeholder="Contact Number"
                className="popup__input"
                value={formik.values.contact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.contact && formik.errors.contact ? (
                    <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.contact}</div>
                    ) : null}
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="popup__input"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
                    <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.email}</div>
                    ) : null}
            <button type="submit" className="pop__sub__btn">
                Submit
            </button>
            </form>
        </div>
    </div>
  );
}
