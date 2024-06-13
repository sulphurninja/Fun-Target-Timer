import HeaderText from "@/components/HeaderText";
import { DataContext } from "@/store/GlobalState";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import HandleResults from "../components/HandleResults";
import Wheel from "../components/Wheel";
import Timer from "../components/Timer";
import Timerleft from "../components/Timerleft";
import { Howl } from "howler";
import ResultsTable from "@/components/ResultsTable";
import Buttons from '@/components/Buttons';
import ImageCarousel from "../components/ImageCarousel";
import Time from "../components/Timer";
export default function wheel() {

    const [mustSpin, setMustSpin] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [couponNum, setCouponNum] = useState();

  const handleChange = () => {
    if (!spinning) {
      setSpinning(true);
      // Simulate fetching the winning number after 2 seconds (replace with actual logic)
      setTimeout(() => {
        const simulatedWinningNumber = Math.floor(Math.random() * 10) + 1;
        setCouponNum(simulatedWinningNumber);
        // setMustSpin(true);
      }, 1000);
    }
  };
  return (
    <div className="w-[30%]">
         <div className="wheelcontainer   h-[35vw] relative object-contain z-50">
              {/* madhale circle kaate */}
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={couponNum}
              
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
            <button   onClick={() => handleChange()}  className="bg-white w-12">SPIN</button>
    </div>
  )
}
