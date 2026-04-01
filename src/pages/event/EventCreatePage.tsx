import { MapPreview } from "@/components/MapPreview";
import PlacesAutocomplete, { type PlaceLocation } from "@/components/common/inputs/PlacesAutocomplete";
import type { EventFormat } from "@/components/common/sections/FilterPanel";
import { useMyCompanies } from "@/hooks/companies";
import useTags from "@/hooks/tags";
import { EventService } from "@/lib/services/EventService";
import type { CompanyDto } from "@/lib/services/types/company.types";
import type { EventRelationships } from "@/lib/services/types/event.types";
import type { TagDto } from "@/lib/services/types/tag.types";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const hints = [
  "Poster upload optional — default art will be used otherwise",
  "Choose who sees attendees: everyone or confirmed visitors",
  "Pick a publication date",
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
  start_at: string;
  end_at: string;
  publish_at: string;
  address: string;
  location: PlaceLocation;
  banner?: FileList;
  visibility?: "everyone" | "staff_and_visitors";
  notification_new_tickets: boolean;
  company: CompanyDto | null;
};

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

  const onSubmit = async (data: EventFormValues) => {
    const eventAttributes = {
      title: data.title,
      text: data.text,
      start_at: new Date(data.start_at).toISOString(),
      end_at: new Date(data.end_at).toISOString(),
      publish_at: new Date(data.publish_at).toISOString(),
      format: data.format!.label,
      notification_new_tickets: data.notification_new_tickets,
      visitors_visibility: data.visibility!,
      location: {
        latitude: data.location.lat,
        longitude: data.location.lng,
      },
    };
    const eventRelationships: EventRelationships = {
      company: {
        data: {
          type: "company",
          id: data.company!.id,
        },
      },
    };

    if (data.tags && data.tags.length > 0) {
      eventRelationships["tags"] = {
        data: data.tags.map((tag) => {
          return {
            id: tag.id,
            type: "tag" as "tag",
          };
        }),
      };
    }
    let file: File | null | undefined | Blob = data.banner?.item(0);
    if (!file) {
      file = await fetch("/favicon.svg").then((response) => response.blob());
    }
    const create = async () => {
      try {
        const event = await EventService.create({
          data: { type: "event", attributes: eventAttributes, relationships: eventRelationships },
        });
        await EventService.uploadBanner(event.data.id, file!);
        reset();
      } catch (e) {
        console.error(e);
      }
    };
    create();
  };

  useEffect(() => {
    fetchCompanies({ query: { me: true } });
  }, [fetchCompanies]);

  return (
    <main className="create-layout">
      <section className="story-panel">
        <p className="eyebrow">Create event</p>
        <h2>It is the place where events are created!</h2>
        <p className="lead">Here you can select a poster, set attendee visibility, start, end and publication date.</p>
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
                <PlacesAutocomplete
                  address={field.value}
                  onChange={(address) => field.onChange(address)}
                  onSelected={(location, address) => {
                    field.onChange(address);
                    setValue("location", location);
                    setSelectedPlace(location);
                  }}
                />
              )}
            ></Controller>
            {errors.location && <small>{errors.location.message}</small>}
          </label>

          <MapPreview position={selectedPlace} />
        </fieldset>

        <fieldset>
          <legend>Notifications</legend>
          <label className="create-form-label" htmlFor="notify_new_visitors">
            <span>I want to be notified about new visitors</span>
            <input id="notify_new_visitors" type="checkbox" {...register("notification_new_tickets")} />
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
              <input id="attendees-v" type="radio" value={"staff_and_visitors"} {...register("visibility")} />
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
