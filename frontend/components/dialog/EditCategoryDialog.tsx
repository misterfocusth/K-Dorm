import { useManageStaffAccountContext } from "@/providers/ManageStaffAccountProvider";

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
import { useCallback, useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { getApiService } from "@/libs/tsr-react-query";
import { useStaffAccountMutation } from "@/hooks/mutation/useStaffAccountMutation";
import { Loader2 } from "lucide-react";
import { useActivityCategoryContext } from "@/providers/ActivityCategoryProvider";

const editCategoryFormSchema = z.object({
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

type EditCategoryDialogProps = {
  refetch: () => void;
};

const EditCategoryDialog = ({ refetch }: EditCategoryDialogProps) => {
  const [isPending, startTransition] = useTransition();
  const { mutateAsync } = useStaffAccountMutation();

  const { selectedCategory, isShowEditCategoryModal, hideEditCategoryModal } =
    useActivityCategoryContext();

  const form = useForm<z.infer<typeof editCategoryFormSchema>>({
    resolver: zodResolver(editCategoryFormSchema),
    values: {
      handle: selectedCategory?.handle ?? "",
      name: selectedCategory?.name ?? "",
      visibleToStudents: selectedCategory?.visibleToStudents ?? false,
      visibleToStaffs: selectedCategory?.visibleToStaffs ?? false,
      visibleToSecurityStaffs: selectedCategory?.visibleToSecurityStaffs ?? false,
    },
  });

  const onSubmit = useCallback(async (values: z.infer<typeof editCategoryFormSchema>) => {
    console.log(values);
  }, []);

  //   if (!isShowEditCategoryModal || !selectedCategory) return null;

  return (
    <Dialog
      open={isShowEditCategoryModal}
      onOpenChange={() => {
        form.reset();
        hideEditCategoryModal();
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
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
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
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
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
                    hideEditCategoryModal();
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
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
