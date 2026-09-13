import { Helmet } from "react-helmet-async";

const SITE_URL = "https://rapidtransferservice.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Drop this once at the top of any page to control that page's SEO tags.
 * `structuredData` accepts a single JSON-LD object or an array of them.
 */
export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  noindex = false,
  structuredData = null,
}) {
  const url = `${SITE_URL}${path}`;
  const schemas = Array.isArray(structuredData)
    ? structuredData
    : structuredData
    ? [structuredData]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Rapid Transfer Service" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export { SITE_URL };