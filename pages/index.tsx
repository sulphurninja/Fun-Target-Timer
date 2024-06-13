import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import HeaderText from '@/components/HeaderText'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Fun Target Timer - Download</title>
        <meta name="description" content="Casino Wheel with admin panel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles/Home.module.css" />
      </Head>
      <main className='w-screen h-screen bg-black lg:mt-2  '>
  
        <div className='absolute'>

        </div>
        <div className='absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center'>
          <h1 className='text-4xl font-bold font-fun mb-4 '>Fun Target Timer</h1>

          <div className='bg-white rounded-md p-4'>
            <p className='text-black font-bold p-4'>Download the Windows (exe) or mobile-friendly APK to install<br></br> <span className='text-red-500  animate-pulse font-bold'>Fun Target Timer</span>.</p>


            <div className='flex justify-center space-x-4'>
              <a href='/FunTargetTimer 1.0.0.msi' download>
                <div className='bg-yellow-500 text-white px-4 py-2 rounded-md'>Download for Windows</div>
              </a>
              <a href='/FunTargetTimer.apk' download>
              <div className='bg-red-500 text-white px-4 py-2 rounded-md'>Download APK</div>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
