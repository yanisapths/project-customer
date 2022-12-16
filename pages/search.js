import React from 'react'
import Header from '../components/Header'
import { useRouter } from "next/dist/client/router";
import {format} from "date-fns";
import InfoCard from "../components/InfoCard"

function Search({ searchResults }) {
    const router = useRouter();
    const { location, startDate, endDate, noOfGuests } = router.query;

    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
      <div className="h-screen">
          <Header placeholder={`${location} | ${range} | ${noOfGuests} คน` } />
            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className=" text-md text-teal-900 mt-4 ">ศูนย์ดูแลกว่า 300 แห่ง - {range} -  สำหรับ {noOfGuests} คน</p>
                    <h1 className=" text-3xl font-semibold mt-2 mb-6 text-teal-900">ศูนย์ดูแลใน{location}</h1>
                    <div className="้hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">จังหวัด</p>
                    </div>

                    <div className="flex flex-col">
                        {searchResults.map(( {clinic_id,clinic_name, imageUrl,address,description,price,} 
                        ) => (
                            <InfoCard 
                                key={clinic_id}
                                clinic_name={clinic_name}
                                imageUrl={imageUrl}
                                address={address}
                                description={description}
                                price={price}
                            />
                        ))}
                    </div>
                </section>
            </main>
      </div>
  )
}

export default Search;

export async function getServerSideProps() {
    const searchResults = await fetch("https://ukbze987lk.execute-api.ap-northeast-1.amazonaws.com/dev/clinic").
    then(
        (res) => res.json()
    );

    return {
        props: {
            searchResults,
        }
    }
}