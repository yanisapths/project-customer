import React from 'react'
import Tooltip from "@mui/material/Tooltip";

function IconButton({icon,title}) {
  return (
    <Tooltip title={title} placement="top">
    <div
      className="cursor-pointer rounded-full w-10 h-10 pt-4 text-center"
    >
      {icon}
    </div>
  </Tooltip>
  )
}

export default IconButton