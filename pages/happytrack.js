import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import { useRouter } from "next/dist/client/router";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import AppointmentCard from "../components/OLCard/AppointmentCard";

function HappyTrack({ data }) {
  const theme = useTheme();
  const router = useRouter();
  const [trackId, setSearchInput] = useState("");

  const resetInput = () => {
    setSearchInput("");
  };

  const handleKeyDown = (e) => {
    router.push({
      pathname: "happytrack",
      query: {
        _id: trackId,
      },
    });
    if (e.key == "Enter") {
      router.push({
        pathname: "happytrack",
        query: {
          _id: trackId,
        },
      });
    }
  };

  const track = () => {
    router.push({
      pathname: "happytrack",
      query: {
        _id: trackId,
      },
    });
  };

  function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
  }

  return (
    <div className="h-screen">
      <Head>
        <title>Olive | Happy Track</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="flex max-w-screen-xl px-24 mx-auto items-center justify-center">
        <section className="pt-14">
          <h1 className="text-center px-6 md:px-0 text-3xl font-semibold mt-2 mb-6 text-teal-900">
            Track Your Appointment 😊
          </h1>
          <Paper
            component="form"
            sx={{
              p: "10px 20px",
              display: "flex",
              alignItems: "center",
              width: 750,
              borderRadius: "32px",
              boxShadow: 4,
              mt: 6,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: 20 }}
              placeholder="Enter appointment number"
              inputProps={{ "aria-label": "Search appointment" }}
              value={trackId}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="track">
              <SearchIcon onClick={track} />
            </IconButton>
          </Paper>
        </section>
      </main>
      <div className="max-w-screen-xl mx-auto items-center justify-center pt-2">
        {data
          .filter(({ _id }) => {
            if (_id == "") {
              return "Not found";
            }
            const escaped = escapeRegExp(_id);
            const re = new RegExp(`.*${escaped}$`);
            return re.test(router.query._id);
          })
          .map(
            ({
              _id,
              clinic_id,
              course_id,
              firstName,
              lastName,
              nickName,
              appointmentDate,
              appointmentTime,
              endTime,
              appointmentPlace,
              location,
              address,
              sex,
              lineId,
              status,
              phoneNumber,
            }) => (
              <AppointmentCard
                key={_id}
                _id={_id}
                firstName={firstName}
                lastName={lastName}
                nickName={nickName}
                phoneNumber={phoneNumber}
                status={status}
                lineId={lineId}
                sex={sex}
                appointmentDate={appointmentDate}
                appointmentTime={appointmentTime}
                address={address}
                endTime={endTime}
                appointmentPlace={appointmentPlace}
                location={location}
                course_id={course_id}
                clinic_id={clinic_id}
              />
            )
          )}
      </div>
    </div>
  );
}

export default HappyTrack;

export async function getServerSideProps() {
  const data = await fetch(`${process.env.dev}/appointment`).then((res) =>
    res.json()
  );

  return {
    props: {
      data,
    },
  };
}
