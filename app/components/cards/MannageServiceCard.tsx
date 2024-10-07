import { useState, useRef } from "react";
import { CiEdit, CiMenuKebab } from "react-icons/ci";
import BaseCard from "./BaseCard";
import Image from 'next/image';
import { RiDeleteBin6Line } from "react-icons/ri";

type ManageServiceCardProps = {
  service: {
    title: string;
    description: string;
    category: 'Beauty' | 'Home Repair' | 'Cleaning' | 'Plumbing' | 'Electrical' | 'Gardening' | 'Other';
    price: number;
    images: string[];
  };
};

const ManageServiceCard = ({ service }: ManageServiceCardProps) => {
  const { title, description, category, price, images } = service;
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuToggle = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleMenuClose = () => {
    setMenuVisible(false);
  };

  return (
    <BaseCard className="bg-white p-4 rounded border shadow hover:shadow-md transition-all duration-300 ease-in-out">
      {/* Service Image */}
      <div className="relative h-52 w-full mb-3 rounded overflow-hidden">
        {images.length > 0 ? (
          <Image
            src={images[0]}
            alt={`${title} image`}
            className="object-cover"
            fill
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
            <p className="text-gray-500">No Image</p>
          </div>
        )}
      </div>

      {/* Service Title and Dropdown Menu */}
      <div className="relative flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-all duration-300">
          {title}
        </h2>
        <button
          onClick={handleMenuToggle}
          onBlur={handleMenuClose}
          className="focus:outline-none"
          tabIndex={0}
        >
          <CiMenuKebab className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors duration-300" size={20} />
        </button>

        {/* Dropdown Menu */}
        {isMenuVisible && (
          <div
            ref={menuRef}
            tabIndex={-1}
            className="absolute top-2.5 right-5 w-24 bg-white shadow border rounded-sm text-sm z-10"
          >
            <button className="w-full flex items-center gap-1 px-3 py-2 hover:bg-gray-100 transition-all duration-300">
              <CiEdit /> Edit
            </button>
            <button className="w-full flex items-center gap-1 px-3 py-2 text-red-600 hover:bg-gray-100 transition-all duration-300">
              <RiDeleteBin6Line /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Category and Description */}
      <span className="text-sm font-semibold text-gray-600 my-1 opacity-75 block">
        Category: {category}
      </span>
      <p className="text-xs text-gray-600 opacity-75">{description.slice(0, 100)}...</p>

      {/* Price */}
      <p className="font-bold text-primary mt-3">Price: ${price.toFixed(2)}</p>
    </BaseCard>
  );
};

export default ManageServiceCard;
