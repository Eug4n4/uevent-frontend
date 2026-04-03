import { CompanyService } from "@/lib/services/CompanyService";
import {
  type CompanyBillingCreateAttributes,
  type CompanyUpdateAttributes,
  companyBillingCreateSchema,
} from "@/lib/services/types/company.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useRouteLoaderData } from "react-router-dom";
import PlacesAutocomplete, { type PlaceLocation } from "../common/inputs/PlacesAutocomplete";
import { MapPreview } from "../MapPreview";

type FeedbackState =
  | { status: "idle"; message?: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export const CompanySettings = () => {
  const data = useRouteLoaderData<typeof CompanyService.getById>("company-profile");
  const company = data!.data;
  const [selectedPlace, setSelectedPlace] = useState<PlaceLocation>();

  const [offBilling, setOffBilling] = useState(true);
  const [off, setOff] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackState>();
  // billing
  const {
    register,
    reset,
    setValue: bSetValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CompanyBillingCreateAttributes>({
    resolver: zodResolver(companyBillingCreateSchema),
    mode: "all",
  });
  // details
  const {
    register: dRegister,
    control,
    setValue,
    handleSubmit: dHandleSubmit,
    formState: { errors: dErrors },
  } = useForm<CompanyUpdateAttributes>({ defaultValues: { ...company.attributes } });

  useEffect(() => {
    const billing = async () => {
      try {
        const response = await CompanyService.getBilling(company.id);
        bSetValue("stripe_account_id", response.data.attributes.stripe_account_id);
      } catch {
        setError("stripe_account_id", { message: "You don't have stripe account id specified!" });
      }
    };
    billing();
  }, [company.id, setError, bSetValue]);

  const handleBillingCancelClick = () => {
    reset();
    setOffBilling(true);
  };

  const handleCancelClick = () => {
    setOff(true);
  };

  const onBillingSubmit = async (data: CompanyBillingCreateAttributes) => {
    try {
      await CompanyService.createBilling(data, company.id);
      setFeedback({ status: "success", message: "Success!" });
    } catch (e) {
      setFeedback({ status: "error", message: "Error when creating company billing " + e });
    } finally {
      setOffBilling(true);
    }
  };

  const onDetailsSubmit = (data: CompanyUpdateAttributes) => {
    console.log(data);
  };

  return (
    <section className="company-card">
      <Link className="nav-link" to={`/company/${company.id}/tickets/create`}>
        Create tickets
      </Link>
      <form className="create-form" onSubmit={dHandleSubmit(onDetailsSubmit)}>
        <fieldset>
          <legend>Company information</legend>
          <label className="field">
            <span>Name:</span>
            <input {...dRegister("name")} disabled={off} />
          </label>
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
                    setValue("location", { latitude: location.lat, longitude: location.lng });
                    setSelectedPlace(location);
                  }}
                />
              )}
            ></Controller>
            {dErrors.address && <small>{dErrors.address.message}</small>}
          </label>

          <MapPreview
            position={
              selectedPlace || { lat: company.attributes.location.latitude, lng: company.attributes.location.longitude }
            }
          />
        </fieldset>
        <div className="profile-settings-controls">
          <div>
            {off ? (
              <button
                type="button"
                className="pill-btn edit-settings"
                onClick={(e) => {
                  e.preventDefault();
                  setOff(!off);
                }}
              >
                Edit
              </button>
            ) : (
              <>
                <button type="submit" className="pill-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Save"}
                </button>
                <button type="button" className="pill-btn" onClick={handleCancelClick}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </form>
      <form className="company-billing-form" onSubmit={handleSubmit(onBillingSubmit)}>
        {feedback ? <p className={`feedback ${feedback.status}`}>{feedback.message}</p> : null}
        <fieldset>
          <legend>Billing information</legend>
          <label className="field">
            <span>Stripe account id:</span>
            <input {...register("stripe_account_id")} disabled={offBilling} />

            {errors.stripe_account_id && <small>{errors.stripe_account_id.message}</small>}
          </label>
        </fieldset>

        <div className="profile-settings-controls">
          <div>
            {offBilling ? (
              <button
                type="button"
                className="pill-btn edit-settings"
                onClick={(e) => {
                  e.preventDefault();
                  setOffBilling(!offBilling);
                }}
              >
                Edit
              </button>
            ) : (
              <>
                <button type="submit" className="pill-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Save"}
                </button>
                <button type="button" className="pill-btn" onClick={handleBillingCancelClick}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};
