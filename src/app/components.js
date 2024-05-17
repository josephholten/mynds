export function TopBar() {
  return (<div className='flex justify-end gap-x-10 underline font-bold w-full max-w-screen-lg topbar py-5 px-10'>
    <a href="#about">About Us</a>
    <a href="#events">Events</a>
    <a href="#team">Team</a>
  </div>)
}

export function Headline({ children }) {
  return (<div className="text-center font-bold text-2xl mb-5">{children}</div>)
}