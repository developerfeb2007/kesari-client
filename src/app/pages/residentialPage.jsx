"use client";

// import { useState, useEffect } from "react";
import BannerSection from "../components/residentialPage/bannerSection";
import PlotSection from "../components/residentialPage/plotSection";
import FAQSection from "../components/residentialPage/faqSection";

export default function ResidentialPage({residentialData}) {

    const bannerSection = residentialData?.BannerSection || [];
    const plotSection = residentialData?.PlotSection || [];
    const faqSection = residentialData?.FAQSection || [];

    return (
        <>
            <BannerSection
                bannerData = {bannerSection}
            />
            <PlotSection
                plotData = {plotSection}
            />
            <FAQSection
                faqData = {faqSection}
            />
        </>
    )
}