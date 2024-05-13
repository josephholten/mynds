'use client'
import React, { useState } from 'react';
import "@/globals.css";
import { saveEventData, saveMemberData} from "@root/actions.js"

const AddEvent = () => {
  // State to store input values
  const [inputs, setInputs] = useState({});

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col gap-y-4 my-3">
      <div className="my-5">Create New Event:</div>
      <form action={saveEventData} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Event title here"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="date"
          placeholder="Event date here (dd.mm.yyyy)"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="img_src"
          placeholder="URLs to get the images from. Seperate by comma and precisely one space"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="description"
          placeholder="This description will be shown before the event takes place"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="description_past"
          placeholder="This description will be shown after the event took place"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="registration_url"
          placeholder="Registration URL"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="startTime"
          placeholder="start time (xx:xx)"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="endTime"
          placeholder="end time (xx:xx)"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="location"
          placeholder="Event location here"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

const AddMember = () => {
  // State to store input values
  const [inputs, setInputs] = useState({});

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  return (
    <div className="mx-auto max-w-screen-lg flex flex-col gap-y-4 my-3">
      <div className="my-5">Add New Member:</div>
      <form action={saveMemberData} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="role"
          placeholder="The persons role/position"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="img_src"
          placeholder="URL to get the image from"
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};


const Add = () => {
  return (
    <div className='mx-auto max-w-screen-lg flex flex-col gap-y-6 my-3'>
      <AddEvent/>
      <AddMember/>
    </div>
  )
}

export default Add;