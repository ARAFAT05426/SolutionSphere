import { IconType } from "react-icons";
import { TbClockCheck, TbCrown, TbRosetteDiscount, TbRosetteDiscountCheck } from "react-icons/tb";

type featureProp = {
    Icon: IconType;
    title: string;
    description: string;
}

const features: featureProp[] = [
    {
        Icon: TbRosetteDiscount,
        title: "Affordable Price",
        description: "Competitive pricing without sacrificing quality."
    },
    {
        Icon: TbRosetteDiscountCheck,
        title: "Certified Quality",
        description: "Guaranteed quality that exceeds industry standards."
    },
    {
        Icon: TbClockCheck,
        title: "24/7 Availability",
        description: "Access our services any time, day or night."
    },
    {
        Icon: TbCrown,
        title: "Award-Winning Service",
        description: "Recognized for excellence in service and support."
    }
];

export default features;
