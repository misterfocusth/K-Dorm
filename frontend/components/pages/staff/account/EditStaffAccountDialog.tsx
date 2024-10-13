import { useManageStaffAccountContext } from "@/contexts/ManageStaffAccountContext";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback } from "react";
import { Switch } from "@/components/ui/switch";

const editStaffAccountFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "กรุณากรอกชื่อจริง",
  }),
  lastName: z.string().min(1, {
    message: "กรุณากรอกนามสกุล",
  }),
  email: z.string().email({
    message: "กรุณากรอกอีเมลให้ถูกต้อง",
  }),
  type: z.enum(["STAFF", "MAINTENANCE_STAFF", "SECURITY_STAFF"], {
    message: "กรุณาเลือกประเภทของพนักงาน",
  }),
  isDisabled: z.boolean().default(false),
});

const EditStaffAccountDialog = () => {
  const { selectedStaffAccount, isShowEditStaffAccountDialog, hideEditStaffAccountDialog } =
    useManageStaffAccountContext();

  const form = useForm<z.infer<typeof editStaffAccountFormSchema>>({
    resolver: zodResolver(editStaffAccountFormSchema),
    values: {
      firstName: selectedStaffAccount?.firstName ?? "",
      lastName: selectedStaffAccount?.lastName ?? "",
      email: selectedStaffAccount?.email ?? "",
      type: !selectedStaffAccount
        ? "STAFF"
        : selectedStaffAccount.staff
        ? "STAFF"
        : selectedStaffAccount.maintenanceStaff
        ? "MAINTENANCE_STAFF"
        : "SECURITY_STAFF",
      isDisabled: !selectedStaffAccount?.isDisabled,
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof editStaffAccountFormSchema>) => {
    console.log(values);
  }, []);

  if (!isShowEditStaffAccountDialog) return null;

  return (
    <Dialog
      open={isShowEditStaffAccountDialog}
      onOpenChange={() => {
        form.reset();
        hideEditStaffAccountDialog();
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>แก้ไขข้อมูลพนักงาน</DialogTitle>
          <DialogDescription>คุณสามารถแก้ไขข้อมูลพนักงานได้ในหน้านี้</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

              <FormField
                control={form.control}
                name="isDisabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-2">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">สถานะของบัญชี</FormLabel>
                      <FormDescription>เปิด / ปิด การใช้งานบัญชี</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex flex-row items-center gap-4 mt-8 justify-end">
                <Button
                  className="rounded-xl bg-gray-400"
                  onClick={() => {
                    form.reset();
                    hideEditStaffAccountDialog();
                  }}
                >
                  ยกเลิก
                </Button>
                <Button type="submit" className="rounded-xl">
                  บันทึก
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditStaffAccountDialog;
