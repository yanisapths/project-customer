import React from 'react'
import Tooltip from "@mui/material/Tooltip";

function IconButton({icon,title}) {
  return (
    <Tooltip title={title} placement="top">
    <div
      className="cursor-pointer rounded-full pt-2 text-center"
    >
      {icon}
    </div>
  </Tooltip>
  )
}

export default IconButton