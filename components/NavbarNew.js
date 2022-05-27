import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useContext } from 'react';
import AppContext from '../context/AppContext';

function NavbarNew() {
    const value = useContext(AppContext);
    const { address } = value.state;

    const { addToast } = useToasts();

    const [displayText, setDisplayText] = useState("Connect Wallet");

    useEffect(() => {
        if (address === null) {
            setDisplayText("Connect Wallet");
        } else {
            setDisplayText("Disconnect Wallet");
        }
    }, [address]);

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
                addToast("Connected to MetaMask", { appearance: 'success', autoDismiss: true });

                setDisplayText("Connected");
            }
            console.log(accounts);
            value.setAddress(accounts[0]);
        } else {
            addToast("Please install MetaMask", { appearance: 'error', autoDismiss: true });
        }
    };


    return (
        <nav className=" shadow-gray-800 shadow-lg bg-transparent opacity-90 backdrop-blur-xl" >
            <div className="max-w-8xl mx-auto px-16">
                <div className="flex justify-between">

                    <div className="flex space-x-7 px-3">
                        <Link href="/">
                            <div className="flex items-center py-4 px-2 cursor-pointer">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Uber_App_Icon.svg/2048px-Uber_App_Icon.svg.png" alt="Logo" className="h-8 w-8 mr-2" />
                                <span className="font-semibold text-gray-200 text-lg mx-4">
                                    FundMeNow
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-1">
                        <Link href="/" className="">
                            <p className="py-4 px-4 text-gray-400 font-semibold hover:text-cyan-500 transition duration-300 cursor-pointer">Home</p>
                        </Link>
                        <Link href="/campaigns">
                            <p className="py-4 px-4 text-gray-400 font-semibold hover:text-cyan-500 transition duration-300 cursor-pointer">Campaigns</p>
                        </Link>
                        {/* <Link href="/">
                            <p className="py-4 px-4 text-gray-400 font-semibold hover:text-cyan-500 transition duration-300 cursor-pointer">AboutUs</p>
                        </Link> */}
                        <Link href="/campaigns/new">
                            <p className="py-4 px-4 text-gray-400 font-semibold hover:text-cyan-500 transition duration-300 cursor-pointer">Raise Funding</p>
                        </Link>
                    </div>

                    <button className='bg-opacity-25 backdrop-filter backdrop-blur-lg bg-black hover:bg-white text-gray-200 font-semibold hover:text-cyan-500 py-2  border-white hover:border-transparent px-6 flex my-2 border rounded-lg items-center' onClick={connectWallet}>{displayText}</button>

                    <div className="md:hidden flex items-center" >
                        <button className="outline-none menu-button">
                            <svg className="w-6 h-6 text-gray-500" x-show="! showMenu" fill="none" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2" viewBox="0 00 24 24" stroke="currentColor"><path d="m4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="hidden mobile-menu">
                        <ul className="">
                            <li className="active">
                                <a href="nav.html"
                                    className="block text-sm px-2 py-4 text-white bg-purple-500 font-semibold" />
                                Home
                            </li>
                            <li>
                                <a href="#services"
                                    className="block.text-sm.px-2.py-4 hover:bg-purple-500 transition duration-300">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#About"
                                    className="block.text-sm.px-2.py-4 hover:bg-purple-500 transition duration-300">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#Contact Us"
                                    className="block.text-sm.px-2.py-4 hover:bg-purple-500 transition duration-300">
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