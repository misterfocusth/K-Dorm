"use client";

// Route Guard HOC
import withRoleGuard from "@/components/hoc/withRoleGuard";

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

// Contexts
import { AuthContext } from "@/contexts/AuthContext";

// Types
import { STAFF_ROLES } from "@/types";

// Zod
import { zodResolver } from "@hookform/resolvers/zod";

import { Separator } from "@radix-ui/react-select";
import { Loader2 } from "lucide-react";
import { useCallback, useContext, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const staffLoginFormSchema = z.object({
  email: z.string().email({
    message: "กรุณากรอกอีเมลให้ถูกต้อง",
  }),
  password: z.string().min(1, {
    message: "กรุณากรอกรหัสผ่าน",
  }),
});

const StaffLoginPage = () => {
  const [isPending, startTransition] = useTransition();
  const { loginWithEmailAndPassword, loginWithGoogle } = useContext(AuthContext);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof staffLoginFormSchema>>({
    resolver: zodResolver(staffLoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof staffLoginFormSchema>) => {
      startTransition(async () => {
        loginWithEmailAndPassword(values.email, values.password)
          .then(() => {
            toast({
              title: "เข้าสู่ระบบสำเร็จ",
              description: "เข้าสู่ระบบด้วย Staff Account สำเร็จ",
            });
          })
          .catch((error) => {
            toast({
              variant: "destructive",
              title: "เข้าสู่ระบบไม่สำเร็จ",
              description: error.message,
            });
          });
      });
    },
    [loginWithEmailAndPassword, toast]
  );

  const handleSignInWithGoogle = useCallback(() => {
    startTransition(() => {
      loginWithGoogle()
        .then(() => {
          toast({
            title: "เข้าสู่ระบบสำเร็จ",
            description: "เข้าสู่ระบบด้วย Google Account สำเร็จ",
          });
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "เข้าสู่ระบบไม่สำเร็จ",
            description: error.message,
          });
        });
    });
  }, [loginWithGoogle, toast]);

  return (
    <div className="grid grid-cols-2 h-full w-full p-6 shadow-lg">
      <div className="bg-[url('/assets/kmitl-bg.webp')] bg-cover bg-center p-12 text-black flex flex-col gap-2 rounded-l-2xl">
        <p className="text-2xl font-semibold">K-Dorm | Management Console</p>
        <p className="text-lg">
          แอปพลิเคชั่นจัดการหอพักสำหรับนักศึกษา สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
        </p>
      </div>
      <div className="p-12 h-full flex flex-col justify-center items-center rounded-r-2xl border-t-2 border-r-2 border-b-2 px-[20%]">
        <div className="flex flex-col gap-2 text-center">
          <p className="text-2xl font-bold">เข้าสู่ระบบ</p>
          <p className=" text-gray-400">เข้าใช้งานด้วยอีเมลและรหัสผ่าน (สำหรับพนักงาน)</p>
        </div>

        {/* FORM */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8 w-full ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>อีเมล (Email)</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@kmitl.ac.th" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รหัสผ่าน (Password)</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full rounded-xl" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              เข้าสู่ระบบ
            </Button>
          </form>
        </Form>

        <div className="flex items-center my-6">
          <Separator className="flex-grow" />
          <span className="mx-4 text-gray-500">หรือดำเนินการต่อด้วย</span>
          <Separator className="flex-grow" />
        </div>

        <Button
          className="w-full font-bold rounded-xl bg-white text-black border"
          onClick={handleSignInWithGoogle}
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          เข้าสู่ระบบโดยใช้ Google Account
        </Button>
      </div>
    </div>
  );
};

export default withRoleGuard(StaffLoginPage, [...STAFF_ROLES], true);
