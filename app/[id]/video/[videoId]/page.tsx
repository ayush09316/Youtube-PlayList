import React from 'react'

const page = ({ params }: { params: { videoId: string } }) => {
  return (
    <div className='m-10'>
      <div className='my-10 flex w-full justify-center'>
        <iframe width={1000} height={550} src={`https://www.youtube.com/embed/${params.videoId}`}>
        </iframe>

      </div>
    </div>
  )
}

export default page
