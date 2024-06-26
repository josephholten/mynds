'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom'
import "/src/app/globals.css";
import { editEvent, getAllEvents, getAllTeam, deleteItem, editTeam, editActiveMembers } from "/src/app/actions"
import deleteIcon from '/src/app/images/delete-pad.svg'
import editIcon from '/src/app/images/edit.svg'

// import {Headline} from "/src/app/components"
function Headline({ children }) {
  return (<div className="font-bold text-2xl mb-5">{children}</div>)
}

function InputBox({children, label}) {
  return (<div>
    <div>
      <label>{label}</label>
    </div>
    {children}
  </div>)
}

function TextInput({label, ...props}) {
  return (<InputBox label={label}>
    <input
      type="text"
      className="input input-bordered w-full"
      {...props}
    />
  </InputBox>)
}

function DateInput({label, ...props}) {
  return (<InputBox label={label}>
    <input
      type="datetime-local"
      className="input input-bordered"
      {...props}
    />
  </InputBox>)
}

function TextAreaInput({label, ...props}) {
  return (<InputBox label={label}>
    <textarea
      type="text"
      className="input input-bordered w-full"
      rows="4"
      {...props}
    />
  </InputBox>)
}

function EventEditor({editState, setEditState}) {
  const [formState, formAction] = useFormState(editEvent, {message: ''})

  return (
    <div className="flex flex-col gap-y-2 border-4 border-primaer rounded-md p-4 max-w-screen-sm w-full">
      <Headline>Event Editor</Headline>
      <form action={formAction} className="flex flex-col gap-y-4">
        <TextInput 
          id="eventid" 
          name="id" 
          label="ID (leave empty to create new)" 
          value={editState.id}
          onChange={e => setEditState({...editState, id: e.target.value})}
        />
        <TextInput 
          name="name" 
          label="Event Title" 
          placeholder="Brunch" 
          value={editState.name}
          onChange={e => setEditState({...editState, name: e.target.value})}
        />
        <DateInput 
          name="startdatetime" 
          label="Event Start Date&Time"
          value={editState.startdatetime}
          onChange={e => setEditState({...editState, startdatetime: e.target.value})}
        />
        <DateInput 
          name="enddatetime"
          label="Event End Date&Time"
          value={editState.enddatetime}
          onChange={e => setEditState({...editState, enddatetime: e.target.value})}
        />
        <TextInput 
          name="location" 
          label="Location" 
          placeholder="Cafe xyz"
          value={editState.location}
          onChange={e => setEditState({...editState, location: e.target.value})}
        />
        <TextInput 
          name="images" 
          placeholder="http://example.com/img1 http://example.com/img2"
          label="Image URL(s)"
          value={editState.images}
          onChange={e => setEditState({...editState, images: e.target.value})}
        />
        <TextAreaInput
          name="description"
          placeholder="We will have fun at the cafe!"
          label="Description"
          value={editState.description}
          onChange={e => setEditState({...editState, description: e.target.value})}
        />
        <TextAreaInput
          type="text"
          name="description_past"
          placeholder="We had fun at the cafe!"
          label="Description Past"
          value={editState.description_past}
          onChange={e => setEditState({...editState, description_past: e.target.value})}
        />
        <TextInput
          name="registration_url"
          placeholder="http://docs.google.com/forms/example"
          label="Registration URL"
          value={editState.registration_url}
          onChange={e => setEditState({...editState, registration_url: e.target.value})}
        />
        
        <button type="submit" className="btn btn-primary mt-4 border-4 border-white bg-white rounded-lg p-1 max-w-fit">
          Submit
        </button>
        <div>{formState.message}</div>
      </form>
    </div>
  );
};

function EventList({setEditState}) {
  const [events, setEvents] = useState([])

  function updateEvents() {
    getAllEvents().then(evs => setEvents(evs))
  }

  useEffect(() => {
    updateEvents()
  }, [])

  const deleteEvent = (id) => () => {
    deleteItem("events", id)
    updateEvents()
  }

  const editEvent = (event) => async () => {
    const newEditState = {...event}

    const formatDateTimeForInput = (date) => {
      var isoString = date.toISOString();

      var dateString = isoString.slice(0, 10); // YYYY-MM-DD
      var timeString = isoString.slice(11, 16); // HH:MM

      return dateString + "T" + timeString;
    }

    newEditState.id = String(event.id)
    newEditState.startdatetime = formatDateTimeForInput(event.startdatetime)
    newEditState.enddatetime = formatDateTimeForInput(event.enddatetime)

    setEditState(newEditState)
  }

  function EventRow(event) {
    return (<div className='border-2 flex items-center min-h-12' key={event.id}>
      <button onClick={editEvent(event)}>
        <Image src={editIcon} className="h-8 w-full" alt="edit icon" />
      </button>
      <button onClick={deleteEvent(event.id)}>
        <Image src={deleteIcon} className='h-8 w-full' alt="delete icon" />
      </button> 
      <span>{typeof event.startdatetime === "object" ? event.startdatetime.toDateString() : event.startdatetime} {event.name} @{event.location}</span>
    </div>)
  }

  return (<div className='w-full'>
    <Headline>Event List</Headline>
    <div className='flex flex-col gap-2 font-mono overflow-y-scroll max-h-[30vh]'>
      {events.map(event => EventRow(event))}
    </div>
  </div>)
}

