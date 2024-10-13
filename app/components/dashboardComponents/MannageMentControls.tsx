import { FiPlus, FiSearch } from "react-icons/fi";
import { CiUndo } from "react-icons/ci";
import SelectInput from "../inputFields/SelectInput";

interface MannagementControlsProps {
  onAdd?: () => void;
  searchTerm?: string;
  onReset?: () => void;
  onSearch?: () => void;
  placeholder?: string;
  selectedFilterStatus?: string;
  onSearchTermChange: (term: string) => void;
  onFilterStatusChange: (status: string) => void;
  filterOptions: { label: string; value: string }[];
}

export default function MannageMentControls({
  onAdd,
  onReset,
  onSearch,
  searchTerm,
  filterOptions,
  onSearchTermChange,
  onFilterStatusChange,
  selectedFilterStatus,
  placeholder = "Search",
}: MannagementControlsProps) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Search Input */}
      <div className="relative flex items-center border border-gray-200/50">
        <input
          type="text"
          className="h-full min-h-10 max-h-10 pl-4 pr-10 py-2 rounded-sm outline-none"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          aria-label="Search input"
        />
        <button
          className="border bg-primary-bg h-full min-h-10 max-h-10 px-2.5 hover:bg-primary hover:text-white transition-all duration-300"
          onClick={onSearch}
          aria-label="Search"
        >
          <FiSearch />
        </button>
      </div>

      {/* Filter Status Select */}
      <SelectInput
        placeholder="Filter By Status"
        selectedValue={selectedFilterStatus}
        options={filterOptions}
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

      {/* Add Button */}
      <button
        className="px-3 h-full min-h-10 max-h-10 rounded-sm bg-primary text-white"
        onClick={onAdd}
        aria-label="Add new item"
      >
        <FiPlus />
      </button>
    </div>
  );
}
