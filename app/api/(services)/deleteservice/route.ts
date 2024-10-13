import connectDB from "@/utilities/connectDB";
import Service from "../../models/service.model";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
    await connectDB();

    try {
    
        const { _id } = await request.json();

        console.log(_id)

        if (!_id) {
            return new Response("Service _ID is required", { status: 400 });
        }

        const dbResponse = await Service.deleteOne({ _id: _id });

        if (dbResponse.deletedCount === 0) {
            return new Response("Service not found", { status: 404 });
        }

        return new Response("Service deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting service:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
