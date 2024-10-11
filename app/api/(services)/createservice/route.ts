import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utilities/connectDB"; // Ensure this path is correct
import Service from "../../models/service.model";

interface ServiceRequestBody {
    title: string;
    description: string;
    category: 'Beauty' | 'Home Repair' | 'Cleaning' | 'Plumbing' | 'Electrical' | 'Gardening' | 'Other';
    provider: string; // ObjectId of the provider
    price: number;
    duration: number;
    availability: boolean;
    image: string; // single image field
}

export async function POST(request: NextRequest) {
    await connectDB();

    try {
        const body: ServiceRequestBody = await request.json();

        const newService = new Service({
            title: body.title,
            description: body.description,
            category: body.category,
            provider: body.provider,
            price: body.price,
            duration: body.duration,
            availability: body.availability,
            image: body.image, // Ensure this matches your model
        });

        const dbResponse = await newService.save();

        return NextResponse.json(
            { success: true, service: dbResponse },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { success: false, message: "Error adding service" },
            { status: 500 }
        );
    }
}
