"use client";
import BaseTable from "../tables/BaseTable";
import { useEffect, useState } from "react";
import userProps from "@/app/types/userProps";
import axiosCommon from "@/utilities/axiosCommon";
import MannageMentControls from "./MannageMentControls";
import PaginationButtons from "../buttons/PaginationButtons";

export default function ManageUser() {
  const [users, setUsers] = useState<userProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      try {
        // Build query params for pagination and search
        const params = new URLSearchParams({
          limit: itemsPerPage.toString(),
          page: currentPage.toString(),
          search: searchQuery,
        }).toString();

        const { data } = await axiosCommon.get(`/getusers?${params}`);
        setUsers(data.users);
        setTotalPages(Math.ceil(data.totalCount / itemsPerPage));
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [itemsPerPage, currentPage, searchQuery]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
    setSearchQuery(searchTerm); // Apply search query
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setCurrentPage(1);
    setSearchQuery(""); // Reset search
  };

  const paginatedUsers = users; // No need to slice; API handles pagination

  const headers = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Status", accessor: "status" },
  ];

  const renderUserStats = () => (
    <div className="my-2.5 mx-0.5 flex items-center gap-5">
      <StatCard label="Total Users" value={users.length.toString()} />
      <StatCard label="Total Providers" value="37" />
      <StatCard label="Blocked Users" value="09" />
    </div>
  );

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

    function setIsAddUserOpen(arg0: boolean): void {
        throw new Error("Function not implemented.");
    }

  return (
    <>
      <div className="flex items-center justify-between">
        {renderUserStats()}
        <MannageMentControls
          onReset={handleReset}
          searchTerm={searchTerm}
          onSearch={handleSearch}
          selectedFilterStatus={filterStatus}
          onAdd={() => setIsAddUserOpen(true)}
          onSearchTermChange={setSearchTerm}
          onFilterStatusChange={setFilterStatus}
          filterOptions={[
            { label: "All", value: "all" },
            { label: "Active", value: "active" },
            { label: "Blocked", value: "blocked" },
          ]}
        />
      </div>

      {/* Users Table */}
      <BaseTable headers={headers} columns={paginatedUsers} className="mt-5" />

      {/* Pagination */}
      <PaginationButtons
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalPages * itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
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
