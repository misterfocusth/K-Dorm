import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form"
import { DialogContent, DialogTitle } from "@/components/ui/dialog"
import { CreateStudentPayload, createStudentSchema, useCreateStudent } from "./useCreateStudent"
import { useEditStudent } from "./useEditStudent"
import { z } from "zod"

interface Props {
    initial?: {
        email: string;
        firstName: string;
        lastName: string;
        studentId: string;
    }
    student_pk?: string
}

export const MutateStudentModal = ({ initial, student_pk }: Props) => {

    const { create } = useCreateStudent()
    const { edit } = useEditStudent()

    const handleSubmit = (value: {
        email: string;
        firstName: string;
        lastName: string;
        studentId: string;
    }) => {
        if (student_pk && initial) {
            edit(student_pk, initial)
        } else {
            create(value)
        }
    }

    return (
        <DialogContent>
            <DialogTitle>
                ข้อมูลนักศึกษา
            </DialogTitle>
            <AutoForm
                formSchema={z.object({
                    email: z.string().email(),
                    firstName: z.string(),
                    lastName: z.string(),
                    studentId: z.string()
                })}
                onSubmit={handleSubmit} values={initial} >
                <AutoFormSubmit>
                    ยืนยัน
                </AutoFormSubmit>
            </AutoForm>
        </DialogContent>
    )
}