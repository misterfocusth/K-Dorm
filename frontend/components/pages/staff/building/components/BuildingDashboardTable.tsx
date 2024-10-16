import { match } from 'ts-pattern'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableLoading, TableEmpty } from "@/components/ui/table"
import React, { ReactNode } from "react"

interface Props {
    buildings: {
        id: number
        name: string
        roomCount: number
    }[] | undefined
}

export const BuildingDashboardTable: React.FC<Props> = ({ buildings }) => {

    console.log('buildings :>> ', buildings);

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
                                    {buildings?.map(
                                        building => (
                                            <TableBody className='h-full'>
                                                <TableRow key={building.id}>
                                                    <TableCell className="font-medium">{building.name}</TableCell>
                                                    <TableCell>{building.roomCount}</TableCell>
                                                    <TableCell className='w-[280px]'></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        )
                                    )}
                                </Table >
                            </>
                        )
                    })
            }
        </>
    )
}