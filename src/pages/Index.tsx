
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import SustainabilitySection from '@/components/home/SustainabilitySection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedCollections />
      <FeaturedProducts />
      <SustainabilitySection />
    </Layout>
  );
};

export default Index;
