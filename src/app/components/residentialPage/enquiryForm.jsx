"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

    const [utmParams, setUtmParams] = useState({
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: ''
    });

    const searchParams = useSearchParams();

    useEffect(() => {
        const newUtmParams = {
            utm_source: searchParams.get('utm_source') || "",
            utm_medium: searchParams.get('utm_medium') || "",
            utm_campaign: searchParams.get('utm_campaign') || "",
            utm_term: searchParams.get('utm_term') || "",
            utm_content: searchParams.get('utm_content') || ""
        }

        setUtmParams(newUtmParams);
    }, [searchParams]);

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

        const payload = {
            ...formData,
            ...utmParams,
        };

        try {
            const response = await axios.post(
                '/api/enquiry',
                payload,
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
            <input type="hidden" name="utm_source" value={utmParams.utm_source} />
            <input type="hidden" name="utm_medium" value={utmParams.utm_medium} />
            <input type="hidden" name="utm_campaign" value={utmParams.utm_campaign} />
            <input type="hidden" name="utm_term" value={utmParams.utm_term} />
            <input type="hidden" name="utm_content" value={utmParams.utm_content} />
            <button type="submit" className="pop__sub__btn">
                Submit
            </button>
            </form>
        </div>
    </div>
  );
}
