"use client";

import { useState } from "react";

export default function FAQSection({faqData}) {

    const [activeFaq, setActiveFaq] = useState(null);

    return (
        <section className="acc__item__sec">
            <div className="container">
                <div className="acc__item__block">
                    {faqData.map((faq, index) =>(
                    <div className={`acc__item__item ${activeFaq === index ? "active" : ""}`} key={index} onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                        <div className="acc__item__head">
                            <h3>{faq.Question}</h3>
                        </div>
                        <div className="acc__item__body" style={{ display: activeFaq === index ? "block" : "none" }}>
                            <div dangerouslySetInnerHTML={{ __html: faq.Answer }} />
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    )
}