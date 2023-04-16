import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((response) => response.json());
export default function useTweet() {
  const { data, error } = useSWR("/api/posts/getTweet", fetcher);
  const router = useRouter();
  useEffect(() => {
    if (data && !data.result) {
      router.push("/log-in");
    }
  }, [data, router]);
  return { result: data, isLoading: !data && !error };
}
