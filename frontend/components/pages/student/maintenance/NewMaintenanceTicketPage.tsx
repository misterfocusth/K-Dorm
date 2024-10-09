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

const newMaintainanceTiketFormSchema = z.object({
  title: z.string().min(1, {
    message: "กรุณากรอกหัวข้อการแจ้งซ่อม",
  }),
  note: z.string().min(1, {
    message: "กรุณากรอกสถานที่",
  }),
  location: z.string(),
});

const NewMaintenanceTicketPage = () => {
  const router = useRouter();

  const { setShowBottomNavbar, setShowHeaderNavbar, setHeaderNavbarTitle } =
    useContext(NavbarContext);

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenImageSeletor = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleImageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const imageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setSelectedImages(imageUrls);
    }
  }, []);

  const form = useForm<z.infer<typeof newMaintainanceTiketFormSchema>>({
    resolver: zodResolver(newMaintainanceTiketFormSchema),
    defaultValues: {
      title: "",
      note: "",
      location: "",
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof newMaintainanceTiketFormSchema>) => {
    console.log(values);
  }, []);

  const handleDeleteImage = useCallback((imageUrl: string) => {
    setSelectedImages((prev) => prev.filter((url) => url !== imageUrl));
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
              {selectedImages.map((imageUrl, index) => (
                <div className="relative">
                  <img
                    key={index}
                    src={imageUrl}
                    alt="selected image"
                    className="w-full h-48 object-cover rounded-xl"
                  />

                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-4 right-4 rounded-full"
                    onClick={() => handleDeleteImage(imageUrl)}
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
            name="note"
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

export default NewMaintenanceTicketPage;
