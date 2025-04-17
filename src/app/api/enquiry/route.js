import { NextResponse } from 'next/server';
import axios from "axios";
import { apiRoutes } from "@/app/models/commonConstants";

export async function POST(request) {
    const { name, contact, email } = await request.json();
  
    try {
        const response = await axios.post(
            apiRoutes.enquiryForm,
            {
                data:{
                    Name : name,
                    Contact : contact,
                    Email : email
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200 || response.status === 201) {
            return NextResponse.json({ success: true, message: 'Application submitted' });
        }
  
        return NextResponse.json({ success: false, message: response.data?.error?.message || 'Unknown error'}, {status: 400});

    } catch (error) {
        const errorMsg = error?.response?.data?.error?.message || error.message || 'Server error';
        const status = error?.response?.status || 500;

        return NextResponse.json({ success: false, message: errorMsg }, { status });
    }
  }