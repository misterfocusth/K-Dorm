"use client";

import { NavbarContext } from "@/contexts/NavbarContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { ImageIcon, Trash2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Route Guard HOC
import withRoleGuard from "@/components/hoc/withRoleGuard";
import Image from "next/image";
import { useCreateMaintenanceMutation } from "@/hooks/useCreateMaintenanceMutation";

const newMaintainanceTiketFormSchema = z.object({
  title: z.string().min(1, {
    message: "กรุณากรอกหัวข้อการแจ้งซ่อม",
  }),
  description: z.string().min(1, {
    message: "กรุณากรอกสถานที่",
  }),
  location: z.string(),
});

const NewMaintenanceTicketPage = () => {
  const router = useRouter();
  const mutation = useCreateMaintenanceMutation();

  const { setShowBottomNavbar, setShowHeaderNavbar, setHeaderNavbarTitle } =
    useContext(NavbarContext);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenImageSeletor = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleImageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedImages(filesArray);
    }
  }, []);

  const form = useForm<z.infer<typeof newMaintainanceTiketFormSchema>>({
    resolver: zodResolver(newMaintainanceTiketFormSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof newMaintainanceTiketFormSchema>) => {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("location", values.location);

      selectedImages.forEach((image) => {
        formData.append("files", image);
      });

      formData.forEach((value, key) => {
        console.log(key, value);
      });

      mutation
        .mutateAsync(formData)
        .then(() => {
          router.push("/student/maintenance");
        })
        .catch((err) => console.error(err));
    },
    [selectedImages, mutation, router]
  );

  const handleDeleteImage = useCallback((imageName: string) => {
    setSelectedImages((prev) => prev.filter((image) => image.name !== imageName));
  }, []);

  useEffect(() => {
    setShowBottomNavbar(false);
    setShowHeaderNavbar(true);
    setHeaderNavbarTitle("รายการแจ้งซ่อมใหม่");
  });

  return (
    <div className="p-6">
      {selectedImages.length > 0 ? (
        <div className="flex flex-row items-center justify-center overflow-y-auto">
          <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              {selectedImages.map((image, index) => (
                <div className="relative" key={index}>
                  <Image
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt="selected image"
                    className="w-full h-40 object-cover rounded-xl"
                    width={1920}
                    height={1080}
                  />

                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-4 right-4 rounded-full"
                    onClick={() => handleDeleteImage(image.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      ) : (
        <div
          className="p-12 flex flex-col gap-4 border-dashed  rounded-xl justify-center border-2 items-center"
          onClick={handleOpenImageSeletor}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            ref={fileInputRef}
            className=" hidden"
          />
          <ImageIcon className="w-9 h-9" />
          <p className="text-sm">คลิกเพื่อเลือกรูป</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>หัวข้อแจ้งซ่อม</FormLabel>
                <FormControl>
                  <Input placeholder="ระบุหัวข้อการแจ้งซ่อม" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>สถานที่ (ไม่บังคับ)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="สถานที่ ๆ ต้องการแจ้งซ่อม (เว้นว่างหากเป็นภายในห้อง)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>รายละเอียด</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="สถานที่ ๆ ต้องการแจ้งซ่อม (เว้นว่างหากเป็นภายในห้อง)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full rounded-xl">
            แจ้งซ่อม
          </Button>
        </form>

        <Button variant="link" className="w-full text-black mt-4" onClick={() => router.back()}>
          ยกเลิก
        </Button>
      </Form>
    </div>
  );
};

export default withRoleGuard(NewMaintenanceTicketPage, ["STUDENT"]);
