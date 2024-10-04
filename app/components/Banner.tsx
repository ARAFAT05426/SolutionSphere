import Image from 'next/image';
import React from 'react';
import PrimaryLinkButton from './buttons/PrimaryLinkButton ';
export default function Banner() {
  return (
    <section className='container px-2.5 lg:px-5 xl:px-0 flex flex-col-reverse xl:flex-row items-center gap-8 md:gap-16 pt-20'>

      {/* Text Section */}
      <div className='w-full xl:w-1/2 flex flex-col items-center lg:items-start space-y-2.5'>
        <h1 className='text-center lg:text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-800'>
          Professional Services For Your <span className='text-primary'>Home & Commercial</span>
        </h1>
        <p className='text-gray-700 text-center lg:text-left text-base md:text-lg xl:text-2xl pb-2.5 tracking-wide leading-relaxed'>
          We provide a wide range of services to enhance your living and working spaces, ensuring quality and professionalism in every task.
        </p>
        <PrimaryLinkButton path='/' classname='text-base xl:text-2xl'>
          Explore More
        </PrimaryLinkButton>
      </div>

      {/* Image Section */}
      <div className='relative w-full xl:w-1/2 h-[40vh] lg:h-[60vh] xl:h-[80vh]'>
        <Image src={`/banner.png`} alt='banner' fill className='object-cover object-center' />
      </div>

    </section>
  );
}
