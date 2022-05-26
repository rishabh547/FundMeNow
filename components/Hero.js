import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from 'next/image';
import myGif from '../assets/hero.gif';
import svgImg from '../assets/undraw_Ethereum_re_0m68.svg';
import Link from 'next/link';

export default (props) => {
  return (
    <div className=" flex-col align-items-center justify-items-center ">

      <div className="flex ">
        <div>
          <div className=" border-0 rounded-lg p-2 mx-16 text-white " style={{ "fontSize": "150px", "width": "90%" }
          }>
            <p className="">Fund Me</p>
            <b className="text-cyan-500">Now</b>
          </div>
          <div className=" border-0 rounded-lg p-12 mx-20 text-white" style={{ "fontSize": "80px", "width": "80%" }
          }>
            <div className="text-4xl text-gray-300">
              <b className="text-white">Raise Funds</b>  Or <b className="text-white">Fund A Campaign</b> Through The <b className="text-cyan-200">Trust</b>  And <b className="text-cyan-200">Security</b>  Of <b className="text-white">Blockchain</b>
            </div>

            {/* <Image src={svgImg} width={500} height={480} /> */}
          </div >


        </div>


        {/* text */}
        <div className="flex flex-col-reverse text-white font-extralight max-w-2xl justify-end align-center">
          <div class="  flex align-center relative overflow-hidden sm:py-12 ">

            <Link href="/campaigns">
              <div className="max-w-7xl mx-auto shadow-lg shadow-transparent rounded-lg mr-20">
                <div class="relative group">
                  <div class="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-black rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div class="bg-opacity-70 backdrop-filter backdrop-blur-lg bg-black hover:text-black relative px-7 py-6 hover:bg-white transition duration-200 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6 ">
                    <svg class="w-8 h-8 text-cyan-500" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"></path>
                    </svg>
                    <div class="space-y-2 hover:text-slate-800">
                      <p class="hover:text-gray-900 text-gray-400 animate-bounce"><b>Fund a Campaign</b></p>
                      <p class="block text-cyan-500 group-hover:text-cyan-800 transition duration-200" target="_blank"><b>View Campaigns →</b> </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/campaigns/new">
              <div className="max-w-7xl mx-auto shadow-lg shadow-white rounded-lg mr-20">
                <div class="relative group">
                  <div class="absolute -inset-1 bg-gradient-to-r from-black to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div class="relative px-7 py-6 bg-white opacity-80 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                    <svg class="w-8 h-8 text-cyan-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    <div class="space-y-2">
                      <p class="text-slate-800 animate-bounce"><b>Raise Funding</b></p>
                      <p class="block text-cyan-500 group-hover:text-cyan-800 transition duration-200" target="_blank"><b>Create a Campaign →</b> </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

          </div>
          {/* <Image src={myGif} width={200} height={400} alt="gif" className="" /> */}
          <iframe src="https://embed.lottiefiles.com/animation/73295" style={{ "width": "600px", "height": "500px" }} className="ml-16"></iframe>

        </div>
      </div>


    </div>
  );
};
