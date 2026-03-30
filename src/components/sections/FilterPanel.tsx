import { TagService } from "@/lib/services/TagService";
import type { EventQueryParams } from "@/lib/services/types/event.types";
import type { TagDto } from "@/lib/services/types/tag.types";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type EventFormat = {
  label: string;
  value: string;
};

type EventSort = EventFormat;

type FormatOptions = {
  formatFilters: EventFormat[];
  sortOptions: EventSort[];
};

type FilterPanelProps = FormatOptions & {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (query?: EventQueryParams) => Promise<void>;
};

type FilterFormValues = {
  format: EventFormat | null;
  tags: TagDto[];
  sort: EventSort | null;
};

export function FilterPanel({ formatFilters, sortOptions, onSubmit }: FilterPanelProps) {
  const { control, handleSubmit, reset } = useForm<FilterFormValues>({
    defaultValues: {
      format: null,
      tags: [],
      sort: null,
    },
  });
  const [tags, setTags] = useState<TagDto[]>([]);
  useEffect(() => {
    const getTags = async () => {
      const tags = await TagService.getAll({ "page[limit]": 99, "page[offset]": 0 });
      setTags(
        tags.data.map((tag) => {
          return {
            id: tag.id,
            ...tag.attributes,
          };
        }),
      );
    };
    getTags();
  }, []);

  const submitHandler = (data: FilterFormValues) => {
    const tagIds = data.tags.map((tag) => tag.id);
    const format = data.format?.label;
    const sort = data.sort?.value;
    onSubmit({ format, sort, tag_id: tagIds.length > 0 ? tagIds : undefined });
    reset();
  };

  return (
    <form className="filters-panel" id="events" onSubmit={handleSubmit(submitHandler)}>
      <div className="filter-controls">
        <div className="filter-group">
          <span>Format</span>
          <Controller
            name="format"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={formatFilters}
                getOptionLabel={(op) => op.label}
                onChange={(_, value) => field.onChange(value)}
                renderInput={(params) => <TextField {...params} placeholder="Search..." />}
              />
            )}
          ></Controller>
        </div>

        <div className="filter-group">
          <span>Tags</span>
          <Controller
            control={control}
            name="tags"
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple={true}
                options={tags}
                getOptionLabel={(op) => op.name}
                onChange={(_, value) => field.onChange(value)}
                renderInput={(params) => <TextField {...params} placeholder="Search..." />}
              />
            )}
          ></Controller>
        </div>

        <div className="filter-group">
          <span>Sort by</span>
          <Controller
            name="sort"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                onChange={(_, value) => field.onChange(value)}
                options={sortOptions}
                getOptionLabel={(op) => op.label}
                renderInput={(params) => <TextField {...params} placeholder="Search..." />}
              />
            )}
          ></Controller>
        </div>
      </div>
      <div>
        <button type="submit" className="pill-btn">
          Apply
        </button>
        <button
          type="reset"
          className="pill-btn"
          onClick={() => {
            reset();
            onSubmit();
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
}