function TeamEditor({editState, setEditState}) {
  const [formState, formAction] = useFormState(editTeam, {message: ''})

  return (
    <div className="flex flex-col gap-y-2 border-4 border-primaer rounded-md p-4 max-w-screen-sm w-full">
      <Headline>Team Editor</Headline>
      <form action={formAction} className="flex flex-col gap-y-4">
        <TextInput
          name="id"
          label="ID (leave empty to create new)"
          value={editState.id}
          onChange={e => setEditState({...editState, id: e.target.value})}
        />
        <TextInput
          name="name"
          label="Team Member Name"
          placeholder="Max Mustermann"
          value={editState.name}
          onChange={e => setEditState({...editState, name: e.target.value})}
        />
        <TextInput
          name="role"
          label="Role"
          placeholder="Head of mynds"
          value={editState.role}
          onChange={e => setEditState({...editState, role: e.target.value})}
        />
        <TextInput
          name="image"
          placeholder="http://example.com/img1"
          label="Image URL"
          value={editState.image}
          onChange={e => setEditState({...editState, image: e.target.value})}
        />
        <TextInput
          name="position"
          placeholder="3"
          label="Position in List on Homepage"
          value={editState.position}
          onChange={e => setEditState({...editState, position: e.target.value})}
        />

        <button type="submit" className="btn btn-primary mt-4 border-4 border-white bg-white rounded-lg p-1 max-w-fit">
          Submit
        </button>
        <div>{formState.message}</div>
      </form>
    </div>
  );
};

function TeamList({setEditState}) {
  const [team, setTeam] = useState([])

  function updateTeam() {
    getAllTeam().then(t => setTeam(t))
  }

  useEffect(() => {
    updateTeam()
  }, [])

  const deleteTeamMember = (id) => () => {
    deleteItem("team", id)
    updateTeam()
  }

  const editTeamMember = (teamMember) => async () => {
    const newEditState = {...teamMember}

    newEditState.id = String(teamMember.id)

    setEditState(newEditState)
  }

  function TeamRow(teamMember) {
    return (<div className='border-2 flex items-center min-h-12' key={teamMember.id}>
      <button onClick={editTeamMember(teamMember)}>
        <Image src={editIcon} className="h-8 w-full" alt="edit icon" />
      </button>
      <button onClick={deleteTeamMember(teamMember.id)}>
        <Image src={deleteIcon} className='h-8 w-full' alt="delete icon" />
      </button>
      <span>{teamMember.role} {teamMember.name}</span>
    </div>)
  }

  return (<div className='w-full'>
    <Headline>Team List</Headline>
    <div className='flex flex-col gap-2 font-mono overflow-y-scroll max-h-[30vh]'>
      {team.map(teamMember => TeamRow(teamMember))}
    </div>
  </div>)
}

function ActiveMembers() {
  return (<div className='w-full'>
    <Headline>Active Members</Headline>
    <form action={editActiveMembers}>
      <TextInput
        name="members"
        placeholder="21"
        label="Active Members"
      />
      <button type="submit" className="btn btn-primary mt-4 border-4 border-white bg-white rounded-lg p-1 max-w-fit">Submit</button>
    </form>
  </div>)
}

export default function Admin() {
  const [editEventState, setEditEventState] = useState({
    id: "",
    name: "",
    startdatetime: "",
    enddatetime: "",
    location: "",
    registration_url: "",
    images: "",
    description: "",
    description_past: "",
  })

  const [editTeamState, setEditTeamState] = useState({
    id: "",
    name: "",
    role: "",
    image: "",
    position: "",
  })

  return (<div className='p-5 flex flex-col items-center gap-4'>
    <EventEditor editState={editEventState} setEditState={setEditEventState} />
    <EventList setEditState={setEditEventState} />
    <TeamEditor editState={editTeamState} setEditState={setEditTeamState} />
    <TeamList setEditState={setEditTeamState} />
    <ActiveMembers />
  </div>)
}