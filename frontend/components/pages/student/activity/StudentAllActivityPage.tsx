"use client";

import { useNavbarContext } from "@/providers/NavbarProvider";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentActivityItem from "@/components/student/activity/StudentActivityItem";
import { Separator } from "@/components/ui/separator";
import { ACTIVITIES } from "@/types/Activity";

const StudentAllActivityPage = () => {
  const { setHeaderNavbarTitle, setShowBottomNavbar, setShowHeaderNavbar } = useNavbarContext();

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(category || "ALL");

  useEffect(() => {
    setHeaderNavbarTitle("กิจกรรมของฉันทั้งหมด");
    setShowBottomNavbar(true);
    setShowHeaderNavbar(true);
  }, []);

  return (
    <div className="p-6">
      <Tabs defaultValue="ALL" className="w-full" value={selectedCategory}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="ALL"
            id="ALL"
            onClick={(e) => setSelectedCategory(e.currentTarget.id)}
          >
            ทั้งหมด
          </TabsTrigger>
          <TabsTrigger
            value="ACTIVITY"
            id="ACTIVITY"
            onClick={(e) => setSelectedCategory(e.currentTarget.id)}
          >
            กิจกรรม
          </TabsTrigger>
          <TabsTrigger
            value="VOLUNTEER"
            id="VOLUNTEER"
            onClick={(e) => setSelectedCategory(e.currentTarget.id)}
          >
            จิตอาสา
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ALL" className="mt-8">
          {ACTIVITIES.map((activity, index) => (
            <div key={index}>
              <StudentActivityItem activity={activity} />
              <Separator className="my-4" />
            </div>
          ))}
        </TabsContent>
        <TabsContent value="ACTIVITY" className="mt-8">
          {ACTIVITIES.map((activity, index) => (
            <div key={index}>
              <StudentActivityItem activity={activity} />
              <Separator className="my-4" />
            </div>
          ))}
        </TabsContent>
        <TabsContent value="VOLUNTEER" className="mt-8">
          {ACTIVITIES.map((activity, index) => (
            <div key={index}>
              <StudentActivityItem activity={activity} />
              <Separator className="my-4" />
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentAllActivityPage;
