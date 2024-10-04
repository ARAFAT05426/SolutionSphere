import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className='w-full border-t-2'>
            <div className='w-4/5 xl:container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 py-10'>
                <div className='space-y-2.5'>
                    <Image src={`/logo-light.png`} alt='Logo' width={250} height={125} />
                    <p className='max-w-xs mx-2.5 text-sm'>
                        We are committed to providing our customers with exceptional service and quality products.
                    </p>
                    <div className='flex space-x-1 mx-2.5 pt-2.5'>
                        <Link href={'/'} className='rounded-full p-2.5 bg-white shadow-md hover:bg-slate-100 transition'>
                            <FaFacebookF />
                        </Link>
                        <Link href={'/'} className='rounded-full p-2.5 bg-white shadow-md hover:bg-slate-100 transition'>
                            <FaTwitter />
                        </Link>
                        <Link href={'/'} className='rounded-full p-2.5 bg-white shadow-md hover:bg-slate-100 transition'>
                            <FaInstagram />
                        </Link>
                        <Link href={'/'} className='rounded-full p-2.5 bg-white shadow-md hover:bg-slate-100 transition'>
                            <FaLinkedin />
                        </Link>
                    </div>
                </div>

                <div className='space-y-2.5'>
                    <h4 className='text-lg font-bold'>Quick Links</h4>
                    <ul className='space-y-1'>
                        <li>
                            <Link href={'/about'} className='hover:text-gray-400 transition'>About Us</Link>
                        </li>
                        <li>
                            <Link href={'/services'} className='hover:text-gray-400 transition'>Services</Link>
                        </li>
                        <li>
                            <Link href={'/contact'} className='hover:text-gray-400 transition'>Contact</Link>
                        </li>
                    </ul>
                </div>

                <div className='space-y-2.5'>
                    <h4 className='text-lg font-bold'>Contact Us</h4>
                    <p className='text-sm'>Email: info@example.com</p>
                    <p className='text-sm'>Phone: +123 456 7890</p>
                    <p className='text-sm'>Address: 123 Street Name, City, Country</p>
                </div>

                <div className='space-y-2.5'>
                    <h4 className='text-lg font-bold'>Subscribe to Our Newsletter</h4>
                    <p className='text-sm'>Stay updated with our latest news and offers.</p>
                    <form className='flex'>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className='flex-1 pl-4 py-1.5 rounded-l-sm text-black/75 outline-none md:rounded-l-md'
                        />
                        <button className='bg-primary/95 min-h-full px-4 py-2.5 rounded-r-sm hover:text-white transition md:rounded-r-md'>
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            </div>
            <div className='text-sm py-5 bg-black/90 mt-2.5 text-white'>
                <div className='container flex flex-col md:flex-row items-center justify-between'>
                    <p className=''>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
                    <div className='flex items-center gap-2.5 mt-2 md:mt-0'>
                        <span>Terms & Condition</span>
                        |
                        <span>Subscription</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
