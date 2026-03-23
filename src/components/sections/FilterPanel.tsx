type FilterPanelProps = {
  formatFilters: string[]
  themeFilters: string[]
  sortOptions: Array<{ label: string; value: string }>
  formatFilter: string
  themeFilter: string
  sortBy: string
  onFormatChange: (value: string) => void
  onThemeChange: (value: string) => void
  onSortChange: (value: string) => void
  categoryLabel: string
}

export function FilterPanel({
  formatFilters,
  themeFilters,
  sortOptions,
  formatFilter,
  themeFilter,
  sortBy,
  onFormatChange,
  onThemeChange,
  onSortChange,
  categoryLabel,
}: FilterPanelProps) {
  return (
    <section className="filters-panel" id="events">
      <div>
        <p className="eyebrow">Upcoming tracks</p>
        <h3>{categoryLabel} over the next weeks</h3>
      </div>
      <div className="filter-controls">
        <div className="filter-group">
          <span>Format</span>
          <div>
            {formatFilters.map((format) => (
              <button
                key={format}
                type="button"
                className={formatFilter === format ? "chip glow" : "chip"}
                onClick={() => onFormatChange(format)}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span>Theme</span>
          <div>
            {themeFilters.map((theme) => (
              <button
                key={theme}
                type="button"
                className={themeFilter === theme ? "chip glow" : "chip"}
                onClick={() => onThemeChange(theme)}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        <div className="sort-control">
          <label htmlFor="sort">Sort by</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}
