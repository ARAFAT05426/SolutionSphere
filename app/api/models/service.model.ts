import mongoose, { Document, Schema } from "mongoose";

type TService = Document & {
    status: string;
    title: string;
    description: string;
    category: 'Beauty' | 'Home Repair' | 'Cleaning' | 'Plumbing' | 'Electrical' | 'Gardening' | 'Other';
    provider: mongoose.Types.ObjectId;
    price: number;
    duration: number;
    availability: boolean;
    image: string; // Ensure this is a single image, change if you need an array
    createdAt: Date;
    updatedAt: Date;
};

const serviceSchema: Schema<TService> = new Schema({
    status: {
        type: String,
        required: true,
        default: "active",
        enum: ["active", "blocked"]
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
    image: {
        type: String, // or an array if you need multiple images
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

// Update the updatedAt field before saving
serviceSchema.pre<TService>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Service = mongoose.models.Service || mongoose.model<TService>('Service', serviceSchema);

export default Service;
