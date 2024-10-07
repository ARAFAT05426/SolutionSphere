import mongoose, { Document, Schema } from "mongoose";

type TService = Document & {
    status: boolean;
    title: string;
    description: string;
    category: 'Beauty' | 'Home Repair' | 'Cleaning' | 'Plumbing' | 'Electrical' | 'Gardening' | 'Other';
    provider: mongoose.Types.ObjectId;
    location: string;
    price: number;
    duration: number;
    availability: boolean;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
};

const serviceSchema: Schema<TService> = new Schema({
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Beauty', 'Home Repair', 'Cleaning', 'Plumbing', 'Electrical', 'Gardening', 'Other'],
        required: true,
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    duration: {
        type: Number,
        required: true,
    },
    availability: {
        type: Boolean,
        required: true,
        default: true,
    },
    images: [{
        type: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

// Middleware to update `updatedAt` field before saving
serviceSchema.pre<TService>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Create the Service model, checking if it already exists
const Service = mongoose.models.Service || mongoose.model<TService>('Service', serviceSchema);

export default Service;
