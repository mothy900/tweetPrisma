import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface TweetResult {
  id: number;
  content: string;
  userId: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  likes: number;
}

export default function TweetDetail() {
  const router = useRouter();
  console.log(router.query.id);
  const [data, setData] = useState<TweetResult>();
  const getTweet = async () => {
    const { data } = await axios.post("/api/posts/getOenTweet", {
      id: router.query.id,
    });
    console.log(data);
    if (data.errorCode > 0) {
    } else {
      setData(data.tweet);
    }
  };
  useEffect(() => {
    getTweet();
  }, []);

  return (
    <div className="border h-screen  bg-gray-800 border-gray-800">
      {/* <div className="w-full  bg-gray-800 border-gray-300 flex space-x-2">
        <div className="w-16 bg-gray-800">
          <div className=""></div>
        </div>
        <div className="w-full bg-gray-800 space-y-2">
          <div>
            <span className="text-gray-300">
              {data?.userId ?? data?.authorId}
            </span>
            <span className="block text-gray-400">{data?.content}</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-300 hover:cursor-pointer active:scale-90 transition-all"></div>
            <span className="text-gray-300 text-sm">Like!</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
