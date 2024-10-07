import React from 'react';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function PaginationButtons({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Create an array of page numbers manually
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="flex justify-center my-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3.5 py-1.5 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-primary text-white'}`}
            >
                Previous
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-3.5 py-1.5 rounded mx-1 ${number === currentPage ? 'bg-primary text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                >
                    {number}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3.5 py-1.5 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-primary text-white'}`}
            >
                Next
            </button>
        </div>
    );
}
