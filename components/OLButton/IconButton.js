import React from "react";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";

function IconButton({ icon, title, path }) {
  return (
    <Tooltip title={title} placement="top">
      <Link href={path}>
        <div className="cursor-pointer rounded-full text-center">
          {icon}
        </div>
      </Link>
    </Tooltip>
  );
}

export default IconButton;
