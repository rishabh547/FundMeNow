import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from 'next/image';
import myGif from '../assets/hero.gif';

export default (props) => {
  return (
    <div className=" flex-col align-items-center justify-items-center ">

      <div className="flex ">
        <div className="container shadow-white shadow-2xl border-0 rounded-lg p-12 my-20 mx-20 text-white" style={{ "fontSize": "80px", "width": "40%" }
        }>
          <div className="animate-pulse font-serif">
            <p>Fund Me</p>
            <p className="text-cyan-500 ">Now</p>
          </div>
        </div >
        {/* text */}
        <div className="flex flex-col-reverse text-white font-extralight max-w-2xl">
          <div className="text-4xl mt-16 ">
            <b>Raise Funds</b>  Or <b>Fund A Campaign</b> Through The <b className="text-cyan-500">Trust</b>  And <b className="text-cyan-500">Security</b>  Of Blockchain
          </div>
          {/* insert gif here */}

          <Image src={myGif} width={200} height={400} alt="gif" className="" />

        </div>
      </div>

      <div class=" bg-black flex align-center relative overflow-hidden sm:py-12">
        <div class="max-w-7xl mx-auto shadow-lg shadow-white rounded-lg">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-black rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
              <svg class="w-8 h-8 text-cyan-500" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"></path>
              </svg>
              <div class="space-y-2">
                <p class="text-slate-800">Fund a Campaign</p>
                <a href="/campaigns" class="block text-cyan-500 group-hover:text-slate-800 transition duration-200" target="_blank">View Campaigns →</a>
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-7xl mx-auto shadow-lg shadow-white rounded-lg">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-black to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
              <svg class="w-8 h-8 text-cyan-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              <div class="space-y-2">
                <p class="text-slate-800">Raise Funding</p>
                <a href="/campaigns" class="block text-cyan-500 group-hover:text-slate-800 transition duration-200" target="_blank">Create a Campaign →</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
