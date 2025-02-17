import prismadb from "@/lib/prismadb";
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await clerkClient();

  const users = await response.users.getUserList();

  const userId = users.data[0].id;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <div>{children}</div>;
}
