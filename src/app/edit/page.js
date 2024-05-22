'use client'
import React, { useState } from 'react';
import "@/globals.css";
import { editMemberData, editEventData, getEventData, getMemberData } from "@root/actions.js"


const searchEvents = async (formData) => {
  const { rows } = await sql`SELECT * FROM events WHERE title LIKE ${formData.get("name")} LIMIT 12;`;
  return (
    <div>
    {rows.map(event => (
    <div onClick={() => setID(event)} key={event.id}>{event.title} on the {event.date}</div> // Assuming each event has an `id` and `title`
  ))}
  </div>);
}

const searchMembers = async (formData) => {
  const { rows } = await sql`SELECT * FROM team WHERE name LIKE ${formData.get("name")} LIMIT 12;`;
  return (
    <div>
    {rows.map(member => (
    <div onClick={() => setID(member)} key={member.id}>{member.title} on the {member.date}</div> // Assuming each event has an `id` and `title`
  ))}
  </div>);
}

const EditEvent = () => {
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

  const setID = (event) => {
    setInputs({
      ID: event.id,
      name: event.title,
      date: event.date,
      img_src: event.img_src,
      description: event.description,
      description_past: event.description_past,
      registration_url: event.registration_url,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location
    });
  }

  return (
    <div>
    <div className="flex flex-col gap-y-4 my-3">
      <div className="my-5">You have to (!) search and click on an event to insert the current information into the submission form:</div>
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
    <div className="flex flex-col gap-y-4 my-3">
      <div className="my-5">Edit Event:</div>
      <form action={editEventData} className="space-y-4">
        <input
          type="text"
          name="ID"
          value={inputs.ID || ''}
          placeholder="The ID will be inserted automatically once you click the event"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="name"
          value={inputs.name || ''}
          placeholder="Event title here"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="date"
          value={inputs.date || ''}
          placeholder="Event date here (dd.mm.yyyy)"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="img_src"
          value={inputs.img_src || ''}
          placeholder="URLs to get the images from. Seperate by comma and precisely one space"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="description"
          value={inputs.description || ''}
          placeholder="This description will be shown before the event takes place"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="description_past"
          value={inputs.description_past || ''}
          placeholder="This description will be shown after the event took place"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="registration_url"
          value={inputs.registration_url || ''}
          placeholder="Registration URL"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="startTime"
          value={inputs.startTime || ''}
          placeholder="start time (xx:xx)"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="endTime"
          value={inputs.endTime || ''}
          placeholder="end time (xx:xx)"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="location"
          value={inputs.location || ''}
          placeholder="Event location here"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

const EditMember = () => {
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
    setEvents(membersData);
  };

  members = (<div></div>)

  const setID = (member) => {
    setInputs({
      ID: member.id,
      name: member.name,
      date: member.role,
      img_src: member.img_src,
    });
  }

  return (
    <div>
    <div className="flex flex-col gap-y-4 my-3">
      <div className="my-5">You have to (!) search and click on a member to insert the current information into the submission form:</div>
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
      {members}
    </div>
    <div className="flex flex-col gap-y-4 my-3">
      <div className="my-5">Edit Member Data:</div>
      <form action={editEventData} className="space-y-4">
        <input
          type="text"
          name="ID"
          value={inputs.ID || ''}
          placeholder="The ID will be inserted automatically once you click the event"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="name"
          value={inputs.name || ''}
          placeholder="Event title here"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="role"
          value={inputs.role || ''}
          placeholder="Event date here (dd.mm.yyyy)"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="img_src"
          value={inputs.img_src || ''}
          placeholder="URLs to get the images from. Seperate by comma and precisely one space"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};


const Edit = () => {
  return (
    <div className='mx-auto max-w-screen-lg flex flex-col gap-y-6 my-3'>
      <EditEvent/>
      <EditMember/>
    </div>
  )
}

export default Edit;