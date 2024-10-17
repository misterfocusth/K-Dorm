'use client'

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import { useStudents } from "./useStudents"
import { Button } from "@/components/ui/button"
import { useCreateStudent } from "./useCreateStudent"
import { useRenderModal } from "@/providers/ModalProvider"
import { MutateStudentModal } from "./MutateStudentModal"
import { StaffContainer } from "@/components/pages/staff/container"
import { DeleteIcon, EditIcon } from "lucide-react"
import { GetStudentInfoResponse } from "@/contracts/student"
import { useDeleteStudnet } from "./useDeleteStudent"

const StudentPage = () => {

    const { data } = useStudents()
    const { open } = useRenderModal(<MutateStudentModal />)

    return (
        <StaffContainer>
            <h1 className="text-3xl font-medium">จัดการนักศึกษา</h1>
            <div className="flex w-full justify-end">
                <Button onClick={open}>
                    เพิ่มนักศึกษา
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableCell>
                        รหัสนักศึกษา
                    </TableCell>
                    <TableCell>
                        ชื่อ-สกุล
                    </TableCell>
                    <TableCell></TableCell>
                </TableHeader>
                <TableBody>
                    {data?.map(account => (
                        <Row key={account.student.studentId} {...account} student_id={account.id} />
                    ))
                    }
                </TableBody>
            </Table>
        </StaffContainer>
    )
}

export default StudentPage

const Row = ({ ...account }: {
    student_id: string
} & GetStudentInfoResponse) => {

    const { open } = useRenderModal(<MutateStudentModal initial={{ email: account.email, firstName: account.firstName, lastName: account.lastName, studentId: account.student.studentId }} student_pk={account.student_id} />)
    const { deleteStudent } = useDeleteStudnet()

    return (
        <TableRow key={account.student.studentId}>
            <TableCell>
                {account.student.studentId}
            </TableCell>
            <TableCell>
                {account.firstName} {account.lastName}
            </TableCell>
            <TableCell className="flex justify-end gap-x-2">
                <EditIcon className="cursor-pointer" onClick={open} />
                <DeleteIcon className="cursor-pointer" onClick={() => deleteStudent(account.id)} />
            </TableCell>
        </TableRow>
    )
}