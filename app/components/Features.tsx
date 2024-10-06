import features from '../static/features';

export default function Features() {
    return (
        <section
            className='w-full min-h-64 bg-center bg-cover bg-no-repeat border-y border-opacity-25'
            style={{ backgroundImage: `url('/features-bg.png')` }}
        >
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2.5 items-center py-10'>
                {features?.map((feature, i) => (
                    <div
                        key={i}
                        className='group relative h-full border space-y-1.5 px-4 sm:px-6 md:px-8 lg:px-8 py-6 bg-primary-bg overflow-hidden transition-all duration-500'
                    >
                        <div className='relative w-fit'>
                            <feature.Icon
                                className='relative text-primary group-hover:text-white transition-all duration-500 z-[2]'
                                size={100}
                                strokeWidth={0.75}
                            />
                            <span className='absolute inset-y-1/2 right-0 h-8 w-14 opacity-0 bg-black/20 z-[1] group-hover:opacity-100 transition-all duration-500' />
                        </div>
                        <h1 className='relative text-lg sm:text-xl md:text-2xl font-semibold group-hover:text-white transition-all duration-500 z-[1]'>
                            {feature?.title}
                        </h1>
                        <p className='relative max-w-xs z-[1] group-hover:text-white transition-all duration-500'>
                            {feature?.description}
                        </p>
                        <span className='absolute -top-1.5 inset-x-0 scale-75 opacity-0 w-full h-full bg-primary group-hover:scale-100 group-hover:opacity-100 transition-all duration-500' />
                    </div>
                ))}
            </div>
        </section>
    );
}
