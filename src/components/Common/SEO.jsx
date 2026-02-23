import { Helmet } from 'react-helmet-async'
import { APP_NAME } from '@/utils/constants'

const SEO = ({ 
  title, 
  description = 'Premium Quality Pure Desi Ghee - Traditional, Authentic, and Healthy',
  keywords = 'ghee, desi ghee, pure ghee, organic ghee, A2 ghee, cow ghee',
  image = '/og-image.svg',
  url = window.location.href,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  structuredData,
  noindex = false,
  breadcrumbs
}) => {
  const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME
  const fullImageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vashudha Ghee',
    url: window.location.origin,
    logo: `${window.location.origin}/og-image.svg`,
    description: 'Premium quality pure desi ghee made from finest cow milk using traditional methods',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi']
    },
    sameAs: [
      'https://www.facebook.com/vashudhaghee',
      'https://www.instagram.com/vashudhaghee',
      'https://twitter.com/vashudhaghee'
    ]
  }

  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${window.location.origin}${crumb.path}`
    }))
  } : null

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {author && <meta name="author" content={author} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow" />}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@vashudhaghee" />

      {/* Additional Meta Tags */}
      <link rel="canonical" href={url} />

      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Structured Data - Breadcrumbs */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Custom Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO
