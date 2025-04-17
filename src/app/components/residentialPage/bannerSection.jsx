"use client";

import Image from "next/image";
import { useState } from "react";

export default function BannerSection({bannerData}) {

    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const handlePlayClick = (e) => {
        e.preventDefault();
        setIsVideoPlaying(true);
    }
    return (
        <section className="hero__banner__section">
            <div className="hero__banner__wrapper">
                <figure>
                    {isVideoPlaying ? (
                        <div className="video__wrapper">
                            <iframe
                                width="100%"
                                height="650"
                                src={`${bannerData?.YoutubeLink}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <a href="#" onClick={handlePlayClick}>
                            <Image src={bannerData?.Image?.url} width="1981" height="650" className="img-responsive" alt="Video Thumbnail" />
                            <div className="play__icon"></div>
                        </a>
                    )}
                </figure>
            </div>
        </section>
    )
}