import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"]; // add other libraries if needed

export default function MyApp({ Component, pageProps }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // use environment variable
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return <Component {...pageProps} />;
}
