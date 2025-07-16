import { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "2023278",
  cluster: "eu",
  secret: "8b8a4d72311c315a8434",
  key: "c95679ae0599cdb806b7",
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
