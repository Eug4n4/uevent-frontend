import { MapPreview } from "@/components/MapPreview";
import PlacesAutocomplete, { type PlaceLocation } from "@/components/common/inputs/PlacesAutocomplete";
import type { EventFormat } from "@/components/common/sections/FilterPanel";
import { useMyCompanies } from "@/hooks/companies";
import useTags from "@/hooks/tags";
import type { CompanyDto } from "@/lib/services/types/company.types";
import type { TagDto } from "@/lib/services/types/tag.types";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

// подсказки чисто для презентации
const hints = [
  "Poster upload optional — default art will be used otherwise",
  "Choose who sees attendees: everyone or confirmed visitors",
  "Pick a publication date (immediate or schedule ahead)",
  "Redirect URL is where buyers land after Stripe confirmation",
];

const formatFilters = [
  { label: "Lection", value: "lection" },
  { label: "Workshop", value: "workshop" },
  { label: "Concert", value: "concert" },
  { label: "Meeting", value: "meeting" },
];

type EventFormValues = {
  format: EventFormat | null;
  tags?: TagDto[];
  title: string;
  text: string;
  start_at?: string;
  end_at?: string;
  publish_at?: string;
  address: string;
  location: PlaceLocation;
  banner?: FileList;
  visibility?: "everyone" | "attendees";
  company: CompanyDto | null;
};

// const eventCreateSchema = z.object({
//   title: z.string().min(3, { error: "Title is too short" }),
//   text: z.string().min(10, { error: "Description is too short" }),
//   format: z.object(
//     {
//       label: z.string(),
//       value: z.string(),
//     },
//     { error: "Format is required" },
//   ),
//   tags: z
//     .array(
//       z.object(
//         {
//           id: z.string(),
//           name: z.string(),
//           description: z.optional(z.string()),
//         },
//         { error: "Tags must be an array" },
//       ),
//     )
//     .nullable(),
//   company: z.object(
//     {
//       id: z.string(),
//       name: z.string(),
//       email: z.string(),
//       address: z.string(),
//       banner_url: z.string(),
//     },
//     { error: "Company is required" },
//   ),
//   start_at: z.string({ error: "Start at is required" }),
//   end_at: z.string({ error: "End at is required" }),
//   publish_at: z.string({ error: "Publish at is required" }),
//   address: z.string({ error: "Address  is required" }),
//   location: z.object(
//     {
//       lat: z.number(),
//       lng: z.number(),
//     },
//     { error: "Location is required" },
//   ),
//   banner: z.optional(z.instanceof(FileList)),
//   visibility: z.enum(["everyone", "attendees"]),
// });

// type EventFormValues = z.infer<typeof eventCreateSchema>;

