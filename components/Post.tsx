import { SanityAssetDocument } from '@sanity/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { MdScheduleSend } from 'react-icons/md'
import useAuthStore from '../store/authStore';
import { BASE_URL } from '../utils';
import { client } from '../utils/client';
import { topics } from '../utils/constants';
import { RiImageAddLine } from 'react-icons/ri'
import { TiTickOutline } from 'react-icons/ti';



const Post = () => {
    const [isLoading, setIsLoading] = useState(false);  // Loading
    const [asset, setAsset] = useState<SanityAssetDocument | undefined>();  // File Uploaded
    const [wrongFileType, setWrongFileType] = useState(false);  // Unsupported file type
    const [checkFile, setCheckFile] = useState(false);  // Size of the file
    const [uploadFile, setUploadFile] = useState(false);  // Uploading Process
    const [caption, setCaption] = useState('');  // Caption
    const [demo, setDemo] = useState('');  // Caption
    const [category, setCategory] = useState(topics[0].name);  // Category
    const [savingPost, setSavingPost] = useState(false);  // Saving for Upload

    const { userProfile }: { userProfile: any } = useAuthStore();
    const router = useRouter();

    const uploadVideo = async (e: any) => {
        e.preventDefault();
        var selectedFile = e.target.files[0];
        const fileTypes = ['image/png', 'image/jpeg'];
        // const fileTypes = ['video/mp4', 'video/webm', 'image/png', 'image/jpeg'];
        const imageTypes = ['image/png', 'image/jpeg'];
        const videoTypes = ['video/mp4', 'video/webm'];

        if (imageTypes.includes(selectedFile.type)) {
            setDemo('image')
        }
        else if (videoTypes.includes(selectedFile.type)) {
            setDemo('video')
        }

        if (fileTypes.includes(selectedFile.type)) {
            // Size greater than 10MB
            if (selectedFile.size > 10e6) {
                setCheckFile(true);
                // Correct File Type
                if (fileTypes.includes(selectedFile.type)) {
                    setWrongFileType(false);
                }
                else setWrongFileType(true)
                return false;
            }
            setCheckFile(false);
            setWrongFileType(false);
            client.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name
            })
                .then((data) => {
                    setAsset(data);
                    setUploadFile(true);
                    setIsLoading(false);
                })
        }
        else {
            setIsLoading(false);
            setUploadFile(false);
            setWrongFileType(true);
            if (selectedFile.size > 10e6) {
                setCheckFile(true);
            }
            else setCheckFile(false);
        }
    };

    const handlePost = async (e: any) => {
        e.preventDefault();
        if (caption) {
            setCaption('');
            setSavingPost(true);

            const document = {
                _type: 'post',
                caption,
                video: {
                    type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: asset?._id
                    }
                },
                previewtype: demo,
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id
                },
                topic: category
            }
            await axios.post(`${BASE_URL}/api/post`, document);
            router.push('/');
            setSavingPost(false);
            setUploadFile(false);
        }
    };

    return (

        <div>
            {userProfile && (
                <div className="pr-1 border-b-2 border-gray-200 pb-3">
                    <div className="flex justify-center items-center" >
                        <div className="m-4 p-1 rounded-xl w-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-400 ">
                            {/* <div className="m-4 p-1 rounded-xl w-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 "> */}
                            <input
                                className="p-3 w-full rounded-lg focus:outline-none shadow"
                                type="text"
                                value={caption}
                                placeholder="Say hii to world!"
                                onChange={(e) => setCaption(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-5">
                        {uploadFile ?
                            (
                                <div>
                                    <TiTickOutline className="text-green-600 w-6 h-6" />
                                </div>
                            ) :
                            (<label className="flex justify-center items-center cursor-pointer">
                                <input
                                    type='file'
                                    name='upload-video'
                                    onChange={uploadVideo}
                                    className='w-0 h-0'
                                />
                                <RiImageAddLine className="text-indigo-500 w-6 h-6" />
                            </label>)}
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            className="rounded-full outline-none  border-2 border-gray-200 text-md lg:p-4 p-2 cursor-pointer capitalize"
                        >
                            {topics.map((topic) => (
                                <option
                                    key={topic.name}
                                    className="outline-none bg-white rounded-2 text-gray-700 text-md p-2 hover:bg-slate-300 capitalize"
                                    value={topic.name}
                                >
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                        { <button
                            className="text-md ml-2 text-gray-400"
                            onClick={handlePost}
                        >
                            {savingPost ? <MdScheduleSend className='w-5 h-5' /> : <AiOutlineSend className='text-[#F51997] w-5 h-5 ' />}
                            {/* { <MdScheduleSend className='w-5 h-5' /> : <AiOutlineSend className='text-[#F51997] w-5 h-5 ' />} */}
                        </button>}
                    </div>
                </div>
            )
            }
        </div >

    )
}

export default Post