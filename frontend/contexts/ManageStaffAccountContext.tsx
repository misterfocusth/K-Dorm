import { Account } from "@/types";
import { createContext, ReactNode, useState } from "react";

interface IManageStaffAccountContext {
  isOpenCreateStaffAccountModal: boolean;
  openCreateStaffAccountModal: () => void;
  closeCreateStaffAccountModal: () => void;

  isOpenUpdateStaffAccountModal: boolean;
  openUpdateStaffAccountModal: () => void;
  closeUpdateStaffAccountModal: () => void;

  isOpenDeleteStaffAccountModal: boolean;
  openDeleteStaffAccountModal: () => void;
  closeDeleteStaffAccountModal: () => void;

  selectedStaffAccount: Account | null;
  setSelectedStaffAccount: React.Dispatch<React.SetStateAction<Account | null>>;
}

const initialState: IManageStaffAccountContext = {
  isOpenCreateStaffAccountModal: false,
  openCreateStaffAccountModal: () => {},
  closeCreateStaffAccountModal: () => {},

  isOpenUpdateStaffAccountModal: false,
  openUpdateStaffAccountModal: () => {},
  closeUpdateStaffAccountModal: () => {},

  isOpenDeleteStaffAccountModal: false,
  openDeleteStaffAccountModal: () => {},
  closeDeleteStaffAccountModal: () => {},

  selectedStaffAccount: null,
  setSelectedStaffAccount: () => {},
};

export const ManageStaffAccountContext = createContext<IManageStaffAccountContext>(initialState);

export const ManageStaffAccountContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenCreateStaffAccountModal, setIsOpenCreateStaffAccountModal] =
    useState<boolean>(false);
  const [isOpenUpdateStaffAccountModal, setIsOpenUpdateStaffAccountModal] =
    useState<boolean>(false);
  const [isOpenDeleteStaffAccountModal, setIsOpenDeleteStaffAccountModal] =
    useState<boolean>(false);
  const [selectedStaffAccount, setSelectedStaffAccount] = useState<Account | null>(null);

  const openCreateStaffAccountModal = () => setIsOpenCreateStaffAccountModal(true);
  const closeCreateStaffAccountModal = () => setIsOpenCreateStaffAccountModal(false);

  const openUpdateStaffAccountModal = () => setIsOpenUpdateStaffAccountModal(true);
  const closeUpdateStaffAccountModal = () => setIsOpenUpdateStaffAccountModal(false);

  const openDeleteStaffAccountModal = () => setIsOpenDeleteStaffAccountModal(true);
  const closeDeleteStaffAccountModal = () => setIsOpenDeleteStaffAccountModal(false);

  return (
    <ManageStaffAccountContext.Provider
      value={{
        isOpenCreateStaffAccountModal,
        openCreateStaffAccountModal,
        closeCreateStaffAccountModal,

        isOpenUpdateStaffAccountModal,
        openUpdateStaffAccountModal,
        closeUpdateStaffAccountModal,

        isOpenDeleteStaffAccountModal,
        openDeleteStaffAccountModal,
        closeDeleteStaffAccountModal,

        selectedStaffAccount,
        setSelectedStaffAccount,
      }}
    >
      {children}
    </ManageStaffAccountContext.Provider>
  );
};
