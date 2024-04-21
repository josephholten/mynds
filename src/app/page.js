import membersData from './members.json';

function TopBar() {
  <div>todo</div>
}

function AboutUs() {
  return (<div>
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
  </div>)
}

function Members() {
  const members = membersData.map(member => (
    <div className="flex flex-col items-center space-y-2">
    <div className="font-bold text-center text-lg">{member.name}</div>
    <div className="italic text-base text-center">{member.role}</div>
    <img src={member.img_src} alt="member" className="h-24 w-24 object-cover rounded-full"></img>
    <div>{member.description}</div>
  </div>
  ))

  return (
    <div className="flex flex-wrap justify-center gap-4">
    {members}
  </div>
  )
}

function Events() {
  return (<div>
    These are our events:
    <div>Event1</div>
    <div>Event2</div>
  </div>)
}

function Impressum() {
  <div>todo</div>
}


export default function Home() {
  return (
    <div className='flex flex-col gap-4 px-10 py-4'>
      <TopBar />
      <AboutUs />
      <Members />
      <Events />
      <Impressum />
    </div>
  ); 
}
