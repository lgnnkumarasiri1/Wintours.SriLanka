import React from 'react';
import { Helmet } from 'react-helmet';
interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
}
const SEO: React.FC<SEOProps> = ({
  title = 'WinTours Sri Lanka - Unforgettable Sri Lankan Adventures',
  description = 'Explore the paradise island of Sri Lanka with our expertly crafted tours. From ancient temples to pristine beaches, experience the true essence of Sri Lanka.',
  keywords = 'Sri Lanka, tours, travel, adventures, beaches, wildlife, heritage, safari',
  ogImage = "/bg3.png",
  ogUrl = 'https://wintours.com',
  ogType = 'website'
}) => {
  const siteTitle = title.includes('WinTours') ? title : `${title} | WinTours Sri Lanka | sri lanka travel agency | sri lanka tour package | best travel Agency sri lanka`;
  return <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      {/* Canonical URL */}
      <link rel="canonical" href={ogUrl} />
    </Helmet>;
};
export default SEO;