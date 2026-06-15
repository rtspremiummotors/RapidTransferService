import { useEffect, useRef } from "react";

let scriptLoaded = false;
let scriptLoading = false;
const callbacks = [];

function loadGoogleMaps(apiKey) {
  if (scriptLoaded) return Promise.resolve();
  if (scriptLoading) return new Promise((res) => callbacks.push(res));
  scriptLoading = true;
  return new Promise((res) => {
    callbacks.push(res);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=en`;
    script.async = true;
    script.onload = () => {
      scriptLoaded = true;
      callbacks.forEach((cb) => cb());
    };
    document.head.appendChild(script);
  });
}

export function usePlacesAutocomplete(inputRef, onSelect) {
  const acRef = useRef(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  useEffect(() => {
    if (!inputRef.current || !apiKey) return;
    loadGoogleMaps(apiKey).then(() => {
      if (!inputRef.current) return;
      const ac = new window.google.maps.places.Autocomplete(inputRef.current, {
        fields: ["formatted_address", "name"],
      });
      acRef.current = ac;
      ac.addListener("place_changed", () => {
        const place = ac.getPlace();
        onSelect(place.formatted_address || place.name || "");
      });
    });
    return () => {
      if (acRef.current) window.google?.maps?.event?.clearInstanceListeners(acRef.current);
    };
  }, []);
}