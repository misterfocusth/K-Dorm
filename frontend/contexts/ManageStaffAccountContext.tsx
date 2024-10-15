import { Account } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface IManageStaffAccountContext {
  isShowCreateStaffAccountSection: boolean;
  showCreateStaffAccountSection: () => void;
  hideCreateStaffAccountSection: () => void;

  isShowEditStaffAccountDialog: boolean;
  openEditStaffAccountDialog: () => void;
  hideEditStaffAccountDialog: () => void;

  isOpenDeleteStaffAccountModal: boolean;
  openDeleteStaffAccountModal: () => void;
  closeDeleteStaffAccountModal: () => void;

  selectedStaffAccount: Account | null;
  setSelectedStaffAccount: React.Dispatch<React.SetStateAction<Account | null>>;
}

const initialState: IManageStaffAccountContext = {
  isShowCreateStaffAccountSection: false,
  showCreateStaffAccountSection: () => {},
  hideCreateStaffAccountSection: () => {},

  isShowEditStaffAccountDialog: false,
  openEditStaffAccountDialog: () => {},
  hideEditStaffAccountDialog: () => {},

  isOpenDeleteStaffAccountModal: false,
  openDeleteStaffAccountModal: () => {},
  closeDeleteStaffAccountModal: () => {},

  selectedStaffAccount: null,
  setSelectedStaffAccount: () => {},
};

export const ManageStaffAccountContext = createContext<IManageStaffAccountContext>(initialState);

export const ManageStaffAccountContextProvider = ({ children }: { children: ReactNode }) => {
  const [isShowCreateStaffAccountSection, setIsOpenCreateStaffAccountModal] =
    useState<boolean>(false);
  const [isShowEditStaffAccountDialog, setIsOpenUpdateStaffAccountModal] = useState<boolean>(false);
  const [isOpenDeleteStaffAccountModal, setIsOpenDeleteStaffAccountModal] =
    useState<boolean>(false);
  const [selectedStaffAccount, setSelectedStaffAccount] = useState<Account | null>(null);

  const showCreateStaffAccountSection = () => setIsOpenCreateStaffAccountModal(true);
  const closeCreateStaffAccountModal = () => setIsOpenCreateStaffAccountModal(false);

  const openEditStaffAccountDialog = () => setIsOpenUpdateStaffAccountModal(true);
  const hideEditStaffAccountDialog = () => setIsOpenUpdateStaffAccountModal(false);

  const openDeleteStaffAccountModal = () => setIsOpenDeleteStaffAccountModal(true);
  const closeDeleteStaffAccountModal = () => setIsOpenDeleteStaffAccountModal(false);

  return (
    <ManageStaffAccountContext.Provider
      value={{
        isShowCreateStaffAccountSection,
        showCreateStaffAccountSection,
        hideCreateStaffAccountSection: closeCreateStaffAccountModal,

        isShowEditStaffAccountDialog,
        openEditStaffAccountDialog,
        hideEditStaffAccountDialog,

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

export const useManageStaffAccountContext = () => useContext(ManageStaffAccountContext);
