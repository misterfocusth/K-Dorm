'use client'

import { match } from "ts-pattern"
import { useRecruitmentWaves } from "../hooks/useRecruitmentWaves"
import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableLoading, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useRenderModal } from "@/providers/ModalProvider"
import { MutateRecruitmentYearModal } from "../components/MutateRecruitmentYearModal"
import { DeleteIcon, EditIcon } from "lucide-react"
import { useDeleteRecruitmentWave } from "../hooks/useDeleteRecruitmentWave"

export const RecruitmentWaveDashboard = () => {

    const { data, isPending } = useRecruitmentWaves()
    const { open } = useRenderModal(<MutateRecruitmentYearModal />)

    return <div className="flex flex-col gap-y-4">
        <div className="flex w-full">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-3xl font-medium">
                    จัดการรอบรับสมัคร
                </h1>
                <span>
                    จัดการรอบรับสมัครสำหรับนักศึกษาทุกคน
                </span>
            </div>
            <Button onClick={open} variant='default' className="ml-auto">
                เพิ่มรอบสมัครใหม่
            </Button>
        </div>
        <div className="w-full flex flex-grow">
            {
                match({
                    isPending,
                    isEmpty: data?.length === 0
                })
                    .with({ isPending: true }, () => (
                        <TableLoading />
                    ))
                    .with({ isEmpty: true }, () => (
                        <TableEmpty />
                    ))
                    .otherwise(() => (
                        <Table>
                            <TableHeader>
                                <TableHead>
                                    ชื่อรอบการสมัคร
                                </TableHead>
                                <TableHead>
                                    ปีของรอบนั้น
                                </TableHead>
                                <TableHead>
                                    ข้อความประกาศ
                                </TableHead>
                                <TableHead className="min-w-[275px]">
                                </TableHead>
                            </TableHeader>
                            <TableBody>
                                {
                                    data?.map(
                                        row => (
                                            <Row {...row} />
                                        )
                                    )
                                }
                            </TableBody>
                        </Table>
                    ))
            }
        </div>
    </div>

}

export const Row = ({ ...wave }: {
    id: string;
    name: string;
    year: number;
    announcementText?: string | undefined;
}) => {

    const { open } = useRenderModal(<MutateRecruitmentYearModal wave_id={wave.id} inital={{ ...wave }} />)
    const { deleteWave } = useDeleteRecruitmentWave()

    return (
        <TableRow>
            <TableCell>
                {wave.name}
            </TableCell>
            <TableCell>
                {wave.year}
            </TableCell>
            <TableCell>
                {wave.announcementText}
            </TableCell>
            <TableCell className="flex gap-x-4 justify-end items-center">
                <EditIcon className="cursor-pointer" onClick={open} />
                <DeleteIcon className="cursor-pointer" onClick={() => deleteWave(wave.id)} />
            </TableCell>
        </TableRow>
    )
}