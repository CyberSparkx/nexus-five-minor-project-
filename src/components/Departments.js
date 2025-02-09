import React from 'react'
import Image from 'next/image'

const departments = [
    { name: 'Computer Science', description: 'Study of computers and computational systems', image: '/cst.jpg' },
    { name: 'Electronics  Engineering', description: 'Study of electronics and telecomunication', image: '/etce.jpg' },
    { name: 'Electrical Engineering', description: 'Study of electrical systems and circuits', image: '/ec.jpg' },
    { name: 'Civil Engineering', description: 'Design and construction of infrastructure', image: '/civil.jpg' },
    { name: 'Pharmacy', description: 'Application of chemistry for medical processes', image: '/pharma.jpg' },
    { name: 'Electronics Instrumental Engineering', description: 'Nothing Special', image: '/eie.jpg' },
    { name: 'Architecture', description: 'Design of interior and extirior', image: '/arch.jpg' },
  ];

const Departments = () => {
  return (
    <div className='mt-10'>
        <h1 className='text-5xl font-semibold mx-auto  w-[67vw]'>Departments</h1>

        <div>
        <div className="container mx-auto px-6 py-12">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative w-full h-48">
              <Image
                src={dept.image}
                alt={dept.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">{dept.name}</h3>
              <p className="text-gray-600 mt-2">{dept.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
    </div>
  )
}

export default Departments