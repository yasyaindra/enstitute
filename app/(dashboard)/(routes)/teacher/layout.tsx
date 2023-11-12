import { isTeacherMenu } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!isTeacherMenu(userId)) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default TeacherLayout;
