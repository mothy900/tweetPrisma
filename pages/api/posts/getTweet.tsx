import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import withHandler from "../../../lib/withHandler";
import { withApiSession } from "../../../lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await db.post.findMany({ where: {} });
  res.status(200).json({
    result: true,
    tweets: data,
  });
  //   console.log(req.session.user);
  //   console.log("log");
  //   res.status(200).end();
}

export default withApiSession(withHandler({ method: ["GET"], handler }));
