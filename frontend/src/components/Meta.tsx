import React from 'react';
import { Helmet } from 'react-helmet';

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export const Meta: React.FC<MetaProps> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to | Home',
  description: 'We sell the best products for cheap',
  keywords: 'electorincs cheap cool'
};
