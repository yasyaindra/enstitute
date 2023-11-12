import { getDashboardCourse } from "@/actions/GetDashboardCourse";
import { CoursesList } from "@/components/CoursesList";
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { InfoCard } from "./_components/InfoCard";
import { CheckCircle, Clock } from "lucide-react";

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourse(
    userId
  );

  return (
    <div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard
            icon={Clock}
            variant="default"
            label="In Progress"
            numberOfItems={coursesInProgress.length}
          />
          <InfoCard
            icon={CheckCircle}
            variant="success"
            label="Completed"
            numberOfItems={completedCourses.length}
          />
        </div>
        <CoursesList items={[...coursesInProgress, ...completedCourses]} />
      </div>
    </div>
  );
}
