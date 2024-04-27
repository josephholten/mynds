import membersData from './members.json';
import eventsData from './events.json';
import Link from 'next/link';

function TopBar() {
  <div>todo</div>
}

function Headline({children}) {
  return(<div className="text-center font-bold text-2xl mb-5">{children}</div>)
}

function AboutUs() {
  return (<div className='flex justify-center'>
    <div className="w-1/12 flex flex-col justify-end">
      <img src="/quote-open.svg" />
    </div>
    <div className='italic font-bold text-lg text-center w-8/12'>
      <div>
        Our mission is to empower female students in
        business and economics, removing obstacles and
        fostering a gender-inclusive environment through
        mentorship, education, and community support.
      </div>
      <div>
        We are dedicated to a future where business and
        economics leaders mirror our diverse society, with
        female students fully supported to thrive in an equal
        professional world
      </div>
    </div>
    <div className='w-1/12'>
      <img src="/quote-close.svg"></img>
    </div>
  </div>)
}

function Members() {
  const members = membersData.map(member => (
    <div className="flex flex-col items-center" key={member.name}>
      <div className="font-bold text-center text-xl">{member.name}</div>
      <div className="italic text-base text-center text-lg">{member.role}</div>
      <img src={"/people/"+member.img_src} key={member.name} alt="member" className="h-36 w-36 object-cover rounded-full mt-5 mb-3"></img>
      <div>{member.description}</div> 
    </div>
  )) //description: 1) delete 2) ein/ausklappen 3) link to site with description 4) keep like this

  return (
    <div>
    <Headline>Meet our team!</Headline>
    <div className="flex flex-wrap justify-center gap-6">
      {members}
    </div>
    </div>
  )
}

function Events() {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const parseDate = (datestr) => {
    const [day, month, year] = datestr.split(".");
    return new Date(`${year}-${month}-${day}`);
  }

  const eventsDataPast = eventsData.filter(event => parseDate(event.date) < currentDate)
  const eventsDataFuture = eventsData.filter(event => parseDate(event.date) >= currentDate)

  const formatEvent = (event) => (
    <div className="flex flex-col items-center w-5/12" key={event.date}>
      <Link href={`/event/${event.name.replace(/\s+/g, '-').toLowerCase()}`}>
        <div className="font-bold text-center text-xl">{event.name}</div>
        <div className="italic text-center text-lg">{event.date}</div>
        <img src={"/events/"+event.img_src[0]} alt="member" className="w-full object-contain rounded-lg mt-5 mb-3"></img>
        <div>{event.description_past}</div> 
      </Link>
    </div>
  )

  const eventsPast = eventsDataPast.map(event => formatEvent(event))
  const eventsFuture = eventsDataFuture.map(event => formatEvent(event))

  const eventsFutureHTML = (
  <>
    <Headline>We look forward to meeting you at these events!</Headline>
    <div className="flex flex-wrap justify-center gap-6">
      {eventsFuture}
    </div>
  </>)

  return (
    <div>
      {eventsFuture.length !== 0 && eventsFutureHTML}
      <Headline>Our past success stories:</Headline>
      <div className="flex flex-wrap justify-center gap-6">
        {eventsPast}
      </div>
    </div>
)}

function Imprint() {
  return (<div>
    <div className="text-center font-bold text-xl">Impressum</div>
      <div className="flex flex-wrap justify-center gap-x-6 text-sm">
        <div>Verantwortlich für die Inhalte dieser Website: Mynds GbR</div>
        <div>Max Mustermann</div>
        <div> Musterstraße 1, 12345 Musterstadt</div>
        <a href="mailto:info@myndsgbr.de" className="hover:underline">info@myndsgbr.de</a>
        <div>Vertretungsberechtigt: Max Mustermann, Erika Mustermann</div>
        <Link href="/privacy" className="hover:underline">Datenschutzerklärung</Link>
      </div>
  </div>)
}


export default function Home() {
  return (
    <div className='flex flex-col gap-10 px-10 py-4 items-center'>
      <TopBar />
      <AboutUs />
      <Events />
      <Members />
      <Imprint />
      <div className="flex flex-wrap justify-center text-sm gap-x-1">
        <div>Website erstellt von </div>
        <a href="http://hirsch.holten.com" className='hover:underline'>Hirsch & Holten GbR</a>
      </div>
    </div>
  ); 
}
