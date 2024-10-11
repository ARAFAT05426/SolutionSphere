import React, { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import serviceProps from "@/app/types/serviceProps";
import TextInput from "../inputFields/TextInput";
import SelectInput from "../inputFields/SelectInput";
import TextAreaInput from "../inputFields/TextAreaInput";
import ActionButton from "../buttons/ActionButton";
import ImageInput from "../inputFields/ImageInput";
import useImageUploader from "@/app/hooks/useImageUploader";
import axiosCommon from "@/utilities/axiosCommon";

interface UpdateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: serviceProps | null;
}

const UpdateServiceModal: React.FC<UpdateServiceModalProps> = ({ isOpen, onClose, service }) => {
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { uploadImage } = useImageUploader();

  useEffect(() => {
    if (service) {
      setCategory(service.category);
    }
  }, [service]);

  const handleImageChange = (files: FileList) => {
    if (files.length > 0) {
      setSelectedImage(files[0]);
    }
  };


  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = (e.currentTarget.elements.namedItem("title") as HTMLInputElement).value;
    const price = parseFloat((e.currentTarget.elements.namedItem("price") as HTMLInputElement).value);
    const duration = parseFloat((e.currentTarget.elements.namedItem("duration") as HTMLInputElement).value);
    const description = (e.currentTarget.elements.namedItem("description") as HTMLTextAreaElement).value;

    if (!title || !category || isNaN(price) || isNaN(duration)) {
      alert("Please fill in all required fields with valid data.");
      return;
    }

    let hostedURL: string | null = null;
    setLoading(true); // Start loading

    if (selectedImage) {
      try {
        hostedURL = await uploadImage(selectedImage);
        console.log("Hosted URL:", hostedURL);
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false);
        return;
      }
    }

    const updateData = {
      id: service?._id,
      title,
      category,
      price,
      duration,
      description,
      image: hostedURL || service?.image,
    };

    try {
      const { data } = await axiosCommon.put("/updateservice", updateData);
      console.log("Update response:", data);
      onClose();
    } catch (error) {
      console.error("Error updating service:", error);
    } finally {
      setLoading(false); // End loading
    }
  };


  if (!service) return null;

  return (
    <BaseModal classname="max-w-2xl" isOpen={isOpen} onClose={onClose}>
      <h2 className="text-center text-2xl font-bold mb-2.5">Update Service</h2>
      <form className="grid grid-cols-2 gap-2.5" onSubmit={handleUpdate}>
        <ImageInput
          className="col-span-2"
          name="image"
          defaultImage={service.image}
          onChange={handleImageChange}
        />
        <TextInput name="title" defaultValue={service.title} />
        <SelectInput
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
          onChange={(value) => value && setCategory(value)}
        />
        <TextInput name="price" type="number" defaultValue={service.price} />
        <TextInput name="duration" defaultValue={service.duration} />
        <TextAreaInput className="col-span-2" name="description" defaultValue={service.description} />
        <ActionButton className="col-span-2" type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Service'}
        </ActionButton>

      </form>
    </BaseModal>
  );
};

export default UpdateServiceModal;
