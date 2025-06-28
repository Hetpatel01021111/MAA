'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TruckIcon, ScaleIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

type ShippingType = 'standard' | 'express' | 'priority';

interface PricingFormData {
  weight: number;
  length: number;
  width: number;
  height: number;
  fromPin: string;
  toPin: string;
  type: ShippingType;
}

const initialFormData: PricingFormData = {
  weight: 1,
  length: 10,
  width: 10,
  height: 10,
  fromPin: '',
  toPin: '',
  type: 'standard'
};

const shippingTypes = [
  {
    id: 'standard',
    name: 'Standard',
    description: '3-5 business days',
    icon: TruckIcon,
  },
  {
    id: 'express',
    name: 'Express',
    description: '1-2 business days',
    icon: TruckIcon,
  },
  {
    id: 'priority',
    name: 'Priority',
    description: 'Next day delivery',
    icon: TruckIcon,
  },
];

export default function PricingCalculator() {
  const [formData, setFormData] = useState<PricingFormData>(initialFormData);
  const [price, setPrice] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (type: ShippingType) => {
    setFormData((prev) => ({
      ...prev,
      type,
    }));
  };

  const calculatePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple price calculation logic (replace with actual API call)
    const basePrice = 100;
    const volumetricWeight = (formData.length * formData.width * formData.height) / 5000;
    const actualWeight = Math.max(volumetricWeight, formData.weight);
    
    let multiplier = 1;
    switch (formData.type) {
      case 'express':
        multiplier = 1.5;
        break;
      case 'priority':
        multiplier = 2;
        break;
    }

    const calculatedPrice = basePrice * actualWeight * multiplier;
    setPrice(Math.round(calculatedPrice));
    setIsCalculating(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-indigo-50 to-violet-50 relative overflow-hidden" id="calculate">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-violet-500/5" />
        <Image
          src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=1920&q=90"
          alt="Logistics Background"
          fill
          sizes="100vw"
          quality={90}
          style={{ objectFit: 'cover', opacity: 0.05 }}
          className="transform scale-105"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Calculate Shipping Cost
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant shipping quotes with our easy-to-use calculator
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <form onSubmit={calculatePrice} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center text-indigo-900">
                  <ScaleIcon className="w-5 h-5 mr-2 text-indigo-600" />
                  Package Dimensions
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      min="0.1"
                      step="0.1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Length (cm)
                    </label>
                    <input
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Width (cm)
                    </label>
                    <input
                      type="number"
                      name="width"
                      value={formData.width}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center text-indigo-900">
                    <MapPinIcon className="w-5 h-5 mr-2 text-indigo-600" />
                    Locations
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      From (PIN Code)
                    </label>
                    <input
                      type="text"
                      name="fromPin"
                      value={formData.fromPin}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To (PIN Code)
                    </label>
                    <input
                      type="text"
                      name="toPin"
                      value={formData.toPin}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center text-indigo-900">
                  <TruckIcon className="w-5 h-5 mr-2 text-indigo-600" />
                  Shipping Type
                </h3>
                
                <div className="space-y-4">
                  {shippingTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.type === type.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-500'
                      }`}
                      onClick={() => handleTypeChange(type.id as ShippingType)}
                    >
                      <div className="flex items-center">
                        <type.icon className="w-6 h-6 text-indigo-600 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900">{type.name}</h4>
                          <p className="text-sm text-gray-500">{type.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-violet-700 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isCalculating}
                >
                  {isCalculating ? 'Calculating...' : 'Calculate Price'}
                </motion.button>

                {price && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-6 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg text-center"
                  >
                    <p className="text-indigo-100 mb-1">Estimated Price</p>
                    <p className="text-3xl font-bold text-white">₹{price}</p>
                    <p className="text-indigo-100 text-sm mt-2">Includes all taxes and fees</p>
                  </motion.div>
                )}
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}