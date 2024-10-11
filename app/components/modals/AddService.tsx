import { useState } from "react";
import BaseModal from "./BaseModal";
import TextInput from "../inputFields/TextInput";
import axiosCommon from "@/utilities/axiosCommon";
import ActionButton from "../buttons/ActionButton";
import ImageInput from "../inputFields/ImageInput";
import SelectInput from "../inputFields/SelectInput";
import { useAuth } from "@/app/contexts/AuthProvider";
import TextAreaInput from "../inputFields/TextAreaInput";
import useImageUploader from "@/app/hooks/useImageUploader";

interface AddServiceProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddService: React.FC<AddServiceProps> = ({ isOpen, onClose }) => {

    const { user } = useAuth()
    const [loading, setLoading] = useState<boolean>(false);
    const [category, setCategory] = useState<string>("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { uploadImage } = useImageUploader();

    const handleImageChange = (files: FileList) => {
        if (files.length > 0) {
            setSelectedImage(files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Collect form values
        const title = (e.currentTarget.elements.namedItem("title") as HTMLInputElement).value;
        const price = parseFloat((e.currentTarget.elements.namedItem("price") as HTMLInputElement).value);
        const duration = parseFloat((e.currentTarget.elements.namedItem("duration") as HTMLInputElement).value);
        const description = (e.currentTarget.elements.namedItem("description") as HTMLTextAreaElement).value;

        let hostedURL: string | null = null;
        if (selectedImage) {
            hostedURL = await uploadImage(selectedImage);
        }

        const serviceData = {
            title,
            description,
            category,
            price,
            duration,
            availability: true,
            provider: user?._id,
            image: hostedURL,
        };

        try {
            const response = await axiosCommon.post('/createservice', serviceData);
            console.log("Service created successfully:", response.data);
            setLoading(false); // End loading
            onClose();
            // Add success notification here
        } catch (error) {
            console.error("Error creating service:", error);
            setLoading(false); // End loading
            // Add error notification here
        }
    };

    return (
        <BaseModal classname="max-w-2xl" isOpen={isOpen} onClose={onClose}>
            <h1 className="text-center font-bold text-2xl">Add New Service</h1>
            <form className="grid grid-cols-2 gap-2.5" onSubmit={handleSubmit}>
                {/* ImageInput to handle single image */}
                <ImageInput
                    className="col-span-2"
                    name="image"
                    onChange={handleImageChange}
                />
                <TextInput name="title" placeholder="Service Title *" required />
                <SelectInput
                    placeholder="Service Category *"
                    selectedValue={category}
                    options={[
                        { label: "Beauty", value: "Beauty" },
                        { label: "Home Repair", value: "Home Repair" },
                        { label: "Cleaning", value: "Cleaning" },
                        { label: "Plumbing", value: "Plumbing" },
                        { label: "Electrical", value: "Electrical" },
                        { label: "Gardening", value: "Gardening" },
                        { label: "Other", value: "Other" },
                    ]}
                    onChange={(value) => {
                        if (value !== null) {
                            setCategory(value);
                        }
                    }}
                />
                <TextInput name="price" placeholder="Service Price *" type="number" required />
                <TextInput name="duration" placeholder="Service Duration *" type="number" required />
                <TextAreaInput className="col-span-2" name="description" placeholder="Service Description *" required />
                <ActionButton type="submit" className="col-span-2" disabled={loading}>
                    {loading ? 'Submitting...' : 'Add Service'}
                </ActionButton>
            </form>
        </BaseModal>
    );
};

export default AddService;
