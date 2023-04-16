import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("data : ", data);
    loginHandler();
  };
  //여기에 api 작업 진행
  const loginHandler = async () => {
    const { data } = await axios.post("/api/users/login", {
      email: getValues("email"),
    });
    if (data.errorCode > 0) {
      setError("email", { type: "custom", message: data.errorMessage });
    } else {
      router.push("/");
    }
  };
  return (
    <div className="h-screen bg-amber-200 flex flex-col justify-center items-center">
      <div className="w-full h-1/3 bg-teal-400 flex flex-col justify-center items-center space-y-10">
        <div>
          <span className="text-xl font-semibold text-white">Login</span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <span>ID : </span>

            <input
              className={`py-2 px-4 border rounded-md outline-none ${
                errors.email ? " border-red-500" : "border-blue-500"
              }`}
              type={"text"}
              placeholder="email 입력"
              {...register("email", { required: true, pattern: /@/i })}
            />
          </div>
          {errors.email?.type === "custom" && (
            <p className="text-sm font-medium text-red-600" role="alert">
              {errors.email?.message}
            </p>
          )}
          {errors.email?.type === "required" && (
            <p className="text-sm font-medium text-red-600" role="alert">
              Email is required
            </p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="text-sm font-medium text-red-600" role="alert">
              @가 포함된 이메일 형식을 적어주세요
            </p>
          )}
          <button
            className="px-10 py-2 border border-black rounded-md"
            onClick={() => console.log(getValues("email"))}
          >
            로그인
          </button>
        </form>
      </div>
      <div className="mt-10 text-gray-600 underline hover:cursor-pointer">
        <Link href={"/create-account"}>
          <span>회원가입</span>
        </Link>
      </div>
    </div>
  );
}
