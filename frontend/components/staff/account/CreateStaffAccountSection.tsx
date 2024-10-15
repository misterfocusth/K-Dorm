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

const createStaffFormSchema = z.object({
  email: z.string().email({
    message: "กรุณากรอกอีเมลให้ถูกต้อง",
  }),
  type: z.enum(["STAFF", "MAINTENANCE_STAFF", "SECURITY_STAFF"], {
    message: "กรุณาเลือกประเภทของพนักงาน",
  }),
  firstName: z.string().min(1, {
    message: "กรุณากรอกชื่อจริง",
  }),
  lastName: z.string().min(1, {
    message: "กรุณากรอกนามสกุล",
  }),
});

type CreateStaffAccountSectionProps = {
  refetch: () => void;
};

const CreateStaffAccountSection = ({ refetch }: CreateStaffAccountSectionProps) => {
  const [isPending, startTransition] = useTransition();

  const { isShowCreateStaffAccountSection, hideCreateStaffAccountSection } =
    useManageStaffAccountContext();

  const form = useForm<z.infer<typeof createStaffFormSchema>>({
    resolver: zodResolver(createStaffFormSchema),
    defaultValues: {
      email: "",
      type: "STAFF",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof createStaffFormSchema>) => {
      startTransition(async () => {
        const result = await getApiService().account.createStaffAccount.mutate({
          body: values,
        });

        if (result.body) {
          hideCreateStaffAccountSection();
          form.reset();
          refetch();
        }
      });
    },
    [form, startTransition, refetch, hideCreateStaffAccountSection]
  );

  const handleCancelCreateAccount = useCallback(() => {
    hideCreateStaffAccountSection();
    form.reset();
  }, [hideCreateStaffAccountSection, form]);

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
            <Button className="rounded-xl bg-gray-400" onClick={handleCancelCreateAccount}>
              ยกเลิก
            </Button>
            <Button type="submit" className="rounded-xl" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              เพิ่มพนักงาน
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateStaffAccountSection;
