import React from 'react';

type Header = {
    header: string;
    accessor: string;
};

type ColumnData = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};

type BaseTableProps = {
    className?: string;
    topHeading?: React.ReactNode;
    headers: Header[];
    columns: ColumnData[];
};

const BaseTable: React.FC<BaseTableProps> = ({
    className = '',
    topHeading = <></>,
    headers = [],
    columns = [],
}) => {
    return (
        <div className={`relative ${className} bg-white pt-5 rounded-sm border shadow-sm`}>
            {topHeading}
            <div className="overflow-x-auto p-5">
                <table className="min-w-full overflow-x-auto border border-collapse">
                    <thead className="bg-primary-bg/75">
                        <tr className="rounded-md">
                            {headers.map((column, index) => (
                                <th
                                    key={index}
                                    className="text-left py-3 px-3 md:px-4 rounded border font-bold text-gray-700"
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="font-medium divide-y">
                        {columns.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="text-sm hover:bg-primary-bg/25 transition-all duration-200"
                            >
                                {headers.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="py-3 px-3 md:px-4 border text-gray-700 whitespace-nowrap"
                                    >
                                        {row[column?.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BaseTable;
