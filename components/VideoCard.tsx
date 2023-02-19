import React, { useState, useEffect, useRef } from 'react';
import { Video } from '../types';
import { NextPage } from 'next';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

// NEW
import useAuthStore from '../store/authStore';  // Added from Details
import LikeButtonHome from './LikeButtonHome';  // Added from Details -->  No Actions
import LikeButtonNo from './LikeButtonNo';  // Added from Details --> Like, Dislike
import { BASE_URL } from '../utils';  // Added from Details
import axios from 'axios';  // Added from Details
import CommentsHome from './CommentsHome'; // Add from Details --> Comment
import Image from 'next/legacy/image';

interface IProps {
    post: Video
}

const VideoCard: NextPage<IProps> = ({ post }: any) => {
    const [isHover, setIsHover] = useState(true);
    const [playing, setPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { userProfile }: any = useAuthStore();  // Added from Details --> Like/Comment
    const [postUser, setPostUser] = useState(post);  // Added from Details --> Like
    const [comment, setComment] = useState('');  // Added from Details--> Comment
    const [isPostingComment, setIsPostingComment] = useState(false);  // Added from Details --> Comment
    const [postComment, setPostComment] = useState(post);  // Added from Details --> Comment

    // const onVideoPress = () => {
    //     if (playing) {
    //         videoRef?.current?.pause();
    //         setPlaying(false);
    //     }
    //     else {
    //         videoRef?.current?.play();
    //         setPlaying(true);
    //     }
    // }

    // LIKE/DISLIKE
    const handleLike = async (like: boolean) => {
        if (userProfile) {
            const { data } = await axios.put(`${BASE_URL}/api/like`, {
                userId: userProfile._id,
                postId: post._id,
                like
            })

            setPostUser({ ...post, likes: data.likes });
        }
    }

    // COMMENT
    const addComment = async (e: any) => {
        e.preventDefault();

        if (userProfile && comment) {
            setIsPostingComment(true);

            const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
                userId: userProfile._id,
                comment
            });

            setPostComment({ ...postComment, comments: data.comments });
            setComment('');
            setIsPostingComment(false);
        }
    }

    useEffect(() => {
        if (videoRef?.current) {
            videoRef.current.muted = isVideoMuted;
        }
    }, [isVideoMuted])

    // const onVideoClick = () => {
    //     if (playing) {
    //         videoRef?.current?.pause();
    //         setPlaying(false);
    //     }
    //     else {
    //         videoRef?.current?.play();
    //         setPlaying(true);
    //     }
    // }

    return (
        <div className="flex flex-col border-b-2 border-gray-200 pb-6 mr-5">
            <div className="flex gap-3 p-2 font-semibold rounded ">
                <div className="md:w-16 cursor-pointer md:h-16 w-10 h-10">
                    <Link href={`/profile/${post.postedBy._id}`}>
                        <Image
                            width={62}
                            height={62}
                            className="rounded-full"
                            src={post.postedBy.image}
                            alt="Profile Photo"
                            referrerPolicy="no-referrer"
                        />
                    </Link>
                </div>
                <div>
                    <Link href={`/profile/${post.postedBy._id}`}>
                        <div className="flex justify-start items-start flex-col cursor-pointer">
                            <p className="flex gap-2 items-center md:text-md text-primary">
                                <p className="font-semibold ">
                                    {post.postedBy.userName} {` `}
                                </p>
                                <GoVerified className="text-blue-400 text-md" />

                            </p>
                            <p className="lowercase font-medium text-xs text-gray-500">
                                {`@${post.postedBy.userName.replaceAll(' ', '')}`}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            {/* <div className="lg:ml-20 flex gap-4 relative justify-center items-center"> */}
            <div className="lg:ml-20 flex flex-col gap-4 mb-2 justify-center items-center relative">
                {
                    post.previewtype === 'image' && (
                        <div
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                            className="rounded-3xl"
                        >
                            <div className="rounded-3xl">
                                <Link href={`/detail/${post._id}`}>
                                    <img
                                        src={post.video?.asset.url}

                                        className="rounded-2xl cursor-pointer bg-gray-200"
                                        alt="Post"
                                    />
                                </Link>
                            </div>
                        </div>
                    )
                }
                {/* <div
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    className="rounded-3xl"
                >
                    <div className="rounded-3xl">
                        <Link href={`/detail/${post._id}`}>
                            <img
                                src={post.video?.asset.url}

                                className="rounded-2xl cursor-pointer bg-gray-200"
                                alt="Post"
                            />
                        </Link>
                    </div>
                </div> */}
            </div>
            <Link href={`/detail/${post._id}`}>
                <div>{post.caption}</div>
            </Link>
            <div className='flex gap-2 mt-2 pl-4 justify-center items-center'>
                {/* <div className="flex justify-center items-center"> */}
                {userProfile ?
                    (
                        <LikeButtonHome
                            likes={postUser.likes}
                            handleLike={() => handleLike(true)}
                            handleDislike={() => handleLike(false)}
                        />

                    ) :
                    (
                        <LikeButtonNo
                            likes={postUser.likes}
                        />
                    )
                }
                <CommentsHome
                    comment={comment}
                    setComment={setComment}
                    addComment={addComment}
                    comments={post.comments}
                    isPostingComment={isPostingComment}
                />
                <div>
                    {/* <Link href={`/likedby/${post._id}`}>See who Liked</Link> */}
                </div>
            </div>
        </div>

    )
}

export default VideoCard