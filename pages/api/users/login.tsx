import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import withHandler from "../../../lib/withHandler";
import { withApiSession } from "../../../lib/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  const { email } = req.body;
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  if (email) {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log("user there is");
    if (user) {
      const token = await db.token.create({
        data: {
          payload: payload,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      console.log("로그인 성공! ", user, token);
      req.session.user = {
        id: user.id,
      };
      await req.session.save();
      await db.token.deleteMany({
        where: {
          userId: token.userId,
        },
      });
      res.status(200).json({
        result: true,
        errorCode: 0,
        token: payload,
      });
    } else {
      res.json({
        result: false,
        errorCode: 1,
        errorMessage: "회원정보가 없습니다..",
      });
    }
  } else {
    return res
      .status(400)
      .json({ result: false, message: "이메일을 입력해주세요." });
  }
}

export default withApiSession(
  withHandler({ method: ["POST"], isPrivate: false, handler })
);
