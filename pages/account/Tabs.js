import React from "react"
import Link from "next/link"
import { withRouter } from "next/router"
import Account from "./Account"
import Family from "./Family"

const Tabs = ({ router }) => {
  const {
    query: { tab }
  } = router

  const isTabOne = tab === "1" || tab == null
  const isTabTwo = tab === "2"
  return (
    <div className="shadow-md">
        <div className="flex border-b-black border-b-1 bg-gray-200">
                <div selected={isTabOne} className="px-8">
                  <Link href={{ pathname: "/account/"}}>
                    <a>Account</a>
                  </Link>
                </div>
                <div selected={isTabTwo}>
                  <Link href={{ pathname: "/account/Family" }}>
                    <a>Family</a>
                  </Link>
                </div>
        </div>
        {/* <div className="bg-white px-8 xs:mx-4 xs:py-60  min-w-md  mx-auto  rounded-xl shadow-xl">
            {isTabOne && <React.Fragment><Account /></React.Fragment>}
            {isTabTwo &&<React.Fragment>2</React.Fragment>}
      </div> */}
    </div>
  )
}

export default withRouter(Tabs)