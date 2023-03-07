import React from "react";
import { signIn as SignIntoProvider } from "next-auth/react";

const btnLogin = ({ provider }) => {
  return (
    <div className="">
      <btn
        className="block xxl:text-xs rounded-full bg-transparent active:text-opacity-75 focus:outline-none focus:ring"
        onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/" })}
      >
        <span className="text-sm flex items-center justify-center h-10 w-56 px-2 mr-2  lg:text-base  py-1  xl:text-lg bg-white rounded-full hover:bg-transparent">
          ลงชื่อเข้าใช้ด้วย {provider.name}
        </span>
      </btn>
    </div>
  );
};
export default btnLogin;
