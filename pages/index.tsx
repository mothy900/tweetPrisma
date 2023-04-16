import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import useTweet from "../lib/useTweet";

interface TweetResult {
  id: number;
  content: string;
  userId: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  likes: number;
}
export default function Home() {
  const tweets = useTweet();
  console.log(tweets);
  const router = useRouter();
  const [text, setText] = useState("");
  const makeTweet = async () => {
    const { data } = await axios.post("/api/posts/postTweet", {
      content: text,
    });
    if (data.errorCode > 0) {
      console.log("글 올리기 실패 ", data);
    } else {
      setText("");
    }
  };
  const { data } = useSWR("/api/posts/getTweet");
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="border border-gray-800">
      <div className="w-full h-44 bg-gray-800">
        <div className="flex w-full space-x-2">
          <div className="w-16 bg-gray-400">
            <span>프로필</span>
          </div>
          <div className="w-full">
            <div>
              <input
                onChange={(e) => {
                  setText(e.target.value);
                }}
                value={text}
                type={"text"}
                placeholder="What's happening?"
                className="w-full h-14 outline-none bg-gray-800 py-12 text-lg placeholder:text-lg text-gray-100"
              />
            </div>
            <div className="w-full h-14 border-t border-b border-gray-100 justify-end flex items-center px-2">
              <div
                onClick={() => {
                  !!text && makeTweet();
                }}
                className={`h-10 w-20 ${
                  !!text ? " bg-cyan-300 active:scale-90" : " bg-gray-300"
                } flex items-center justify-center hover:cursor-pointer rounded-[20px] transition-all `}
              >
                <span className="text-lg text-gray-800 select-none active:text-white">
                  Tweet
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {data?.tweets.map((item: TweetResult, idx: number) => {
        return (
          <div
            key={idx}
            onClick={() => {
              router.push(`/tweet/${item.id}`);
            }}
            className="w-full p-3 border-t bg-gray-800 border-gray-300 flex space-x-2"
          >
            <div className="w-16 bg-gray-800">
              <div className=""></div>
            </div>
            <div className="w-full bg-gray-800 space-y-2">
              <div>
                <span className="text-gray-300">
                  {" "}
                  작성자 : {item.userId ?? item.authorId}
                </span>

                <span className="block text-gray-400">{item.content}</span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-300 hover:cursor-pointer active:scale-90 transition-all"></div>
                <span className="text-gray-300 text-sm">Like!</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
