import React from "react";
import Head from "next/head";
import Link from "next/link";

export default (props) => {
  let campaign;
  ({ campaign } = props);
  return (
    <>
      <div className="">
        <Link href={`/campaigns/${campaign.address}`} classname="">
          <div class="flex justify-start items-center cursor-pointer w-11/12 h-60 bg-gradient-to-br from-cyan-500 via-white to-white text-black m-8 mt-0 rounded-lg border-2 border-cyan-500 shadow-md shadow-white hover:shadow-cyan-500 hover:shadow-lg">
            <div class="p-6">
              <div id="header" class="flex items-center mb-4">
                <img alt="avatar" class="w-20 rounded-full border-2 border-gray-300" src="https://picsum.photos/seed/picsum/200" />
                <div id="header-text" class="leading-5 ml-6 sm">
                  <h4 id="name" class="text-xl text-black font-semibold">{campaign.name}</h4>
                  <h5 id="job" class="font-semibold text-cyan-600">{campaign.category}</h5>
                </div>
              </div>
              <div id="quote">
                <q class="italic text-gray-600">{campaign.description}</q>
              </div>
              <div className="flex justify-end text-gray-700 mt-3 font-extralight">Minimum Contribution: <b> {campaign.minimumContribution} wei</b></div>
            </div>
          </div>
        </Link>
      </div >
    </>
  );
};
