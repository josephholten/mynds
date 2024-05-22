'use client'
import React, { useState } from 'react';
import { sql } from '@vercel/postgres'
import "@/globals.css";
import { deleteMemberData, deleteEventData } from "@root/actions.js"


const searchEvents = async (formData) => {
  const { rows } = await sql`SELECT * FROM events WHERE title LIKE ${formData.get("name")} LIMIT 12;`;
  return (
    <div>
    {rows.map(event => (
    <div onClick={deleteEventData(event.id)} key={event.id}>{event.title} on the {event.date}</div> // Assuming each event has an `id` and `title`
  ))}
  </div>);
}

const searchMembers = async (formData) => {
  const { rows } = await sql`SELECT * FROM team WHERE name LIKE ${formData.get("name")} LIMIT 12;`;
  return (
    <div>
    {rows.map(member => (
    <div onClick={deleteMemberData(member.id)} key={member.id}>{member.title} on the {member.date}</div> // Assuming each event has an `id` and `title`
  ))}
  </div>);
}


const DeleteEvent = () => {
  // State to store input values
  const [inputs, setInputs] = useState({});
  const [events, setEvents] = useState([]);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const eventsData = await searchEvents(formData);
    setEvents(eventsData);
  };

  events = (<div></div>)

  return (
    <div className="flex flex-col gap-y-4 my-3">
      <div className="my-5">Click an event to delete it. This can not be reversed:</div>
      <form action={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Search by Event Title"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary mt-4">
          Search
        </button>
      </form>
      {events}
    </div>
  );
};

const DeleteMember = () => {
  // State to store input values
  const [inputs, setInputs] = useState({});
  const [members, setMembers] = useState([]);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const membersData = await searchMembers(formData);
    setMembers(membersData);
  };

  members = (<div></div>)

  return (
    <div className="flex flex-col gap-y-4 my-3">
      <div className="my-5">Click a member to remove them. This can not be reversed:</div>
      <form action={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Search by Member Name"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary mt-4">
          Search
        </button>
      </form>
      {members}
    </div>
  );
};




const Delete = () => {
  return (
    <div className='mx-auto max-w-screen-lg flex flex-col gap-y-6 my-3'>
      <DeleteEvent/>
      <DeleteMember/>
    </div>
  )
}

export default Delete;