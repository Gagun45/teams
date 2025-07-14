import { auth } from "@/lib/auth";

const ProtectedPage = async () => {
  const session = await auth();
  return <main>{JSON.stringify(session)}</main>;
};
export default ProtectedPage;
