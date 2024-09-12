import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) redirect("/");

  const userProfile = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (userProfile?.plan === "free") redirect("/");

  return (
    <div className="max-w-7xl mx-auto">
      You are on the premium plan so you can see this page
    </div>
  );
}
