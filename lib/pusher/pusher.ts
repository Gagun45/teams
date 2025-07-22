import Pusher from "pusher";

const appId = process.env.APPID!;
const cluster = process.env.CLUSTER!;
const secret = process.env.SECRET!;
const key = process.env.KEY!;

export const pusher = new Pusher({
  appId,
  cluster,
  secret,
  key,
});
