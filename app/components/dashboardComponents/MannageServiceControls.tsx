import { FiPlus, FiSearch } from "react-icons/fi";
import { CiUndo } from "react-icons/ci";
import SelectInput from "../inputFields/SelectInput";

interface ManageServiceControlsProps {
  searchTerm: string;
  onReset: () => void;
  selectedFilterStatus: string;
  onSearch: () => void;
  onAddService: () => void;
  onSearchTermChange: (term: string) => void;
  onFilterStatusChange: (status: string) => void;
}

export default function ManageServiceControls({
  searchTerm,
  onReset,
  selectedFilterStatus,
  onSearch,
  onAddService,
  onSearchTermChange,
  onFilterStatusChange,
}: ManageServiceControlsProps) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Search Input */}
      <div className="relative flex items-center border border-gray-200/50">
        <input
          type="text"
          className="h-full min-h-10 max-h-10 pl-4 pr-10 py-2 rounded-sm outline-none"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          aria-label="Search input"
        />
        <button
          className="border bg-primary-bg h-full min-h-10 max-h-10 px-2.5 hover:bg-primary hover:text-white transition-all duration-300"
          onClick={onSearch}
          aria-label="Search services"
        >
          <FiSearch />
        </button>
      </div>

      {/* Filter Status Select */}
      <SelectInput
        placeholder="Filter By Status"
        selectedValue={selectedFilterStatus}
        options={[
          { label: "All", value: "all" },
          { label: "Active", value: "active" },
          { label: "Blocked", value: "blocked" },
        ]}
        onChange={(value) => value && onFilterStatusChange(value)}
      />

      {/* Reset Button */}
      <button
        className="px-3 h-full min-h-10 max-h-10 rounded-sm bg-primary text-white"
        onClick={onReset}
        aria-label="Reset filters"
      >
        <CiUndo strokeWidth={1} />
      </button>

      {/* Add Service Button */}
      <button
        className="px-3 h-full min-h-10 max-h-10 rounded-sm bg-primary text-white"
        onClick={onAddService}
        aria-label="Add new service"
      >
        <FiPlus />
      </button>
    </div>
  );
}
