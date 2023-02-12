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
import Footer from "../components/Footer";

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
    <div className="">
      <Head>
        <title>Olive | Happy Track</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="flex max-w-screen-xl px-24 mx-auto items-center justify-center">
        <section className="pt-14">
          <h1 className="text-center px-6 md:px-0 text-2xl md:text-3xl xl:text-3xl font-semibold mt-2 mb-6 text-teal-900">
            Track Your Appointment 😊
          </h1>
          <Paper
            component="form"
            sx={{
              p: "10px 20px",
              display: "flex",
              alignItems: "center",
              width: '300px',
              '@media (min-width: 780px)' : {
                width: '750px'
              },
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
            <IconButton type="button" sx={{ p: "10px" }} aria-label="track" onClick={track}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </section>
      </main>
      <div className="max-w-screen-lg mx-auto items-center justify-center pt-2 pb-32 px-4">
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
            (result) => (
              <AppointmentCard
                key={result._id}
               result={result}
              />
            )
          )}
      </div>
      <Footer />
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
