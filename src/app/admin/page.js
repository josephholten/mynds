'use client'
import "@/globals.css";



const Admin = () => {
  return (
    <div className='mx-auto max-w-screen-lg flex flex-col gap-y-6 my-3'>
      <a href="/add">Add Events/Members</a>
      <a href="/delete">Delete Events/Members</a>
      <a href="/edit">Edit Events/Members</a>
    </div>
  )
}

export default Admin;