import axios, { all } from 'axios'
import { NextPage } from 'next'
import React from 'react'
import useAuthStore from '../../store/authStore'
import { Video } from '../../types'
import { BASE_URL } from '../../utils'


interface IProps {
    postDetails: Video;
}

const MyFun = ({ postDetails }: IProps) => {
    const { allUsers } = useAuthStore();

    console.log(postDetails.likes)

    return (
        <div>
            
        </div>
    )
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
    const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

    return {
        props: { postDetails: data }
    }
}

// export default LikedBy
export default MyFun