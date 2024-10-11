import connectDB from "@/utilities/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Service from "../../models/service.model";

export async function PUT(request: NextRequest) {
    await connectDB();

    try {

        const data = await request.json();
        const { id, ...updateData } = data;

        const updatedService = await Service.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedService) {
            return NextResponse.json({ message: "Service not found" }, { status: 404 });
        }

        return NextResponse.json(updatedService, { status: 200 });
    } catch (error) {
        console.error("Error updating service:", error);
        return NextResponse.json({ message: "Error updating service" }, { status: 500 });
    }
}
