import React from 'react'
import AddCircleIcon from "@mui/icons-material/AddCircle";

function RequestFooterButton({handleClick}) {
  return (
    <footer className="fixed bottom-8 inset-x-0 flex justify-center shadow-black/10 shadow-3xl md:w-[650px] mx-6 md:mx-auto rounded-full text-center transition
    transform duration-100 ease-out cursor-pointer">
          <div
            onClick={handleClick}
            className="w-full py-4 rounded-full border border-[#7BC6B7] bg-[#7BC6B7] shadow-lg text-white hover:bg-transparent hover:text-[#7BC6B7] focus:outline-none focus:ring active:text-[#7BC6B7]"
          >
            <AddCircleIcon className="h-8 w-8" />
            <span className="text-xl pl-3 font-medium xl:text-2xl text-center">
              {" "}
              จองนัด{" "}
            </span>
          </div>
      </footer>
  )
}

export default RequestFooterButton