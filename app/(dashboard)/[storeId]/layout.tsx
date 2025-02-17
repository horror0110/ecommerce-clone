import prismadb from "@/lib/prismadb";
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const response = await clerkClient();

  const users = await response.users.getUserList();

  const userId = users.data[0].id;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <div>This will be a Navbar</div>
      {children}
    </>
  );
}
