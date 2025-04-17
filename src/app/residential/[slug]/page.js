import axios from "axios";
import { apiRoutes } from "@/app/models/commonConstants";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumb from "@/app/components/common/breadcrumb";

async function fetchData(slug) {
    try {
        const [propertyData] = await Promise.all([
            axios.get(`${apiRoutes.propertyData}/${slug}`, {
            headers: {
                "Content-Type": "application/json",
            },
            }),
        ]);
  
        return {
            propertyData: propertyData.data
        };
    } catch(error) {
        console.error(`Error fetching data: `, error);
        return { propertyData : null };
    }
}
  
export async function generateMetadata({ params }) {

    const { slug } = await params;
    const { propertyData } = await fetchData(slug);

    if (!propertyData) {
        return {
            title: "Property Detail || Kesari",
            description: "",
        };
    }
  
    const metaDetails = propertyData?.data?.MetaDetails;
  
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
        alternates: {
            canonical: canonicalUrl,
        }
    };
  }

export default async function PropertyDetail({ params }) {

    const { slug } = await params;
    const {propertyData} = await fetchData(slug);
    if(!propertyData){
        notFound();
    }
    // console.log(propertyData);
    const propData = propertyData?.data;
    // console.log(propData);
    return (
        <div>
            <Breadcrumb
                currentTitle = {propData.Title}
            />
            <h3>{propData?.Title}</h3>
            <p>{propData?.Location}</p>
            <p>{propData?.Area}</p>
            <p>{propData?.Price}</p>
            <p>{propData?.ShortDescription}</p>
            <Image 
                src={propData?.Image?.url}
                width="200"
                height="200"
                alt="Property Image"
            />
        </div>
    )
}