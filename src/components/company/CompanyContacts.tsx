import type { CompanyService } from "@/lib/services/CompanyService";
import { useRouteLoaderData } from "react-router-dom";
import { MapPreview } from "../MapPreview";

export const CompanyContacts = () => {
  const data = useRouteLoaderData<typeof CompanyService.getById>("company-profile");
  const company = data!.data;
  return (
    <section className="story-panel">
      <p className="eyebrow">Company profile</p>
      <h2>{company.attributes.name}</h2>
      <section className="company-card">
        <h3>Contact information</h3>
        <p>Email: {company.attributes.email}</p>
        <p>Location: {company.attributes.address}</p>

        <MapPreview
          position={{ lat: company.attributes.location.latitude, lng: company.attributes.location.longitude }}
        />
      </section>
    </section>
  );
};
