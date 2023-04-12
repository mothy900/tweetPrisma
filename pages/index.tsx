import Image from "next/image";
import React from "react";

export default function Home() {
  const imageUrl =
    "https://i.pinimg.com/564x/f9/56/95/f95695efee0e896af629f6b52b5a7fca.jpg";
  return (
    <div className="w-screen flex justify-center items-center">
      <div className="max-w-xl border w-full h-full">
        <div className="w-full h-44"></div>
        <div className="w-full border border-black flex">
          <div className="w-10 bg-slate-300">
            <div className=""></div>
          </div>
          <div className="w-full bg-amber-200 space-y-2">
            <div>
              <span>일상다반사</span>
              <span>@day_off_daying</span>
              <span className="block">
                이렇게 된 이상 하도영 공부법으로 간다
              </span>
            </div>

            <div>
              <Image
                className="rounded-xl h-auto"
                width={300}
                height={450}
                layout="fixed"
                src={imageUrl}
              />
            </div>
            <div className="flex space-x-10">
              <div className="w-8 h-8 bg-green-300"></div>
              <div className="w-12 h-8 bg-green-300"></div>
              <div className="w-8 h-8 bg-green-300"></div>
              <div className="w-14 h-8 bg-green-300"></div>
              <div className="w-8 h-8 bg-green-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
