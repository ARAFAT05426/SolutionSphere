import React from 'react';
import { Metadata } from 'next';
import DashboardHeader from '@/app/components/dashboardComponents/DashboardHeader';
import MannageServices from '@/app/components/dashboardComponents/MannageServices';

export const metadata: Metadata = {
  title: 'My Services',
  description: 'Explore the various services we offer, including beauty, home repair, and more.',
};

export default async function MyServices() {
  return (
    <>
      <DashboardHeader title='My Services' className='mb-2.5' />
      <MannageServices />
    </>
  );
};
