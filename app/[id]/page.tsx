
import { getDetails } from '@/utils/youtube';
import Image from 'next/image';
import Link from 'next/link';


const timeSince = (timestamp:any) => {
  const date = new Date(timestamp);
const formattedDate = date.toISOString().split('T')[0];
return formattedDate;
}

const page =async ({ params }: { params: { id: string } }) => {
  
    const data= await getDetails(params.id);
    
  return (
   <div className='m-10'>
    <h1 className='text-3xl font-bold'>Your Videos</h1>
    <div className='flex  gap-10 m-10 items-start'>
      {data?.items?.map((item:any) => (
        <Link href={`${params.id}/video/${item.snippet.resourceId?.videoId}`} key={item.id} className='bg-white h-auto w-[15rem] shadow-lg rounded-lg p-4'>
         
          <Image width={300}
            height={300} src={item.snippet.thumbnails.high.url} alt="thumbnail" />
          <h1 className='font-bold mt-3'>{item.snippet.title}</h1>
         <div className='flex flex-col gap-1 mt-2'>
         <p className='text-sm text-gray-500'>Channel : {item.snippet.channelTitle}</p>
          <p className='text-sm text-gray-500'>Description : {item.snippet.description || "the description for the given video"}</p>
          <p className='text-sm text-gray-500'>Uploaded at : {timeSince(item.snippet.publishedAt)}</p>
         </div>
        </Link>
      ))}
      </div>
    </div>
  )
}

export default page
