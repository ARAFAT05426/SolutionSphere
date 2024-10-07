import { NextResponse } from 'next/server';
import connectDB from '@/utilities/connectDB';
import Service from '../../models/service.model';

export async function GET(request: Request) {
    await connectDB();
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    try {
        const totalServices = await Service.countDocuments({});
        const services = await Service.find({}).skip(skip).limit(limit);
        
        return NextResponse.json({
            totalServices,
            services,
            currentPage: page,
            totalPages: Math.ceil(totalServices / limit)
        });
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}
