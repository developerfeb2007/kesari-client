import axios from "axios";
import { apiRoutes } from "../models/commonConstants";
import ResidentialPage from "../pages/residentialPage";
import Breadcrumb from "../components/common/breadcrumb";
import PlotSection from "../components/residentialPage/plotSection";

async function fetchData() {
  try {
    const [residentialData] = await Promise.all([
      axios.get(apiRoutes.residentialData, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    ]);

    return {
        residentialData: residentialData.data
    };
  } catch(error) {
    console.error(`Error fetching data: `, error);
    return { residentialData : null };
  }
}

export async function generateMetadata() {
  const { residentialData } = await fetchData();

  if (!residentialData) {
    return {
      title: "Residential Plots || Kesari",
      description: "",
    };
  }

  const metaDetails = residentialData?.data?.MetaDetails;

  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}`;

  return {
    title: metaDetails?.Title || "Residential Plots",
    description: metaDetails?.Description || "",
    openGraph: {
      title: metaDetails?.OGTitle || metaDetails?.Title,
      description: metaDetails?.OGDescription || metaDetails?.Description,
      type: "website",
      images: [
        {
          url: metaDetails?.OGImage?.data?.attributes?.url || "/logo.png",
        },
      ],
    },
    // twitter: {
    //   card: "summary_large_image",
    //   title: metaDetails?.OGTitle || metaDetails?.Title,
    //   description: metaDetails?.OGDescription || metaDetails?.Description,
    //   images: [metaDetails?.OGImage?.data?.attributes?.url || "/img/logo.png"],
    // },
    alternates: {
      canonical: canonicalUrl,
    }
  };
}

export default async function residential() {
  const { residentialData } = await fetchData();
//   console.log(residentialData.data.BannerSection);

  return (
    <>
        <Breadcrumb
            currentTitle = {"Residential Plots"}
        />
        <ResidentialPage 
            residentialData = {residentialData?.data}
        />
    </>
    
  )
}