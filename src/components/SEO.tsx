import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
}

const SEO = ({ 
  title = 'PetLifeBook - Memorial Digital para Pets',
  description = 'Crie um memorial digital único para o seu pet. Guarde memórias, fotos e histórias num espaço carinhoso e seguro.',
  image = '/og-image.png',
  url = 'https://petlifebook.pt',
  type = 'website'
}: SEOProps) => {
  const fullTitle = title.includes('PetLifeBook') ? title : `${title} | PetLifeBook`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="pt_PT" />
      <meta property="og:site_name" content="PetLifeBook" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Portuguese" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
