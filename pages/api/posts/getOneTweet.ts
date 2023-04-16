import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import withHandler from "../../../lib/withHandler";
import { withApiSession } from "../../../lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { id },
  } = req;
  const data = await db.post.findUnique({
    where: {
      id: id,
    },
  });
  console.log(id);
  res.status(200).json({
    result: true,
    errorCode: 0,
    tweet: data,
  });
  //   console.log(req.session.user);
  //   console.log("log");
  //   res.status(200).end();
}

export default withApiSession(withHandler({ method: ["POST"], handler }));