export function EventCreatePage() {
  const [selectedPlace, setSelectedPlace] = useState<PlaceLocation>();
  const { companies, fetchCompanies } = useMyCompanies();
  const { tags } = useTags();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    register,
    setValue,
    watch,
  } = useForm<EventFormValues>({
    defaultValues: { visibility: "everyone", tags: [], format: null, company: null },
  });
  const { ref, ...fields } = register("banner");
  const banner = watch("banner");
  const fileName = banner?.item(0)?.name;
  const onSubmit = (data: EventFormValues) => {
    console.log(JSON.stringify(data));
    const file = data.banner?.item(0);
    if (file) {
      console.log(file.name);
    }
    reset();
  };

  useEffect(() => {
    fetchCompanies({ query: { me: true } });
  }, [fetchCompanies]);

  return (
    <main className="create-layout">
      <section className="story-panel">
        <p className="eyebrow">Create event</p>
        <h2>All config knobs the backend asked for</h2>
        <p className="lead">
          This form is purely illustrative — it mirrors the required fields: posters, attendee visibility, publication
          timing, and redirect URL.
        </p>
        <ul className="profile-task-list">
          {hints.map((hint) => (
            <li key={hint}>{hint}</li>
          ))}
        </ul>
      </section>

      <form className="create-form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Basics</legend>
          <label className="create-form-label">
            <span>Event title</span>
            <input {...register("title")} placeholder="Title" />
            {errors.title && <small>{errors.title.message}</small>}
          </label>
          <label className="create-form-label">
            <span>Description</span>
            <textarea {...register("text")} rows={4} placeholder="Add a description" style={{ resize: "vertical" }} />
            {errors.text && <small>{errors.text.message}</small>}
          </label>
          <label className="create-form-label">
            <span>Format</span>
            <Controller
              name="format"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={field.value}
                  options={formatFilters}
                  getOptionLabel={(op) => op.label}
                  onChange={(_, value) => field.onChange(value)}
                  renderInput={(params) => <TextField {...params} placeholder="Choose format..." />}
                />
              )}
            ></Controller>
          </label>
          <label className="create-form-label">
            <span>Tags</span>
            <Controller
              control={control}
              name="tags"
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={field.value || []}
                  multiple={true}
                  options={tags}
                  getOptionLabel={(op) => op.name}
                  onChange={(_, value) => field.onChange(value)}
                  renderInput={(params) => <TextField {...params} placeholder="Select tags..." />}
                />
              )}
            ></Controller>
          </label>
          <label className="create-form-label">
            <span>Company</span>
            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={field.value}
                  options={companies}
                  getOptionLabel={(op) => op.name}
                  onChange={(_, value) => field.onChange(value)}
                  renderInput={(params) => <TextField {...params} placeholder="Select company..." />}
                />
              )}
            ></Controller>
          </label>
        </fieldset>

        <fieldset>
          <legend>Schedule & location</legend>
          <label className="create-form-label">
            <span>Start date:</span>
            <input type="datetime-local" {...register("start_at")} />
            {errors.start_at && <small>{errors.start_at.message}</small>}
          </label>
          <label className="create-form-label">
            <span>End date:</span>
            <input type="datetime-local" {...register("end_at")} />
            {errors.end_at && <small>{errors.end_at.message}</small>}
          </label>
          <label className="create-form-label">
            <span>Publish date</span>
            <input type="datetime-local" {...register("publish_at")} />
            {errors.publish_at && <small>{errors.publish_at.message}</small>}
          </label>
          <label className="create-form-label">
            <span>Address</span>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <>
                  <PlacesAutocomplete
                    address={field.value}
                    onChange={(address) => field.onChange(address)}
                    onSelected={(location, address) => {
                      field.onChange(address);
                      setValue("location", location);
                      setSelectedPlace(location);
                    }}
                  />
                </>
              )}
            ></Controller>
            {errors.location && <small>{errors.location.message}</small>}
          </label>

          <MapPreview position={selectedPlace} />
        </fieldset>

        <fieldset>
          <legend>Redirects</legend>
          <label className="create-form-label">
            <span>Redirect URL after payment</span>
            <input type="url" placeholder="https://nice.app/thank-you" />
          </label>
        </fieldset>

        <fieldset>
          <legend>Poster upload</legend>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            {...fields}
            ref={(instance) => {
              ref(instance);
              inputRef.current = instance;
            }}
          />
          <div className="upload-drop" onClick={() => inputRef.current?.click()}>
            {!fileName && <p>Click to upload</p>}
            <small>{fileName ? `Selected: ${fileName}` : "JPG/PNG, 2MB limit — optional, default art if empty."}</small>
          </div>
        </fieldset>

        <fieldset>
          <legend>Attendee privacy</legend>
          <div className="radio-group">
            <span>Attendee list visible to</span>
            <label className="create-form-label" htmlFor="everyone-v">
              <input id="everyone-v" type="radio" value={"everyone"} {...register("visibility")} />
              Everyone
            </label>
            <label className="create-form-label" htmlFor="attendees-v">
              <input id="attendees-v" type="radio" value={"attendees"} {...register("visibility")} />
              Only confirmed attendees
            </label>
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="primary-btn">
            Create
          </button>
        </div>
      </form>
    </main>
  );
}
