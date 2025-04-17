"use client";

import {useState} from "react";
import EnquiryForm from "./enquiryForm";

export default function PlotSection({plotData}) {

    const [activeLocation, setActiveLocation] = useState("all");
    const filteredPlots = activeLocation === "all" ? plotData.Plots : plotData.Plots.filter(plot => plot.Location.Name === activeLocation);

    const [visibleCount,setVisibleCount] = useState(6);
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 3);
    }

    const [redirectSlug, setRedirectSlug] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const handleOpen = (slug) => {
        setRedirectSlug(slug);
        setShowPopup(true);
    }
    const handleClose = () => setShowPopup(false);

    const [socialSharing, setSocialSharing] = useState(null);
    const handleSocialSharing = (index) => {
        setSocialSharing(prev => (prev === index ? null : index));
      };
      

    const handleCopyLink = (url) => {
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
    };

    const siteURL = process.env.NEXT_PUBLIC_SITE_URL;
    // const shareURL = `${siteURL}/residential/${plot.Properties[0].Slug}`;


    return (
        <section className="resd__section">
            <div className="container">
                <div className="resd__section__wrapper">
                    <h2>{plotData.Heading}</h2>
                    <div className="resd__tab__header">
                        <ul>
                            <li><a href="#" className={activeLocation === "all" ? "active" : ""} onClick={(e) => {e.preventDefault(); setActiveLocation("all")}}>All</a></li>
                            {plotData?.Plots.map((plt, idx) => (
                            <li key={idx}><a href="#" className={activeLocation === plt.Location.Name ? "active" : ""} onClick={(e) => { e.preventDefault(); setActiveLocation(plt.Location.Name); }}>{plt.Location.Name}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="resd__tab__panel__body">
                        <div className="pw__row">
                            {filteredPlots.slice(0, visibleCount).map((plot, index) => (
                            <div className="col-md-4 col-sm-6 rsd__grid rsd__item" data-location={plot.Location.Name} key={index}>
                                <div className="resd__tab__panel__item">
                                    <div className="resd__tab__panel__item__head">
                                        <h3>{plot.Properties[0].Title}</h3>
                                        <span>{plot.Properties[0].Location}</span>
                                    </div>
                                    <figure>
                                        <img src={plot.Properties[0].Image.url} width="405" height="405" className="img-responsive" alt="" />
                                        <div className="resd__share__holder">
                                            <div className={`icon__social__media prod__share__project__cta icon-share2 ${socialSharing === index ? "open" : ""}`} onClick={(e) => {handleSocialSharing(index)}}>
                                                <a href="#" className={`fab copy_link ${socialSharing === index ? "active" : ""}`} title="Copy Link" onClick={(e) => {e.preventDefault(); handleCopyLink(`${siteURL}/residential/${plot.Properties[0].Slug}`)}}><i className="icon-copy"></i></a>
                                                <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${plot.Properties[0].Title} - ${siteURL}/residential/${plot.Properties[0].Slug}`)}`} target="_blank" className={`fab ${socialSharing === index ? "active" : ""}`} title="Share on Whatsapp"><i className="icon-whatsapp"></i></a>
                                                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${siteURL}/residential/${plot.Properties[0].Slug}`)}&text=${encodeURIComponent(plot.Properties[0].Title)}`} target="_blank" className={`fab ${socialSharing === index ? "active" : ""}`} title="Share on Twitter"><i className="icon-twitter"></i></a>
                                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${siteURL}/residential/${plot.Properties[0].Slug}`)}`} target="_blank" className={`fab ${socialSharing === index ? "active" : ""}`} title="Share on Facebook"><i className="icon-facebook"></i></a>
                                            </div>
                                        </div>
                                    </figure>
                                    <div className="resd__tab__panel__item__content">
                                        <h3><a href="#">{plot.Properties[0].ShortDescription}</a></h3>
                                        <div className="resd__plot__bx">
                                            <div className="resd__plot__bx__item">
                                                <span className="label">Residential Plot Sizes:</span>
                                                <span className="value">{plot.Properties[0].Area}</span>
                                            </div>
                                            <div className="resd__plot__bx__item">
                                                <span className="label">Residential Plot Price:</span>
                                                <span className="value">{plot.Properties[0].Price}</span>
                                            </div>
                                        </div>
                                        <div className="viewdetls__btn">
                                            {/* <a href={`/residential/${plot.Properties[0].Slug}`}>View Details</a> */}
                                            {/* <a href="#" onClick={(e) => {e.preventDefault(); handleViewDetails(plot.Properties[0].Slug)}}>View Details</a> */}
                                            <a href="#" onClick={(e) => {e.preventDefault(); handleOpen(plot.Properties[0].Slug)}}>View Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                    {visibleCount < filteredPlots.length && (
                    <div className="loadmore__btn__wrapper">
                        <button onClick={handleLoadMore} id="loadmorebtn">Load More Properties</button>
                    </div>
                    )}
                </div>
            </div>
            {showPopup &&
                <EnquiryForm
                    onClose={handleClose}
                    redirectSlug = {redirectSlug}
                />
            }
            {/* Popup form */}
            {/* {showPopup && ( */}
                {/* <div className="popup__overlay" style={{ display : showPopup ? 'flex' : 'none'}}>
                <div className="popup__content">
                    <button className="formclose__btn" onClick={() => setShowPopup(false)}>
                    X
                    </button>
                    <h2>Enquire Form</h2>
                    <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                        className="popup__input"
                    />
                    <input
                        type="tel"
                        name="contact"
                        placeholder="Contact Number"
                        required
                        className="popup__input"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="popup__input"
                    />
                    <button type="submit" className="pop__sub__btn">
                        Submit
                    </button>
                    </form>
                </div>
                </div> */}
            {/* )} */}
        </section>
    )
}
{/* <div class="popup__overlay" id="popupForm">
        <div class="popup__content">
          <button class="formclose__btn" onclick="closePopup()">X</button>
          <h2>Enquire Form</h2>
          <form>
            <input type="text" name="name" placeholder="Name" required class="popup__input">
            <input type="tel" name="contact" placeholder="Contact Number" required class="popup__input">
            <input type="email" name="email" placeholder="Email" required class="popup__input">
            <button type="submit" class="pop__sub__btn">Submit</button>
          </form>
        </div>
      </div> */}