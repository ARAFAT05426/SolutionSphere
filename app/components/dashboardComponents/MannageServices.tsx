"use client";

import { useEffect, useState } from "react";
import axiosCommon from "@/utilities/axiosCommon";
import serviceProps from "@/app/types/serviceProps";
import MannageServiceCard from "../cards/MannageServiceCard";
import PaginationButtons from "../buttons/PaginationButtons";
import { FiPlus } from "react-icons/fi";

export default function ManageServices() {
    const [services, setServices] = useState<serviceProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const itemsPerPage = 10; // You can change this value as needed

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const { data } = await axiosCommon.get(`/getservices?page=${currentPage}&limit=${itemsPerPage}`);
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
    }, [currentPage]);

    if (loading) return <p>Loading services...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="my-2.5 mx-0.5 flex items-center gap-5">
                    <div className="">
                        <h1 className="text-3xl tracking-widest ml-1">41</h1>
                        <span>Service Listed</span>
                    </div>
                    <div className="">
                        <h1 className="text-3xl tracking-widest ml-1">37</h1>
                        <span>Active Service</span>
                    </div>
                    <div className="">
                        <h1 className="text-3xl tracking-widest ml-1">09</h1>
                        <span>Blocked Service</span>
                    </div>
                </div>
                <div className="flex items-center gap-2.5">

                    <div>
                        <input className="pl-4 py-1 rounded-sm outline-none" placeholder="Search" type="text" />
                    </div>
                    <button className="px-3 py-2 rounded-sm bg-primary text-white"><FiPlus /></button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-3.5">
                {services.length > 0 ? (
                    services.map((service, i) => (
                        <MannageServiceCard key={i} service={service} />
                    ))
                ) : (
                    <p>No services found.</p>
                )}
            </div>

            {/* Pagination Component */}
            <PaginationButtons
                totalItems={totalPages * itemsPerPage}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage} // Change current page on button click
            />
        </>
    );
}
