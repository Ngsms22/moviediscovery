 const SortOption = ({ label, value, options, onChange }) => {
  return (
    <div className="filter">
      <label>{label}:</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All {label}s</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {label === "Rating" ? `${opt}+ Stars` : opt}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SortOption
