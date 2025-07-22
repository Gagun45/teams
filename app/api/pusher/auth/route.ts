import { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";
import Pusher from "pusher";

const appId = process.env.APPID!;
const cluster = process.env.CLUSTER!;
const secret = process.env.SECRET!;
const key = process.env.KEY!;

const pusher = new Pusher({
  appId,
  cluster,
  secret,
  key,
  useTLS: true,
});

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unautozired" }, { status: 401 });
  const formData = await req.text();
  const params = new URLSearchParams(formData);
  const socketId = params.get("socket_id");
  const channel = params.get("channel_name");

  if (!socketId || !channel) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const authResponse = pusher.authorizeChannel(socketId, channel);
  return NextResponse.json(authResponse);
};
