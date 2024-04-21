import membersData from './members.json';
import privacyPolicyText from './privacyPolicy';
//import React, { useState } from 'react';

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
    <div className="flex flex-col items-center">
      <div className="font-bold text-center text-xl">{member.name}</div>
      <div className="italic text-base text-center text-lg">{member.role}</div>
      <img src={member.img_src} alt="member" className="h-36 w-36 object-cover rounded-full mt-5 mb-3"></img>
      <div>{member.description}</div> 
    </div>
  )) //description: 1) delete 2) ein/ausklappen 3) link to site with description 4) keep like this

  return (
    <>
    <div className="text-center font-bold text-2xl mb-5">Meet our Team!</div>
    <div className="flex flex-wrap justify-center gap-6">
      {members}
    </div>
    </>
  )
}

function Events() {
  return (<div>
    These are our events:
    <div>Event1</div>
    <div>Event2</div>
  </div>)
}

function Imprint() {
  //const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  return (
    <div className='gap-y-1'>
    <div className="flex flex-wrap justify-center gap-x-6 text-sm p-4">
      <div>Verantwortlich für die Inhalte dieser Website: Mynds GbR</div>
      <div>Max Mustermann</div>
      <div> Musterstraße 1, 12345 Musterstadt</div>
      <a href="mailto:info@myndsgbr.de" className="hover:underline">info@myndsgbr.de</a>
      <div>Vertretungsberechtigt: Max Mustermann, Erika Mustermann</div>
      
    </div>
     <div className="flex flex-wrap justify-center text-sm p-4 gap-x-1">
     <div>Website erstellt von: </div>
     <a href="http://hirsch.holten.com" className='hover:underline'>Hirsch & Holten GbR</a>
     <a href="mailto:hirsch@holten.com" className="hover:underline">(Kontakt)</a>
   </div>
   </div>
  );
}
/*
<button 
        className="text-blue-500 hover:text-blue-800" 
        onClick={() => setShowPrivacyPolicy(!showPrivacyPolicy)}>
        Datenschutzerklärung
      </button>
      {showPrivacyPolicy && <div className="mt-2">{privacyPolicyText}</div>}
*/


export default function Home() {
  return (
    <div className='flex flex-col gap-4 px-10 py-4'>
      <TopBar />
      <AboutUs />
      <Members />
      <Events />
      <Imprint />
    </div>
  ); 
}
