import type { PlaceLocation } from "@/components/common/inputs/PlacesAutocomplete";
import PlacesAutocomplete from "@/components/common/inputs/PlacesAutocomplete";
import { MapPreview } from "@/components/MapPreview";
import { CompanyService } from "@/lib/services/CompanyService";
import type { CompanyCreateAttributes } from "@/lib/services/types/company.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const checklist = ["Company name, email, location are required", "Upload a logo/poster to use across events"];

const companyCreateSchema = z.object({
  name: z.string().min(5, { error: "Name is too short" }).max(50, { error: "Name is too long" }),
  email: z.email({ error: "Invalid email" }),
  address: z.string({ error: "Address is required" }),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  banner: z.optional(z.instanceof(FileList)),
});

type CompanyCreate = z.infer<typeof companyCreateSchema>;

export function CompanyCreatePage() {
  const [selectedPlace, setSelectedPlace] = useState<PlaceLocation>();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    register,
    setValue,
    watch,
  } = useForm<CompanyCreate>({ resolver: zodResolver(companyCreateSchema), mode: "all" });
  const { ref, ...fields } = register("banner");
  const banner = watch("banner");
  const fileName = banner?.item(0)?.name;

  const onSubmit = async (data: CompanyCreate) => {
    const attributes: CompanyCreateAttributes = {
      ...data,
      location: {
        latitude: data.location.lat,
        longitude: data.location.lng,
      },
    };
    try {
      const company = await CompanyService.create(attributes);
      let file: File | null | undefined | Blob = data.banner?.item(0);
      if (!file) {
        file = await fetch("/favicon.svg").then((response) => response.blob());
      }
      await CompanyService.uploadBanner(file!, company.data.id);
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="create-layout">
      <section className="story-panel">
        <p className="eyebrow">Create company</p>
        <h2>It is the place where company is created!</h2>
        <ul className="profile-task-list">
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <form className="create-form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Company basics</legend>
          <label className="create-form-label">
            <span>Name:</span>
            <input type="text" placeholder="Placeholder Ventures" {...register("name")} />
            {errors.name && <small>{errors.name.message}</small>}
          </label>
          <label className="create-form-label">
            <span>Contact email:</span>
            <input type="email" placeholder="founders@placeholder.co" {...register("email")} />
            {errors.email && <small>{errors.email.message}</small>}
          </label>
        </fieldset>

        <fieldset>
          <legend>Branding</legend>
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
            {!fileName && <p>Upload company logo / poster</p>}
            <small>
              {fileName ? `Selected: ${fileName}` : "PNG/SVG preferred. Optional — default ice cube mascot otherwise."}
            </small>
          </div>
        </fieldset>

        <fieldset>
          <legend>Office location</legend>
          <label className="create-form-label">
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
            {errors.address && <small>{errors.address.message}</small>}
          </label>

          <MapPreview position={selectedPlace} />
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="primary-btn">
            Create company
          </button>
        </div>
      </form>
    </main>
  );
}
