"use client"

export function CalendarLink({ eventData }) {
  const { title, description, startTime, endTime, location } = eventData;
  const event = title.toLowerCase().replace(" ", "-")

  const formatTime = (time) => time.replace(/-|:|\.\d\d\d/g, '');

  const googleUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(title)}&dates=${formatTime(startTime)}/${formatTime(endTime)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
  const microsoftUrl = `https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&startdt=${formatTime(startTime)}&enddt=${formatTime(endTime)}&subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

  // Apple ics file:
  function handleAddEvent() {
    const eventICS = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VTIMEZONE',
      'TZID:Europe/Berlin', //all the following is just time zone stuff
      'BEGIN:STANDARD',
      'DTSTART:19961027T030000',
      'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
      'TZOFFSETFROM:+0200',
      'TZOFFSETTO:+0100',
      'TZNAME:CET',
      'END:STANDARD',
      'BEGIN:DAYLIGHT',
      'DTSTART:19810329T020000',
      'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
      'TZOFFSETFROM:+0100',
      'TZOFFSETTO:+0200',
      'TZNAME:CEST',
      'END:DAYLIGHT',
      'END:VTIMEZONE',
      'BEGIN:VEVENT', //now event stuff
      `URL:localhost:3000/events/${event}`,
      `DTSTART;TZID=Europe/Berlin:${formatTime(startTime).split("+")[0]}`,
      `DTEND;TZID=Europe/Berlin:${formatTime(endTime).split("+")[0]}`,  
      `SUMMARY:${title}`,    // Event title
      `DESCRIPTION:${description}`, 
      `LOCATION:${location}`, 
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([eventICS], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'event.ics');  // Set the file name for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-wrap justify-center gap-x-6 text-sm p-4">
      <button onClick={() => window.open(googleUrl, '_blank')} className="underline">
        Add to Google Calendar
      </button>
      <button onClick={handleAddEvent} className="underline">
        Add to Apple Calendar
      </button>
    </div>
  );
};

