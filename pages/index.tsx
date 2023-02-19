import axios from 'axios';
import { useState } from 'react';
import NoResults from '../components/NoResults';
import Post from '../components/Post';
import VideoCard from '../components/VideoCard';
import { Video } from '../types';
import { BASE_URL } from '../utils';

interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="w-full ">
        <Post />
      </div>
      <div className="pt-4 md:pt-0 xl:pt-0 videos">
        {
          videos.length ?
            (
              videos.map((video: Video) => (
                <VideoCard post={video} key={video._id} />
              ))
            ) :
            (
              <NoResults text={`No Posts`} />
            )
        }
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ query: { topic } }: { query: { topic: string } }) => {
  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }
  else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }


  return {
    props: {
      videos: response.data
    }
  }
}

export default Home
