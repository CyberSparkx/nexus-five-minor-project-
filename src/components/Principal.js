import React from 'react'
import Image from 'next/image'

const Principal = () => {
  return (
    <div className="px-6 sm:px-10 md:px-20 flex flex-wrap pt-24">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold my-5 mx-auto text-center">
        Principal, SGP
      </h1>

      <div className="w-full flex justify-center mb-8">
        <Image
          src="/Principal.jpg"
          width={400}
          height={400}
          alt="Picture of the Principal"
          className="rounded-full object-cover"
        />
      </div>

      <div className="bg-zinc-400 w-full rounded-lg text-sm sm:text-base md:text-lg py-4 px-4 sm:px-8 md:px-12">
        <p className="text-center sm:text-left">
          Siliguri Government Polytechnic is located exclusively in an urban locality. Siliguri, being the very next to Kolkata in status, has all the ingredients of a cosmopolitan nature. Geographically, it is fantastically located to serve many other adjoining areas, including hills. With the increasing aspirations of hill-people, Siliguri Government Polytechnic needs to serve for an increasing variety of courses as well as for additional intake. Accordingly, being in Siliguri shall mean being more efficient and dedicated in terms of providing service to students. We are prepared to take up the challenge of the future and do the needful. Let us all make Siliguri Government Polytechnic a regional center of all polytechnics, serving the needs of students and also of society at large.
        </p>
      </div>
    </div>
  )
}

export default Principal
