import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form"
import { DialogContent, DialogTitle } from "@/components/ui/dialog"
import { z } from "zod"
import { useEditRoom } from "../hooks/useEditRoom"
import { toast } from "sonner"
import { useRenderModal } from "@/providers/ModalProvider"

const formSchema = z.object({
    name: z.string(),
    floor: z.string(),
})

export const MutateRoomModal = ({ building_id, ...room }: { room_id: string, name: string, floor: string, building_id: string }) => {

    const { close } = useRenderModal()
    const { edit, isPending } = useEditRoom(building_id)
    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        const result = await edit(room.room_id, data)
        if (result) {
            toast.success("แก้ไขห้องสำเร็จ")
            close()
        } else {
            toast.error("แก้ไขห้องไม่สำเร็จ")
            close()
        }
    }

    return (
        <DialogContent>
            <DialogTitle>
                แก้ไขห้อง
            </DialogTitle>
            <AutoForm formSchema={formSchema} onSubmit={handleSubmit} values={{ ...room, floor: `${room.floor}` }}>
                <AutoFormSubmit disabled={isPending}>
                    บันทึก
                </AutoFormSubmit>
            </AutoForm>
        </DialogContent >
    )
}