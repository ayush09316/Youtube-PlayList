import React from 'react'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { options } from '@/app/api/auth/[...nextauth]/options';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Navbar = async() => {
  const session=await getServerSession(options);
  if(!session) redirect('/api/auth/signin?callbackUrl=/server');
  return (
    <header className='bg-white mx-5 my-2 rounded-3xl text-black flex justify-between p-5 items-center '>
        <Link href={'/'} className='font-bold text-2xl'>Logo</Link>
      <nav className='flex gap-5 items-center'>
        
        <div className='flex gap-10'>    
        {
          session ? (
            <>
              <Image src={session?.user?.image || '/next.svg'} alt={session?.user?.name || 'profile'} width={30} height={30} className='rounded-full' />
             
              <Link href={'/api/auth/signout'} className='bg-blue-500 text-white px-3 py-1 rounded'>Logout</Link>
            </>
          ) : (
            <>
              <Link href="/api/auth/signin">Sign In</Link>
            
            </>
          )
        }
        </div>
      </nav>
    </header>
  )
}

export default Navbar
