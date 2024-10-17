import React, { useMemo } from "react"
import { useCreateBuildingMutate } from "../../building/hooks/useCreateBuilding"
import { useCreateRecruitmentWave } from "../hooks/useCreateRecruitmentWave"
import { useEditBuilding } from "../../building/hooks/useEditBuilding"
import { useEditRecruitmentWave } from "../hooks/useEditRecruitmentWave"
import { z } from "zod"
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form"
import { DialogContent, DialogTitle } from "@/components/ui/dialog"

const formSchema = z.object({
    name: z.string(),
    year: z.number().int(),
    announcementText: z.string().optional().nullish()
})

type FormSchema = z.infer<typeof formSchema>

interface Props {
    wave_id?: string
    inital?: Partial<FormSchema>
}

export const MutateRecruitmentYearModal: React.FC<Props> = ({ wave_id: id, inital }) => {

    const { create, isPending: isCreatePending } = useCreateRecruitmentWave()
    const { edit, isPending: isEditPending } = useEditRecruitmentWave()
    const isPending = isCreatePending || isEditPending;


    return (
        <DialogContent>
            <DialogTitle>
                {
                    id ? " แก้ไขรอบการสมัคร" : "สร้างรอบการสมัคร"
                }
            </DialogTitle>
            <AutoForm formSchema={formSchema} values={{ ...inital }} onSubmit={
                id ? (value) => edit(id, value) : create
            } >
                <AutoFormSubmit disabled={isPending}>
                    ยืนยัน
                </AutoFormSubmit>
            </AutoForm>
        </DialogContent >
    )

}