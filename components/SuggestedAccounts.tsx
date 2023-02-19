import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import { IUser } from '../types';


const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers])

  function shuffle(array: any) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  shuffle(allUsers)

  return (
    <div className='border-b-2 border-gray-200 pb-2 pt-2 md:pb-4 xl:pb-4'>
      <p className="text-gray-500 font-semibold mt-4 hidden xl:block">Suggested Accounts</p>
      <div>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
              <div className="border-2 text-md font-semibold flex items-center rounded-full">
                <Image width={50} height={50} className='rounded-full' alt='user-profile' src={user.image} />
              </div>

              <div className="hidden xl:block">
                <p className="flex gap-1 items-center text-md font-bold capitalize text-primary">
                  {user.userName}
                  <GoVerified className="text-blue-400" />
                </p>
                <p className="lowercase text-gray-400 text-xs">
                  {`@${user.userName.replaceAll(' ', '')}`}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts