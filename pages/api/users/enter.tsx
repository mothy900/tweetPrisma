import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";

interface ResponseType {
  result: boolean;
  [key: string]: any;
}

export default async function enterHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, name } = req.body;
  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  if (!email)
    return res.status(400).json({
      result: false,
      errorCode: 1,
      errorMessage: "형식이 잘못되었습니다.",
    });

  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      console.log("이미 가입한 회원입니다.", user);
      return res.json({
        result: false,
        errorCode: 1,
        errorMessage: "중복된 ID 입니다.",
      });
    } else {
      const token = await db.token.create({
        data: {
          payload: payload,
          user: {
            connectOrCreate: {
              where: {
                email: email,
              },
              create: {
                email: email,
                name: name,
              },
            },
          },
        },
      });
      console.log("회원가입 성공 : ", token);
      return res.json({
        result: true,
        errorCode: 0,
        message: "회원가입에 성공했습니다.",
        token: payload,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      result: false,
      errorCode: 2,
      errorMessage: "서버 오류입니다. 잠시 후 다시 시도해주세요.",
    });
  }
}
