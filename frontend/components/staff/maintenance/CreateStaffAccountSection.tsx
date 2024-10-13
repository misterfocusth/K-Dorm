import { useManageStaffAccountContext } from "@/contexts/ManageStaffAccountContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCallback } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const createStaffFormSchema = z.object({
  email: z.string().email({
    message: "กรุณากรอกอีเมลให้ถูกต้อง",
  }),
  type: z.string().min(1, {
    message: "กรุณาเลือกประเภทบัญชี",
  }),
  firstName: z.string().min(1, {
    message: "กรุณากรอกชื่อจริง",
  }),
  lastName: z.string().min(1, {
    message: "กรุณากรอกนามสกุล",
  }),
});
const CreateStaffAccountSection = () => {
  const { isShowCreateStaffAccountSection, hideCreateStaffAccountSection } =
    useManageStaffAccountContext();

  const form = useForm<z.infer<typeof createStaffFormSchema>>({
    resolver: zodResolver(createStaffFormSchema),
  });

  const onSubmit = useCallback((values: z.infer<typeof createStaffFormSchema>) => {
    console.log(values);
  }, []);

  if (!isShowCreateStaffAccountSection) {
    return null;
  }

  return (
    <div className="p-4 rounded-lg border shadow">
      <p className="text-lg font-bold">เพิ่มบัญชีพนักงานใหม่</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <div className="flex flex-row items-center gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>ชื่อจริง</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>นามสกุล</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row items-center gap-6 ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>อีเมล (Google Account)</FormLabel>
                  <FormControl>
                    <Input placeholder="staff_1@kmitl.ac.th" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>ประเภทของพนักงาน</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภทของพนักงาน" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="STAFF">เจ้าหน้าที่</SelectItem>
                      <SelectItem value="MAINTENANCE_STAFF">เจ้าหน้าที่ซ่อมบำรุง</SelectItem>
                      <SelectItem value="SECURITY_STAFF">เจ้าหน้าที่รักษาความปลอดภัย</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row items-center gap-4 justify-end">
            <Button className="rounded-xl bg-gray-400" onClick={hideCreateStaffAccountSection}>
              ยกเลิก
            </Button>
            <Button type="submit" className="rounded-xl">
              เพิ่มพนักงาน
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateStaffAccountSection;
