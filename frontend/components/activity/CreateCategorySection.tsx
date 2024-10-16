import { useManageStaffAccountContext } from "@/providers/ManageStaffAccountProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCallback, useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getApiService } from "@/libs/tsr-react-query";
import { Loader2 } from "lucide-react";
import { useActivityCategoryContext } from "@/providers/ActivityCategoryProvider";
import { Switch } from "../ui/switch";

const createCategoryFormSchema = z.object({
  handle: z.string().min(1, {
    message: "กรุณากรอกไอดีของประเภทกิจกรรม",
  }),
  name: z.string().min(1, {
    message: "กรุณากรอกชื่อของประเภทกิจกรรม",
  }),
  visibleToStudents: z.boolean().default(false),
  visibleToStaffs: z.boolean().default(false),
  visibleToSecurityStaffs: z.boolean().default(false),
});

type CreateCategorySectionProps = {
  refetch: () => void;
};

const CreateCategorySection = ({ refetch }: CreateCategorySectionProps) => {
  const [isPending, startTransition] = useTransition();

  const { showCreateCategorySection, isShowCreateCategorySection, hideCreateCategorySection } =
    useActivityCategoryContext();

  const form = useForm<z.infer<typeof createCategoryFormSchema>>({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      handle: "",
      name: "",
      visibleToStudents: false,
      visibleToStaffs: false,
      visibleToSecurityStaffs: false,
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof createCategoryFormSchema>) => {
    console.log(values);
  }, []);

  if (!isShowCreateCategorySection) {
    return null;
  }

  return (
    <div className="p-4 rounded-lg border shadow">
      <p className="text-lg font-bold">เพิ่มประเภทกิจกรรมใหม่</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="handle"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>ไอดีของประเภทกิจกรรม</FormLabel>
                <FormControl>
                  <Input placeholder="ENTER_CHECKIN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="visibleToStudents"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-2">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">แสดงสำหรับนักศึกษา</FormLabel>
                  <FormDescription>เปิดการใช้งานหมวดหมู่นี้สำหรับนักศึกษา</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} aria-readonly />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visibleToStaffs"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-2">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">แสดงสำหรับพนักงาน</FormLabel>
                  <FormDescription>เปิดการใช้งานหมวดหมู่นี้สำหรับพนักงาน</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} aria-readonly />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visibleToSecurityStaffs"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-2">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">แสดงสำหรับพนักงานรักษาความปลอดภัย</FormLabel>
                  <FormDescription>
                    เปิดการใช้งานหมวดหมู่นี้สำหรับพนักงานรักษาความปลอดภัย
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} aria-readonly />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-row items-center gap-4 mt-8 justify-end">
            <Button
              className="rounded-xl bg-gray-400"
              onClick={() => {
                form.reset();
                hideCreateCategorySection();
              }}
            >
              ยกเลิก
            </Button>
            <Button type="submit" className="rounded-xl" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              เพิ่มประเภทใหม่
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCategorySection;
