// import { useState } from 'react'

// const services = [
//   {
//     id:'1',
//     name: 'Startup',
//     ram: '12GB',
//     cpus: '6 CPUs',
//     disk: '160 GB SSD disk',
//   },
//   {
//     id:'2',
//     name: 'Business',
//     ram: '16GB',
//     cpus: '8 CPUs',
//     disk: '512 GB SSD disk',
//   },
// ]

// export default function Select({name}) {
//   const [isChecked, setIsChecked] = useState({ name: false})
//   const toggle = ({ target: {name} }) =>
//     setIsChecked({ ...isChecked})

//   // Are there any checked ones?
//   const shouldShow = Object.values(isChecked).some(val => val)

//   return (
//     <div className="w-full px-4 py-16">
//       <div className="w-full max-w-lg mx-auto">
//       <div className="grid grid-cols-2 gap-8">
//         <div className="relative mt-1"  >
//       {services.map((service ) => (
//           <label htmlFor={service.id}    onChange={setIsChecked} className="flex items-center justify-between p-4 text-sm font-medium transition-colors border border-gray-100 rounded-lg shadow-sm cursor-pointer peer-checked:border-blue-500 hover:bg-gray-50 peer-checked:ring-1 peer-checked:ring-blue-500">
//             <input
//               type="checkbox"
//               key={service.id}
//               id={service.name}
//               name={service.name}
//               checked={isChecked.name}
//               value={isChecked.name}
//               onClick={toggle}
//               className="flex w-5 h-5 text-blue-600"
//             />
//           <span>{service.name}</span>
//           {isChecked.name && (
//             <div>
//             {console.log(service.name)}
//             </div>
//           )}
//           </label>
//           ))}
//         </div>
//       </div>
//       </div>
//     </div>
//   )
// }