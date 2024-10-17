"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUERY_KEYS } from "@/constants";
import { getApiService } from "@/libs/tsr-react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MultiSelect from "@/components/MultiSelect";
import DataTable from "@/components/table/DataTable";
import studentActivityColumns from "@/components/table/columns/StudentActivityColumns";
import { ACTIVITIES, Activity } from "@/types/Activity";
import { useMutation } from "@tanstack/react-query";

const createActivityFormSchema = z.object({
  name: z.string().min(1, {
    message: "กรุณากรอกชื่อกิจกรรม",
  }),
  note: z.string().min(1, {
    message: "กรุณากรอกรายละเอียดกิจกรรม",
  }),
  location: z.string().min(1, {
    message: "กรุณากรอกสถานที่",
  }),
  earnedVolunteerHours: z.string().min(1, {
    message: "กรุณากรอกชั่วโมงจิตอาสา",
  }),
});

const StaffActivityPage = () => {
  const [isPending, startTransition] = useTransition();
  const [studentId, setStudentId] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCreateSection, setShowCreateSection] = useState<boolean>(false);

  const {
    isLoading: isCategoryLoading,
    isFetching: isCategoryFetching,
    data: activityCategoriesData,
    refetch: refetchActivityCatrgories,
  } = getApiService().activityCategory.getAllActivityCategory.useQuery({
    queryKey: QUERY_KEYS.activityCategory.getAllActivityCategory,
  });

  const {
    isLoading: isActivityLoading,
    isFetching: isActivityFetching,
    data: activityData,
    refetch: refetchActivities,
  } = getApiService().activity.getAllActivityByStudent.useQuery({
    queryData: {
      params: {
        studentId: studentId,
      },
    },
    queryKey: [...QUERY_KEYS.activity.getAllActivityByStudent, studentId],
    enabled: !!studentId,
  });

  const [volunteerCount, activityCount, prohibitedCount] = useMemo(() => {
    const studentActivities = activityData?.body.result;

    if (!studentActivities) return [0, 0, 0];

    let volunteerCount = 0;
    let activityCount = 0;
    let prohibitedCount = 0;

    for (const studentActivity of studentActivities) {
      for (const category of studentActivity.categories) {
        if (category.name === "VOLUNTEER" && studentActivity.earnedVolunteerHours) {
          volunteerCount += studentActivity.earnedVolunteerHours;
        }
        if (category.name === "ACTIVITY") activityCount++;
        if (category.name === "PROHIBITED") prohibitedCount++;
      }
    }
    return [volunteerCount, activityCount, prohibitedCount];
  }, [activityData]);

  const { mutateAsync } = useMutation({
    mutationFn: getApiService().activity.createStudentActivity.mutate,
  });

  const form = useForm<z.infer<typeof createActivityFormSchema>>({
    resolver: zodResolver(createActivityFormSchema),
    values: {
      name: "",
      note: "",
      location: "",
      earnedVolunteerHours: "",
    },
  });

  const categoriesOptions = useMemo(() => {
    if (!activityCategoriesData?.body.result) return [];
    return activityCategoriesData.body.result.map((category) => ({
      label: category.name,
      value: category.id + "",
    }));
  }, [activityCategoriesData]);

  const studentActivities = useMemo(() => {
    if (!activityData?.body.result) return [];
    return activityData.body.result;
  }, [activityData]);

  const onSubmit = useCallback(
    (values: z.infer<typeof createActivityFormSchema>) => {
      const _earnedVolunteerHours = parseInt(values.earnedVolunteerHours);

      console.log(values);
      console.log(selectedCategories);

      startTransition(async () => {
        mutateAsync({
          body: {
            name: values.name,
            note: values.note,
            location: values.location,
            earnedVolunteerHours: _earnedVolunteerHours,
            studentId: studentId,
            categories: selectedCategories,
          },
          params: {
            studentId: studentId,
          },
        })
          .then((res) => {
            console.log(res);
            refetchActivityCatrgories();
            refetchActivities();
          })
          .catch((err) => console.log(err));
      });
    },
    [form, refetchActivityCatrgories, selectedCategories, studentId]
  );

  const handleSelectionChange = (selected: string[]) => {
    console.log(selected);
    setSelectedCategories(selected);
  };

  const handleLoadStudentData = useCallback(async () => {
    getApiService()
      .activity.getAllActivityByStudent.query({
        params: {
          studentId: studentId,
        },
      })
      .then((res) => {
        // @ts-expect-error - Fix this
        console.log(res.body.result);
        // @ts-expect-error - Fix this
        setStudentActivites(res.body.result);
      })
      .catch((err) => console.log(err));
  }, [studentId]);

  if (isCategoryLoading || isCategoryFetching) return <LoadingSpinner loading />;

  return (
    <div className="p-10">
      <div className="flex flex-row items-center justify-between">
        <p className="text-2xl font-bold">ดูและบันทึกกิจกรรม</p>

        <div className="flex flex-row gap-6">
          <Input
            placeholder="รหัสนักศึกษา"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className=" w-60"
          />

          <Button onClick={handleLoadStudentData}>แสดงข้อมูล</Button>
        </div>
      </div>

      {studentActivities && (
        <>
          <div className="flex flex-row items-center w-full justify-between gap-6 mt-12">
            <Card className="flex-1">
              <CardHeader>
                <p className="font-bold text-xl">ชั่วโมงจิตอาสา</p>
              </CardHeader>
              <CardContent className="flex flex-row items-center gap-6 justify-between">
                <Image
                  src="/assets/activity/empathy.png"
                  width={1920}
                  height={1080}
                  className="h-14 w-14"
                  alt="icon"
                />
                <p className="font-semibold text-lg">
                  ชั่วโมงจิตอาสาที่ได้รับ: {volunteerCount} ชั่วโมง
                </p>
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardHeader>
                <p className="font-bold text-xl">กิจกรรม</p>
              </CardHeader>
              <CardContent className="flex flex-row items-center gap-6 justify-between">
                <Image
                  src="/assets/activity/physical.png"
                  width={1920}
                  height={1080}
                  className="h-14 w-14"
                  alt="icon"
                />
                <p className="font-semibold text-lg">
                  กิจกรรมที่เคยเข้าร่วม: {activityCount} กิจกรรม
                </p>
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardHeader>
                <p className="font-bold text-xl">การประพฤติมิชอบ</p>
              </CardHeader>
              <CardContent className="flex flex-row items-center gap-6 justify-between">
                <Image
                  src="/assets/activity/prohibited.png"
                  width={1920}
                  height={1080}
                  className="h-14 w-14"
                  alt="icon"
                />
                <p className="font-semibold text-lg">การประพฤติมิชอบ: {prohibitedCount} ครั้ง</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">ดูและบันทึกกิจกรรม</p>

              <div className="flex flex-row gap-6">
                <Select>
                  <SelectTrigger className="rounded-xl p-4 w-96">
                    <SelectValue placeholder="เลือกดูตามประเภทกิจกรรม" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">ทั้งหมด</SelectItem>
                    <SelectItem value="2">กิจกรรม</SelectItem>
                    <SelectItem value="3">จิตอาสา</SelectItem>
                  </SelectContent>
                </Select>

                <Button onClick={() => setShowCreateSection(true)}>บันทึกกิจกรรมใหม่</Button>
              </div>
            </div>

            {showCreateSection && (
              <div className="p-4 shadow rounded-2xl mt-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>ชื่อกิจกรรม</FormLabel>
                          <FormControl>
                            <Input placeholder="เข้าหอพัก" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>รายละเอียด</FormLabel>
                          <FormControl>
                            <Input placeholder="รายละเอียด" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>สถานที่</FormLabel>
                          <FormControl>
                            <Input placeholder="หอพักนักศึกษา" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="earnedVolunteerHours"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>ชั่วโมงจิตอาสาที่ได้รับ</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <p className="font-semibold">ประเภทของกิจกรรม</p>
                    <MultiSelect
                      options={categoriesOptions}
                      selectedValues={selectedCategories}
                      onChange={handleSelectionChange}
                    />

                    <div className="flex flex-row items-center gap-4 mt-8 justify-end">
                      <Button
                        className="rounded-xl bg-gray-400"
                        onClick={() => {
                          form.reset();
                          setShowCreateSection(false);
                        }}
                      >
                        ยกเลิก
                      </Button>
                      <Button type="submit" className="rounded-xl" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        บันทึก
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}

            <div className="mt-12">
              <DataTable columns={studentActivityColumns} data={studentActivities} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StaffActivityPage;
