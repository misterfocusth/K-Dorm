import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form"
import { DialogContent } from "@/components/ui/dialog"
import { buildingContract } from "@/contracts/building"
import React from "react"
import { z } from "zod"
import { useCreateBuildingMutate } from "../hooks/useCreateBuilding"
import { useRenderModal } from "@/providers/ModalProvider"
import { queryClient } from "@/config/queryClient"
import { toast } from "sonner"
import { useEditBuilding } from "../hooks/useEditBuilding"
import { Button } from "@/components/ui/button"

const formSchema = buildingContract.create.body
type FormSchema = z.infer<typeof formSchema>

interface Props extends Partial<FormSchema> {
    building_id?: string
}


export const MutateBuildingModal: React.FC<Props> = ({ ...props }) => {

    const { close } = useRenderModal()
    const { create, isPending: isCreatePending } = useCreateBuildingMutate()
    const { edit, isPending: isEditPending } = useEditBuilding()


    const handleSubmit = async (data: FormSchema) => {

        if (props.building_id) {
            const response = await edit(props.building_id, data.name)
            if (response) {
                toast.success("แก้ไขตึกสำเร็จ");
                close()
            } else {
                toast.error("เกิดข้อผิดพลาดในการแก้ไข");
            }
            return
        }

        const response = await create(data.name)
        if (response) {
            toast.success("สร้างตึกสำเร็จ");
            close()
        } else {
            toast.error("เกิดข้อผิดพลาดในการสร้างตึก");
        }
    }

    return (
        <DialogContent>
            <h1 className="text-2xl">
                เมนู{props.name ? "แก้ไข" : "สร้าง"}ตึก
            </h1>
            <AutoForm
                formSchema={
                    buildingContract.create.body
                }
                values={
                    props
                }
                onSubmit={
                    handleSubmit
                }

            >
                <div className="flex w-full">
                    <Button variant='destructive'>
                        ลบ
                    </Button>
                    <AutoFormSubmit disabled={isCreatePending} className="ml-auto">
                        {
                            isCreatePending ? "กำลังสร้าง..." : props.name ? "แก้ไข" : "สร้าง"
                        }
                    </AutoFormSubmit>
                </div>
            </AutoForm>
        </DialogContent>
    )
}