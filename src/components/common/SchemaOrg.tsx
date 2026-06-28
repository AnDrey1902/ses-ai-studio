import React from 'react';

interface SchemaOrgProps {
  type: 'organization' | 'faq' | 'article' | 'reviews';
  data?: Record<string, any>;
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GURU ENERGY',
  alternateName: 'ГУРУ ЕНЕРДЖІ',
  url: 'https://guru-energy.com.ua',
  logo: 'https://guru-energy.com.ua/logo.png',
  description: 'Проектування, постачання обладнання Tier-1 та професійний монтаж сонячних електростанцій під ключ в Україні',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Київ',
    streetAddress: 'вул. Енергетиків 44',
    addressCountry: 'UA'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+380800330444',
    contactType: 'customer service',
    availableLanguage: ['Ukrainian', 'Russian', 'English']
  },
  sameAs: [
    'https://t.me/guru_energy_solar'
  ]
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'GURU ENERGY',
  image: 'https://guru-energy.com.ua/office.jpg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Київ',
    streetAddress: 'вул. Енергетиків 44, БЦ «Solar Tower»',
    addressRegion: 'Київська область',
    postalCode: '03115',
    addressCountry: 'UA'
  },
  telephone: '+380800330444',
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    }
  ]
};

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GURU ENERGY',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1'
  }
};

function buildFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

function buildArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'GURU ENERGY',
      logo: {
        '@type': 'ImageObject',
        url: 'https://guru-energy.com.ua/logo.png'
      }
    }
  };
}

function buildReviewSchema(reviews: Array<{
  author: string;
  rating: number;
  text: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GURU ENERGY',
    review: reviews.map(r => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5
      },
      reviewBody: r.text
    }))
  };
}

export const SchemaOrg: React.FC<SchemaOrgProps> = ({ type, data }) => {
  let schema: Record<string, any>;

  switch (type) {
    case 'organization':
      schema = { ...organizationSchema, ...localBusinessSchema, ...aggregateRatingSchema };
      break;
    case 'faq':
      schema = buildFaqSchema(data?.faqs || []);
      break;
    case 'article':
      schema = buildArticleSchema(data || { title: '', description: '', image: '', datePublished: '', author: '' });
      break;
    case 'reviews':
      schema = buildReviewSchema(data?.reviews || []);
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
