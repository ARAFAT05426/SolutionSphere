import React from 'react';

type PageBannerProps = {
  title: string;
  sub_title: string;
};

export default function PageBanner({ title = "", sub_title = "" }: PageBannerProps) {
  return (
    <div
      className="min-h-96 bg-center bg-fixed bg-cover bg-no-repeat flex items-center justify-center relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.25)), url('/page-banner.jpg')`,
      }}
    >
      <div className="text-center text-white z-10">
        <h1 className="text-7xl font-bold">{title}</h1>
        <h3 className="text-xl mt-4">Home {">" + " " + sub_title}</h3>
      </div>

      {/* Optional: If you want a solid overlay for more emphasis */}
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
    </div>
  );
}
