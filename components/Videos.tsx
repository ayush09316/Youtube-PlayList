
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getPlayList } from '@/utils/youtube'
import { getServerSession } from 'next-auth';
import Image from 'next/image';

import Link from 'next/link';

const timeSince = (timestamp:any) => {
  const date = new Date(timestamp);
const formattedDate = date.toISOString().split('T')[0];
return formattedDate;
}


const Videos = async () => {
  const session= await getServerSession(options) as { token: string };
  
  
    const data= await getPlayList(session?.token);
  
  return (
    <div className='m-10'>
    <h1 className='text-3xl font-bold my-3'>Your Playists</h1>
  
    <div className='flex  flex-wrap gap-10 my-10  text-black'>
    {data?.items?.map((item:any) => (
      <Link href={item.id} key={item.id} className='bg-white h-auto w-[15rem] shadow-lg rounded-lg p-4'>
        <Image width={300}
          height={300} src={item.snippet.thumbnails.high.url} className='rounded-[8px]' alt="thumbnail" />
           <h1 className='font-bold mt-3'>{item.snippet.title}</h1>
           <p className='text-sm text-gray-500'>Channel : {item.snippet.channelTitle}</p>
           
           <p className='text-sm text-gray-500'>Uploaded at {timeSince(item.snippet.publishedAt)}</p>
      </Link>
    
    ))}

    {
      !data && <div className='text-gray-500 text-2xl font-semibold w-full mt-40 flex items-center justify-center   text-center'>
        <h1>....No PlayList....</h1>
         </div>
    }
  </div>
  </div>
  );
};

export default Videos;
