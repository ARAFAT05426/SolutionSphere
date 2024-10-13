import { useState, useRef } from "react";
import Image from "next/image";
import { CiEdit, CiMenuKebab } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import BaseCard from "./BaseCard";
import serviceProps from "@/app/types/serviceProps";

type ManageServiceCardProps = {
  service: serviceProps;
  onEditService: (service: serviceProps) => void;
  onDeleteService: (serviceProps: serviceProps) => void;
};

const ManageServiceCard = ({ service, onEditService, onDeleteService }: ManageServiceCardProps) => {
  const { title, description, category, price, image } = service;

  // State to manage visibility of the dropdown menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // References for menu-related interactions
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Toggle the menu visibility
  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close the menu
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  // Prevent blur on menu interaction
  const preventBlur = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <BaseCard className="bg-white p-4 rounded border shadow hover:shadow-md transition-all duration-300 ease-in-out">
      {/* Service Image */}
      <div className="relative h-52 w-full mb-3 rounded overflow-hidden">
        <Image
          src={image}
          alt={`${title} image`}
          className="object-cover"
          fill
        />
      </div>

      {/* Service Title and Dropdown Menu */}
      <div className="relative flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 transition-all duration-300 group-hover:text-primary">
          {title}
        </h2>

        {/* Menu Button */}
        <button
          onClick={handleMenuToggle}
          onBlur={handleMenuClose}
          className="focus:outline-none"
          tabIndex={0}
        >
          <CiMenuKebab className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors duration-300" size={20} />
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-2.5 right-5 w-24 bg-white shadow border rounded-sm text-sm z-10"
          >
            <button
              onMouseDown={preventBlur}
              onClick={() => onEditService(service)}
              className="w-full flex items-center gap-1 px-3 py-2 hover:bg-gray-100 transition-all duration-300"
            >
              <CiEdit /> Edit
            </button>
            <button
              onMouseDown={preventBlur}
              onClick={() =>onDeleteService(service)}
              className="w-full flex items-center gap-1 px-3 py-2 text-red-600 hover:bg-gray-100 transition-all duration-300"
            >
              <RiDeleteBin6Line /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Category and Description */}
      <span className="text-sm font-semibold text-gray-600 opacity-75 block mt-2">
        Category: {category}
      </span>
      <p className="text-xs text-gray-600 opacity-75">{description?.slice(0, 100)}...</p>

      {/* Price */}
      <p className="font-bold text-primary mt-3">Price: ${price?.toFixed(2)}</p>
    </BaseCard>
  );
};

export default ManageServiceCard;
