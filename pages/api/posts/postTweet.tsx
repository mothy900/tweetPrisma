import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import withHandler from "../../../lib/withHandler";
import { withApiSession } from "../../../lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { content },
    session: { user },
  } = req;
  const userId = await db.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (!content)
    return res.status(401).json({
      result: false,
      errorCode: 3,
      errorMessage: "요청이 잘못 되었습니다.",
    });
  else {
    const tweets = await db.post.create({
      data: {
        content: content,
        userId: userId?.email,
        author: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    console.log("게시글 생성 성공", tweets);
    return res.status(200).json({
      result: true,
      errorCode: 0,
      tweets: tweets,
    });
  }
}

export default withApiSession(withHandler({ method: ["POST"], handler }));
