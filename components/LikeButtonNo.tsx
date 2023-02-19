import React, { useState, useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';
import useAuthStore from '../store/authStore';

interface IProps {
    likes: any[];
}

const LikeButtonNo = ({ likes }: IProps) => {
    const { userProfile }: any = useAuthStore();
    const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

    return (
        <div className="flex gap-6">
            <div className=" flex flex-row mt-2 justify-center items-center">
                <div className="bg-primary  rounded-full p-2 md:p-4 text-[#F51997]">
                    <MdFavorite className="text-lg md:text-2xl" />
                </div>
                <p className="text-md">
                    {likes?.length || 0}
                </p>
            </div>
        </div>
    )
}

export default LikeButtonNo