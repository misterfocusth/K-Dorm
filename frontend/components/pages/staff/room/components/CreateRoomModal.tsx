import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import { z } from "zod";
import { fieldConfig } from '@autoform/react'
import { useCreateRooms } from "../hooks/useCreateRooms";
import { toast } from "sonner";
import { useRenderModal } from "@/providers/ModalProvider";

const formSchema = z.object({
    rooms: z.array(z.object({
        name: z.string().superRefine(
            fieldConfig({
                label: 'ชื่อห้อง/เลขห้อง',
            })
        ),
        floor: z.string().superRefine(
            fieldConfig({
                label: 'ชั้น',
            })
        ).superRefine(
            fieldConfig({
                label: 'ห้อง',
            })
        ),
    }))
})

interface Props {
    building_id: string
}

export const CreateRoomsModal: React.FC<Props> = ({ building_id }) => {

    const { close } = useRenderModal()
    const { createMany, isPending } = useCreateRooms()

    return (
        <DialogContent className="max-h-screen overflow-y-scroll">
            <DialogTitle className="text-2xl font-medium">
                เพิ่มห้องใหม่
            </DialogTitle>
            <AutoForm
                formSchema={formSchema}
                onSubmit={async (data) => {
                    const rooms = data.rooms.map((room) => ({
                        name: room.name,
                        floor: room.floor,
                        building_id: building_id
                    }))
                    const result = await createMany(rooms)
                    if (result) {
                        toast.success('เพิ่มห้องสำเร็จ')
                        close()
                    } else {
                        toast.error('เพิ่มห้องไม่สำเร็จ')
                    }
                }}
            >
                <AutoFormSubmit disabled={isPending}>ยืนยัน</AutoFormSubmit>
            </AutoForm>
        </DialogContent>
    )
}