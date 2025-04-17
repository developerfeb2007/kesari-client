"use client";

import Image from "next/image";

export default function Footer(){
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__wrap">
                    <div className="footer__top">
                        <div className="footer__add__item">
                            <h3>Chennai Corporate Office</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </div>
                        <div className="footer__add__item">
                            <h3>Coimbatore Office</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </div>
                        <div className="footer__add__item">
                            <h3>Banglore Office</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </div>
                    </div>
                    <div className="footer__social">
                        <span className="label">Follow us on:</span>
                        <div className="social__media__links">
                            <a href="#" className="fb__icon"><Image src="/fb-icon.svg" width="28" height="28" alt="Facebook" /></a>
                            <a href="#" className="tw__icon"><Image src="/tw-icon.svg" width="28" height="28" alt="Twitter" /></a>
                            <a href="#" className="insta__icon"><Image src="/insta-icon.svg" width="28" height="28" alt="Instagram" /></a>
                            <a href="#" className="yt__icon"><Image src="/yt-icon.svg" width="28" height="28" alt="YouTube" /></a>
                            <a href="#" className="in__icon"><Image src="/linkedin-icon.svg" width="28" height="28" alt="LinkedIn" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}