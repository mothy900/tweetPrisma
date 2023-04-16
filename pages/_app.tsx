import { SWRConfig } from "swr";
import "../global.css";

export default function App({ Component, pageProps }: any) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="w-screen flex justify-center items-center">
        <div className="max-w-xl border w-full h-full">
          <Component {...pageProps} />
        </div>
      </div>
    </SWRConfig>
  );
}
