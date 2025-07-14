
import React from 'react';
import { Button } from '@/components/ui/button';

const SustainabilitySection = () => {
  return (
    <section className="py-16 bg-puremills-background">
      <div className="container mx-auto px-4">
        <div className="glass rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-puremills-text mb-4">Our Commitment to Sustainability</h2>
              <p className="text-gray-700 mb-6">
                At PureMills, we believe in nurturing both people and planet. Our sustainable practices ensure that every product you purchase makes a positive impact on the environment and communities worldwide.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-puremills-primary mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Organic farming practices that preserve soil health</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-puremills-primary mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Eco-friendly packaging made from recycled or biodegradable materials</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-puremills-primary mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Fair trade partnerships that support farmer livelihoods</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-puremills-primary mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Carbon-neutral shipping and operations</span>
                </li>
              </ul>
              <Button className="bg-puremills-primary hover:bg-puremills-primary/90 text-white self-start">
                Learn More About Our Practices
              </Button>
            </div>
            <div className="relative h-[400px] md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" 
                alt="Sustainable farming practices" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
