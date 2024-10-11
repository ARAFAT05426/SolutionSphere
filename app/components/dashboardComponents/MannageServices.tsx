"use client";
import { useEffect, useState } from "react";
import axiosCommon from "@/utilities/axiosCommon";
import AddServiceModal from "../modals/AddService";
import UpdateServiceModal from "../modals/UpdateServiceModal";
import PaginationButtons from "../buttons/PaginationButtons";
import serviceProps from "@/app/types/serviceProps";
import ManageServiceCard from "../cards/MannageServiceCard";
import ManageServiceControls from "./MannageServiceControls";

export default function ManageServices() {
  const [services, setServices] = useState<serviceProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal and selected service state
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isUpdateServiceOpen, setIsUpdateServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<serviceProps | null>(null);

  const itemsPerPage = 8;

  // Fetch services based on filters, pagination, and search query
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const { data } = await axiosCommon.get(
          `/getservices?page=${currentPage}&limit=${itemsPerPage}&status=${filterStatus}&search=${searchQuery}`
        );
        setServices(data.services);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to fetch services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [currentPage, filterStatus, searchQuery]);

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchQuery(searchTerm);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleEditService = (service: serviceProps) => {
    setIsUpdateServiceOpen(true);
    setSelectedService(service);
  };

  const renderServiceStats = () => (
    <div className="my-2.5 mx-0.5 flex items-center gap-5">
      <StatCard label="Services Listed" value="41" />
      <StatCard label="Active Services" value="37" />
      <StatCard label="Blocked Services" value="09" />
    </div>
  );

  const renderServiceList = () =>
    services.length > 0 ? (
      services.map((service, i) => (
        <ManageServiceCard
          key={i}
          service={service}
          onEditService={handleEditService}
        />
      ))
    ) : (
      <p>No services found.</p>
    );

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="flex items-center justify-between">
        {renderServiceStats()}
        <ManageServiceControls
          onReset={handleReset}
          searchTerm={searchTerm}
          onSearch={handleSearch}
          selectedFilterStatus={filterStatus}
          onAddService={() => setIsAddServiceOpen(true)}
          onSearchTermChange={setSearchTerm}
          onFilterStatusChange={setFilterStatus}
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-4 gap-3.5">{renderServiceList()}</div>

      {/* Pagination */}
      <PaginationButtons
        totalItems={totalPages * itemsPerPage}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Modals */}
      <AddServiceModal
        isOpen={isAddServiceOpen}
        onClose={() => setIsAddServiceOpen(false)}
      />
      <UpdateServiceModal
        isOpen={isUpdateServiceOpen}
        onClose={() => {
          setIsUpdateServiceOpen(false);
          setSelectedService(null);
        }}
        service={selectedService}
      />
    </>
  );
}

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div>
    <h1 className="text-3xl tracking-widest ml-1">{value}</h1>
    <span>{label}</span>
  </div>
);
