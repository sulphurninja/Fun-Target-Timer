import HeaderText from "@/components/HeaderText";
import { DataContext } from "@/store/GlobalState";
import Head from "next/head";
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import HandleResults from "../components/HandleResults";
import Wheel from "../components/Wheel";
import Timer from "../components/Timer";
import Timerleft from "../components/Timerleft";
import { Howl } from "howler";
import Cookie from 'js-cookie';
import ResultsTable from "@/components/ResultsTable";
import Buttons from '@/components/Buttons';
import ImageCarousel from "../components/ImageCarousel";
import Time from "../components/Timer";

function game() {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();
  const [time, setTime] = useState(new Date());
  const [couponNum, setCouponNum] = useState();
  const [mustSpin, setMustSpin] = useState(false);
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState("");


  const [userName, setUserName] = useState(auth && auth.user && auth.user.userName ? auth.user.userName : "");


  useEffect(() => {
    if (auth && auth.user && auth.user.userName) {
        // Update state and localStorage when user is authenticated
        setUserName(auth.user.userName);
        localStorage.setItem("userName", auth.user.userName);
    }
}, [auth]);

  useEffect(() => {
    // Retrieve username from localStorage on component mount
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
        setUserName(storedUserName);
    }
}, []);





  const wheelSound = new Howl({
    src: ["/wheel.mp3"],
  });

  const winningSound = new Howl({
    src: ["/winning.mp3"],
  });

  const timeRemainingSound = new Howl({
    src: ["/10sec.mp3"],
  });
  const [hasReloaded, setHasReloaded] = useState(false);

  useEffect(() => {
    const hasReloadedStorage = localStorage.getItem('hasReloaded');
    if (!hasReloadedStorage) {
      localStorage.setItem('hasReloaded', 'true');
      setHasReloaded(true);
      window.location.reload();
    }

    return () => {
      localStorage.removeItem('hasReloaded');
      setHasReloaded(false);
    };
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  const nextToDraw = new Date(
    time.getFullYear(),
    time.getMonth(),
    time.getDate(),
    time.getHours(),
    time.getMinutes() + 1,
    0,
    0
  );

  const timeDiff = Math.floor((nextToDraw - time) / 1000);
  const seconds = timeDiff % 60;
  const timeToDraw = `${seconds.toString().padStart(2, "0")}`;
  const nextToDrawtime = nextToDraw.toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
});



  useEffect(() => {
    const fetchWinningNumber = async (userName) => {
      if (timeToDraw >= 0) {
        try {
          const response = await fetch(
            `/api/getWinningNumber?userName=${encodeURIComponent(userName)}&drawTime=${encodeURIComponent(nextToDrawtime)}`
          );
          if (response.ok) {
            const data = await response.json();
            setCouponNum(data.couponNum);
            console.log(data.couponNum, "this is the fetched result");
          } else {
            console.log("Error fetching winning number:", response.statusText);
          }
        } catch (err) {
          console.log("Error fetching winning number:", err);
        }
      }
    };

    console.log(userName, 'username whats');
    fetchWinningNumber(userName); // Call immediately on mount

    const timer = setInterval(() => {
      fetchWinningNumber(userName);
    }, 20000);

    return () => clearInterval(timer);
  }, [nextToDrawtime, timeToDraw]);


  console.log(nextToDrawtime, 'oyeeeee AM PM???')

  const handleChange = () => {
    if (!spinning) {
      setSpinning(true);
      console.log(couponNum, "this is client side result");
      setMustSpin(true);
    }
  };
  let wheelSoundPlayed = false;
  let winningSoundPlayed = false;
  let timeRemainingSoundPlayed = false;

  function run() {
    if (timeToDraw == 0) {
      handleChange();
    }
    if (timeToDraw == 0 && !wheelSoundPlayed) {
      wheelSound.play();
      wheelSoundPlayed = true;
    }
    if (timeToDraw == 54 && !winningSoundPlayed) {
      winningSound.play();
      winningSoundPlayed = true;
    }
    if (timeToDraw == 19 && !timeRemainingSoundPlayed) {
      timeRemainingSound.play();
      timeRemainingSoundPlayed = true;
    }
  }


  run();



  return (
    <>
      <Head>
        <title>Fun Target Timer - Game</title>
      </Head>

      <div className={styles.try}>
        <div className="flex justify-center">

          <img src="/name.gif" className="h-12   justify-center" />
        </div>

        <div className='grid grid-cols-3  '>
          <div className="mt-[1.5rem] w-[100%]">
            <div className="w-[70%]">
              <div className=" grid-cols-3 grid gap-6  "> {/* Coins  */}
                <img src="/1.png" className="h-10 lg:h-12 " />
                <img src="/5.png" className="h-10 lg:h-12" />
                <img src="/10.png" className="h-10 lg:h-12" />
                <img src="/50.png" className="h-10 " />
                <img src="/100.png" className="h-10 " />
                <img src="/500.png" className="h-10 " />
                <img src="/1000.png" className="h-10  " />
                <img src="/5000.png" className="h-10 " />
                <img src="/d.png" className="h-10  " />
              </div>
            </div>
            <div className="flex absolute gap-1   mt-6">
              <img src="/balance.png" className="h-12 w-28 " />
              <img src="/total.png" className="h-12 w-28" />
              <img src="/winning.png" className="h-12 w-28" />
            </div>
            <div className="flex gap-x-10 mt-[42%]">
              <img src="/button1.png" className="h-12 " />
              <img src="/button2.png" className="h-12" />
              <img src="/button3.png" className="h-12" />
              <img src="/button4.png" className="h-12" />
              <img src="/button5.png" className="h-12" />
              <img src="/button6.png" className="h-12" />
              <img src="/button7.png" className="h-12" />
              <img src="/button8.png" className="h-12" />
              <img src="/button9.png" className="h-12" />
              <img src="/button0.png" className="h-12" />
            </div>


          </div>


          <div className=""> {/* Wheel  */}
            <div className="wheelcontainer   h-[35vw] relative -mt-[0.5rem] lg:mt-[4.5rem]  object-contain z-0">
              {/* madhale circle kaate */}
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={couponNum}
                onClick={() => handleChange()}
                onStopSpinning={() => {
                  setSpinning(false);
                  setMustSpin(false);
                }}
              />
              {/* * bahercha circle */}
              <img
                src="/circleout.gif"
                style={{
                  width: "160%",
                  height: "96%",
                  left: "0%",
                  top: "3%",

                  position: "absolute",
                }}
                className="z-50"
              />
              <ImageCarousel />

              <img
                src="/cut2.png"
                alt="button"
                className="z-20"
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  width: "45%",
                  height: "40%",
                  left: "28%",
                  top: "29%",
                  margin: "0 auto",


                }}
              />
              <img
                src="/cut.png"
                alt="button"
                className="z-50"
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  width: "45%",
                  height: "40%",
                  left: "28%",
                  top: "29%",
                  margin: "0 auto",


                }}
              />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <div>
              <Timer />

              <ResultsTable />

            </div>
            <div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default game;