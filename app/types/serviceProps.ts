import { Types } from "mongoose";

type serviceProps = {
    status: boolean;
    title: string;
    description: string;
    category: 'Beauty' | 'Home Repair' | 'Cleaning' | 'Plumbing' | 'Electrical' | 'Gardening' | 'Other';
    provider: Types.ObjectId;
    location: string;
    price: number;
    duration: number;
    availability: string[];
    images: string[];
    createdAt: Date;
    updatedAt: Date;
};

export default serviceProps