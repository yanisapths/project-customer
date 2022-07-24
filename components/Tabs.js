import React from 'react'


function Tabs({id,title,setSelected}) {
  return (
              <div className="p-4 inline-flex cursor-pointer" onClick = {() => setSelected(id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                <span className="ml-3 text-sm font-medium text-gray-900">  {title}  </span>
   </div>

  )
}

export default Tabs