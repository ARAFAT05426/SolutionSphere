import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/utilities/connectDB';
import Service from '../../models/service.model';

interface Query {
    $or?: Array<{ title?: { $regex: string; $options: string; }; description?: { $regex: string; $options: string; }; category?: { $regex: string; $options: string; }; }>;
    status?: string;
    location?: string;
    price?: number;
    availability?: boolean;
}

export async function GET(request: NextRequest) {
    console.log('Connecting to DB...');
    await connectDB();
    console.log('Connected to DB');

    const url = new URL(request.url);
    const page = Math.max(parseInt(url.searchParams.get('page') || '1'), 1);
    const limit = Math.max(parseInt(url.searchParams.get('limit') || '10'), 1);
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search');
    const skip = (page - 1) * limit;

    try {
        const query: Query = {};

        if (status && status !== "all") {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ];
        }

        const totalServices = await Service.countDocuments(query);
        const services = await Service.find(query).skip(skip).limit(limit);

        return NextResponse.json({
            totalServices,
            services,
            currentPage: page,
            totalPages: Math.ceil(totalServices / limit)
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}
