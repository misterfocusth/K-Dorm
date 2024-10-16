import { match } from 'ts-pattern'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableLoading, TableEmpty } from "@/components/ui/table"
import React, { ReactNode } from "react"
import { DeleteIcon, EditIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRenderModal } from '@/providers/ModalProvider'
import { MutateBuildingModal } from './MutateBuildingModal'
import Link from 'next/link'

interface Building {
    id: number
    name: string
    roomCount: number
}
interface Props {
    buildings: Building[] | undefined
}

export const BuildingDashboardTable: React.FC<Props> = ({ buildings }) => {

    return (
        <>
            {
                match({
                    isEmpty: buildings?.length === 0, isPending: buildings === undefined
                })
                    .returnType<ReactNode>()
                    .with({
                        isEmpty: true
                    }, () => {
                        return <TableEmpty />
                    })
                    .with({
                        isPending: true
                    }, () => {
                        return <TableLoading />
                    })
                    .otherwise(() => {
                        return (
                            <>
                                <Table>
                                    <TableCaption>ตึกทั้งหมดที่อยู่ในระบบ</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="font-medium">ชื่อตึก</TableHead>
                                            <TableHead>จำนวนห้อง</TableHead>
                                            <TableHead className='w-[280px]'></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className='h-full'>
                                        {buildings?.map(
                                            building => (
                                                <Row key={building.id} {...building} />
                                            )
                                        )}
                                    </TableBody>
                                </Table >
                            </>
                        )
                    })
            }
        </>
    )
}

interface RowProps extends Building {

}

const Row: React.FC<RowProps> = ({ id, name, roomCount }) => {

    const { open } = useRenderModal(<MutateBuildingModal building_id={`${id}`} name={name} />)

    return (
        <TableRow>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>{roomCount}</TableCell>
            <TableCell className='w-[280px] justify-end items-center flex gap-x-4'>
                <EditIcon className='cursor-pointer' onClick={open} />
                <DeleteIcon />
                <Link href={`/staff/building/${id}`}>
                    <Button>
                        จัดห้องพักในตึก
                    </Button>
                </Link>
            </TableCell>
        </TableRow>
    )
}