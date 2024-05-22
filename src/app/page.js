import membersData from './members.json';
import eventsData from './events.json';
import Link from 'next/link';

import { TopBar, Headline } from './components';

function AboutUs(props) {
  return (<div className='flex justify-center py-5' {...props}>
    <div className="w-20 flex flex-col justify-end">
      <img src="/quote-open.svg" />
    </div>
    <div className='italic font-bold text-lg text-center max-w-prose'>
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
    <div className='w-20'>
      <img src="/quote-close.svg"></img>
    </div>
  </div>)
}

function Team(props) {
  //description: 1) delete 2) ein/ausklappen 3) link to site with description 4) keep like this
  return (
    <div className='flex flex-col items-center w-full py-5' {...props}>
      <Headline>Meet our team!</Headline>
      <div className="grid grid-cols-3 gap-14">
        {membersData.map(member => (
          <div className="flex flex-col items-center" key={member.name}>
            <div className="font-bold text-center text-xl">{member.name}</div>
            <div className="italic text-center text-lg">{member.role}</div>
            <img src={"/people/" + member.img_src} key={member.name} alt="member" className="h-auto object-cover rounded-full mt-5 mb-3" />
            <div>{member.description}</div>
          </div>
        ))}
      </div>
      <div className='font-bold text-4xl mt-16'>21</div>
      <div className='font-bold text-5xl mt-2'>Active Members</div>
      <div>
        Want to become part of our Team? Join our <a 
          className="underline" target="_blank" 
          href="https://chat.whatsapp.com/EoLzYlBaK9R7rubktNGzZF?fbclid=PAZXh0bgNhZW0CMTEAAaa_CMHfjyKyl5kVcuvDE2ZHRfl0tn5VF58nmmWHJb-WXixKJGgt6rnpSKo_aem_AQay7JaE6GqvemGT52JGMXV_sZMHJjFaB3lN7cIK6NMdKrkneWc4ikvWGfb6SB5C7iSKN4Fttaq43U8g449sgidA"
        >
          WhatsApp Community
        </a>!
      </div>
    </div>
  )
}

function Events(props) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const parseDate = (datestr) => {
    const [day, month, year] = datestr.split(".");
    return new Date(`${year}-${month}-${day}`);
  }

  const eventsDataPast = eventsData.filter(event => parseDate(event.date) < currentDate)
  const eventsDataFuture = eventsData.filter(event => parseDate(event.date) >= currentDate)

  const formatEvent = (event) => (
    <div className="flex flex-col items-center" key={event.date}>
      <Link href={`/event/${event.name.replace(/\s+/g, '-').toLowerCase()}`}>
        <div className="h-16 flex flex-col justify-center">
          <div className="font-bold text-center text-xl">{event.name}</div>
          <div className="italic text-center text-lg">{event.date}</div>
        </div>
        <img src={"/events/" + event.img_src[0]} alt="event" className="object-contain rounded-lg mt-5 mb-3"></img>
        <div>{event.description_past}</div>
      </Link>
    </div>
  )
  
  const eventsPast = eventsDataPast.map(event => formatEvent(event))
  const eventsFuture = eventsDataFuture.map(event => formatEvent(event))
  console.log(eventsFuture.length)

  return (
    <div className='flex flex-col py-5 gap-10' {...props}>
      {eventsFuture.length !== 0 && (
        <div>
          <Headline>Upcoming Events</Headline>
          <div className="grid grid-cols-2 justify-center gap-6 ">
            {eventsFuture}
          </div>
        </div>)}
        {eventsFuture.length == 0 && (
        <div>
          <Headline>New Events</Headline>
          <div className='mt-32 mb-48'>
            <Headline>Coming Soon!</Headline>
          </div>
        </div>)}
      <div className='flex flex-col items-center mt-16'>
        <Headline>What we do</Headline>
        <div className='max-w-prose mb-6'>
          Hier ein kurzer Text über die vergangenen Events! Wir hatten alle ganz viel Spaß.
          Wenn ihr bei einem der tollen Events mitmachen wollt, registriert euch bitte davor,
          indem ihr auf das Event klickt und dann dem Link folgt.
        </div>
        <div className="grid grid-cols-2 justify-center gap-6">
          {eventsPast}
        </div>
      </div>
    </div>
  )
}

function Imprint(props) {
  return (<div {...props}>
    <div className="text-center font-bold text-xl">Impressum</div>
    <div className="flex flex-wrap justify-center gap-x-6 text-sm">
      <div>Verantwortlich: mynds e.V.</div>
      <div>H3,20,68159 Mannheim</div>
      <a href="mailto:info@mynds-campus.de" className="underline">info@mynds-campus.de</a>
      <div>Vertretungsberechtigt: Lea Marie Kühn, Tim Neubauer & Annalena Straub als Vorstand von Mynds e.V.</div>
      <Link href="/privacy" className="underline">Datenschutzerklärung</Link>
    </div>
    <div className="flex flex-wrap justify-center text-sm gap-x-1 mt-5">
      <div>Website erstellt von </div>
      <a href="http://hirsch.holten.com" className='underline'>Hirsch & Holten GbR</a>
    </div>
  </div>)
}

function JoinUs(props) {
  return (<div className='flex items-center gap-3' {...props}>
    <div className='text-lg'>Want to join our community? Reach out under</div>
    <a target="_blank" href="https://chat.whatsapp.com/EoLzYlBaK9R7rubktNGzZF?fbclid=PAZXh0bgNhZW0CMTEAAaa_CMHfjyKyl5kVcuvDE2ZHRfl0tn5VF58nmmWHJb-WXixKJGgt6rnpSKo_aem_AQay7JaE6GqvemGT52JGMXV_sZMHJjFaB3lN7cIK6NMdKrkneWc4ikvWGfb6SB5C7iSKN4Fttaq43U8g449sgidA">
      <img src="/whatsapp.svg" className='w-10' />
    </a>
    <a target="_blank" href="https://www.instagram.com/mynds_mannheim?igsh=MTI0ZTYzanNoa2ZiYQ%3D%3D&utm_source=qr">
      <img src="/instagram.svg" className='w-10' />
    </a>
    <a target="_blank" href="mailto:info@mynds-campus.de">
      <img src="/mail.svg" className='w-10'/>
    </a>
    <a target="_blank" href="https://www.linkedin.com/company/mynds-campus/">
      <img src="/linkedin.svg" className='w-10'/>
    </a>
  </div>)
}


export default function Home() {
  return (<div className='flex flex-col items-center'>
    <TopBar />
    <div className='flex flex-col gap-10 items-center mx-10 mt-16 max-w-screen-lg'>
      <div className='flex justify-center'>
        <img src="/header_cut.svg" className='h-auto max-w-full' />
      </div>
      <JoinUs />
      <AboutUs id="about" />
      <Events className="stripe text-white py-5" id="events" />
      <Team id="team" />
      <Imprint className="stripe-down text-white py-5" />
    </div>
  </div>);
}
