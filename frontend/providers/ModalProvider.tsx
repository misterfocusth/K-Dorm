import { Dialog } from "@/components/ui/dialog"
import React, { PropsWithChildren, ReactNode, useContext, useMemo } from "react"

interface ModalContextProps {
    open: (node: ReactNode) => void,
    close: () => void
    isOpened: boolean

}

const ModalContext = React.createContext<ModalContextProps>({
    open: () => { },
    close: () => { },
    isOpened: false
})

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const [content, setContent] = React.useState<ReactNode | null>(null)
    const isOpened = useMemo(() => !!content, [content])


    return (
        <ModalContext.Provider value={{
            open: setContent,
            close: () => setContent(null),
            isOpened
        }}>
            <Dialog open={isOpened} onOpenChange={
                (state) => {
                    if (!state) {
                        setContent(null)
                    } else {
                        setContent(true)
                    }
                }
            }>
                {content}
            </Dialog>
            {children}
        </ModalContext.Provider>
    )
}

export const useRenderModal = (element?: ReactNode) => {
    const { open, isOpened, close } = useContext(ModalContext)

    return {
        open: () => {
            if (!element) {
                throw new Error('Element is required for openning a modal')
            }
            open(element)
        },
        close,
        isOpened
    }
}