import Image from 'next/image'

import logoImage from './images/logo.svg'

export function TopBar() {
  return (
    <div className='flex justify-between items-center w-full max-w-screen-lg topbar py-5 px-10 gap-x-7'>
      <div className='w-16'>
        <Image src={logoImage} alt="logo" />
      </div>
      <div className='flex justify-end gap-x-7 font-headline font-bold'>
        <a href="#about">About Us</a>
        <a href="#events">Events</a>
        <a href="#team">Team</a>
      </div>
    </div>
  );
}

export function Headline({ children }) {
  return (<div className="text-center font-headline text-3xl mb-5">{children}</div>)
}