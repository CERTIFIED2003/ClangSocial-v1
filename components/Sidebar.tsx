import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiFillHome, AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';
import useAuthStore from '../store/authStore';
import Image from 'next/image';
import { IoMdAdd } from 'react-icons/io';
import { googleLogout } from '@react-oauth/google';
// import Home from "../utils/Home.gif"
import {GrAppsRounded} from 'react-icons/gr'
import { MdCancelPresentation } from 'react-icons/md';

const Sidebar = () => {

  const [showSidebar, setShowSidebar] = useState(false);
  const normalLink = 'flex items-center -ml-1 gap-3 mb-2 md:mb-0 xl:mb-0 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';
  const mobileLink = 'flex items-center hover:bg-primary justify-center cursor-pointer font-semibold rounded';
  const { userProfile, addUser, removeUser }: any = useAuthStore();

  return (
    <div className="flex flex-col justify-center items-center">
      <div onClick={() => setShowSidebar((prev) => !prev)} className="ml-2 text-gray-600  mb-1 text-xl cursor-pointer">
        {showSidebar ?
          <MdCancelPresentation className="-ml-8 w-10 h-10 md:px-0 px-2 p-2 text-md font-semibold flex items-center" />
          // <ImCancelCircle className="-ml-7 md:border-0 xl:border-0 border-2 border-b-[#F51997] w-10 h-10 md:px-0 px-2 p-2 text-md font-semibold flex items-center" />
          :
          <GrAppsRounded className="-ml-1 w-10 h-10 md:px-0 px-2 p-2 text-md font-semibold flex items-center"/>
          // <div className="border-2 md:border-0 xl:border-0 border-b-[#F51997]  w-10 h-10 md:px-0 px-2 p-2 text-md font-semibold flex items-center"><GrAppsRounded /></div>
        }
        {/* {showSidebar ? <ImCancelCircle className="-ml-7 w-10 h-10 px-2 p-2" /> : <div className="md:px-0 px-2 p-2"><AiOutlineMenu /></div> } */}
      </div>
      {showSidebar && (
        <div className="flex flex-col -mt-3 justify-start w-20 xl:w-400 h-88vh overflow-y-scroll mb-5 p-3">
          <div className="border-b-2 xl:border-gray-200">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl"><AiFillHome /></p>
                <span className="text-xl hidden xl:block">For You</span>
              </div>
            </Link>
          </div>
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
      {!showSidebar && userProfile && (
        <div className="flex flex-col ml-2 md:hidden xl:hidden mt-2 gap-5 md:gap-10">
          {/* <div className={mobileLink}>
            <Image
              unoptimized={true}
              className="cursor-pointer h-14"
              src={Home}
              alt="Home"
            />
          </div> */}
          <Link href="/upload">
            <button className="border-2 px-2 md:px-4 p-2 text-md font-semibold rounded-full flex items-center">
              <IoMdAdd className="text-xl" /> {`  `}
              <span className="hidden md:block">New Post</span>
            </button>
          </Link>
          {userProfile?.image && (
            <Link href={`/profile/${userProfile?._id}`}>
              <div className="w-[43px] md:w-[43px] flex">
                <Image
                  className="border-2 cursor-pointer text-md font-semibold flex items-center rounded-full"
                  width={45}
                  height={45}
                  src={userProfile?.image}
                  alt="Profile Photo"
                />
              </div>
            </Link>
          )}
          <button
            type="button"
            className="border-2 px-2 md:px-4 p-2 text-md font-semibold rounded-full flex items-center"
            onClick={() => {
              googleLogout();
              removeUser();
            }}
          >
            <AiOutlineLogout color="red" fontSize={21} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Sidebar