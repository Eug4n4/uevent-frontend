import { Autocomplete, TextField } from "@mui/material";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
export type PlaceLocation = {
  lat: number;
  lng: number;
};

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSelected: (location: PlaceLocation, address: string) => void;
  // eslint-disable-next-line no-unused-vars
  onChange?: (address: string) => void;
  address?: string;
};

const PlacesAutocomplete = ({ address, onChange, onSelected }: Props) => {
  const places = useMapsLibrary("places");

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300, initOnMount: !!places });
  const options =
    status === "OK" ? data.map(({ place_id, description }) => ({ id: place_id, label: description })) : [];

  return (
    <Autocomplete
      inputValue={address ?? value}
      options={options}
      onInputChange={(_, value) => {
        setValue(value);
        onChange?.(value);
      }}
      onChange={async (_, value) => {
        if (value) {
          setValue(value.label, false);
          clearSuggestions();
          const results = await getGeocode({ address: value.label });
          const { lat, lng } = getLatLng(results[0]);
          onSelected({ lat, lng }, value.label);
        }
      }}
      getOptionLabel={(option) => option.label}
      disablePortal
      disabled={!ready}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default PlacesAutocomplete;
