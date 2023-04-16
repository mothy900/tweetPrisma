import axios from "axios";
import { useForm } from "react-hook-form";

interface EnterResponse {
  result: boolean;
  errorCode: number;
  errorMessage: string;
}
export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("onSubmit : ", data);
    // setError("email", { message: "Email이 없습니다." });
    if (!errors.email && getValues("email")) {
      enterHandler();
    }
  };

  const enterHandler = async () => {
    const { data } = await axios.post<EnterResponse>("/api/users/enter", {
      email: getValues("email"),
      name: getValues("name"),
    });
    if (data.errorCode > 0) {
      setError("email", { type: "custom", message: data.errorMessage });
    } else {
      //토큰 발급
    }
  };

  return (
    <div className="h-screen bg-amber-200 flex flex-col justify-center items-center">
      <div className="w-full h-1/3 bg-teal-400 flex flex-col justify-center items-center space-y-10">
        <div>
          <span className="text-xl font-semibold text-white">회원가입</span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <div className="space-x-3">
            <span className="w-10">ID : </span>
            <input
              placeholder="email"
              className={`py-2 px-4 border rounded-md outline-none ${
                errors.email ? " border-red-500" : "border-blue-500"
              }`}
              type={"text"}
              {...register("email", { required: true, pattern: /@/i })}
            />
          </div>
          {errors.email?.type === "custom" && (
            <p className="text-sm font-medium text-red-600" role="alert">
              중복된 Email입니다
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
          <div>
            <span className="w-10">이름 : </span>
            <input
              placeholder="이름 입력"
              className={`py-2 px-4 border rounded-md outline-none ${
                errors.name ? " border-red-500" : "border-blue-500"
              }`}
              type={"text"}
              {...register("name", { required: true })}
            />
          </div>
          {errors.name?.type === "required" && (
            <p className="text-sm font-medium text-red-600" role="alert">
              Name is required
            </p>
          )}
          <button className="px-10 py-2 border border-black rounded-md">
            회원가입
          </button>
        </form>
      </div>
      <div className="mt-10 text-gray-600 underline hover:cursor-pointer"></div>
    </div>
  );
}
