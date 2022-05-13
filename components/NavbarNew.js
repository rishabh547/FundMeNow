import Link from 'next/link';
import React, { useState } from 'react';

function NavbarNew() {

    const [displayText, setDisplayText] = useState("Connect Wallet");

    const isMetaMaskInstalled = () => {
        //Have to check the ethereum binding on the window object to see if it's installed
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };

    const connectWallet = async (e) => {
        e.preventDefault();
        if (isMetaMaskInstalled()) {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts[0]) {
                alert("Connected to MetaMask");
                setDisplayText("Connected");
            }
        } else {
            alert("Please install MetaMask");
        }
    };


    return (
        <nav class=" shadow-gray-800 shadow-lg bg-transparent opacity-90 backdrop-blur-xl" >
            <div class="max-w-8xl mx-auto px-16">
                <div class="flex justify-between">

                    <div class="flex space-x-7 px-3">
                        <a href="#" class="flex items-center py-4 px-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Uber_App_Icon.svg/2048px-Uber_App_Icon.svg.png" alt="Logo" class="h-8 w-8 mr-2" />
                            <span class="font-semibold text-gray-200 text-lg mx-4">
                                FundMeNow
                            </span>
                        </a>
                    </div>

                    <div class="hidden md:flex items-center space-x-1">
                        <Link href="/">
                            <p className="py-4 px-4 text-gray-400 border-b-4 border-cyan-500 font-semibold">Home</p>
                        </Link>
                        <Link href="/campaigns">
                            <p className="py-4 px-4 text-gray-400 font-semibold hover:text-cyan-500 transition duration-300">Campaigns</p>
                        </Link>
                        <Link href="/">
                            <p className="py-4 px-4 text-gray-400 font-semibold hover:text-cyan-500 transition duration-300">About</p>
                        </Link>
                    </div>

                    <button className='bg-opacity-25 backdrop-filter backdrop-blur-lg bg-black hover:bg-white text-gray-200 font-semibold hover:text-cyan-500 py-2  border-white hover:border-transparent px-6 flex my-2 border rounded-lg items-center' onClick={connectWallet}>Connect Wallet</button>

                    <div class="md:hidden flex items-center" >
                        <button class="outline-none menu-button">
                            <svg class="w-6 h-6 text-gray-500" x-show="! showMenu" fill="none" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2" viewBox="0 00 24 24" stroke="currentColor"><path d="m4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>

                    <div class="hidden mobile-menu">
                        <ul class="">
                            <li class="active">
                                <a href="nav.html"
                                    class="block text-sm px-2 py-4 text-white bg-purple-500 font-semibold" />
                                Home
                            </li>
                            <li>
                                <a href="#services"
                                    class="block.text-sm.px-2.py-4 hover:bg-purple-500 transition duration-300">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#About"
                                    class="block.text-sm.px-2.py-4 hover:bg-purple-500 transition duration-300">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#Contact Us"
                                    class="block.text-sm.px-2.py-4 hover:bg-purple-500 transition duration-300">
                                    Contact Us
                                </a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </nav >
    )
}

export default NavbarNew