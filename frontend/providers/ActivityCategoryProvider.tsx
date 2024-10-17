import { getCookieByName } from "@/libs/cookie";
import { ActivityCategory } from "@/types/Activity";
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useState } from "react";

interface IActivityCategoryContext {
  selectedCategory: ActivityCategory | null;
  setSelectedCategory: Dispatch<SetStateAction<ActivityCategory | null>>;
  isShowEditCategoryModal: boolean;
  isShowCreateCategorySection: boolean;
  showEditCategoryModal: () => void;
  hideEditCategoryModal: () => void;
  deleteCategoryById: (id: number, refetch: () => void) => void;
  showCreateCategorySection: () => void;
  hideCreateCategorySection: () => void;
}

const initialState: IActivityCategoryContext = {
  selectedCategory: null,
  isShowEditCategoryModal: false,
  isShowCreateCategorySection: false,
  setSelectedCategory: () => {},
  showEditCategoryModal: () => {},
  hideEditCategoryModal: () => {},
  deleteCategoryById: () => {},
  showCreateCategorySection: () => {},
  hideCreateCategorySection: () => {},
};

export const ActivityCategoryContext = createContext<IActivityCategoryContext>(initialState);

const ActivityCategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | null>(null);
  const [isShowEditCategoryModal, setIsShowEditCategoryModal] = useState<boolean>(false);
  const [isShowCreateCategorySection, setIsShowCreateCategorySection] = useState<boolean>(false);

  const showEditCategoryModal = () => {
    setIsShowEditCategoryModal(true);
  };

  const hideEditCategoryModal = () => {
    setIsShowEditCategoryModal(false);
  };

  const deleteCategoryById = useCallback((id: number, refetch: () => void) => {
    const confirm = window.confirm("Are you sure you want to delete this category?");

    if (confirm) {
      const result = fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/staff/activity_category/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookieByName("session_id_token")}`,
          },
        }
      )
        .then((res) => {
          refetch();
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const showCreateCategorySection = () => {
    setIsShowCreateCategorySection(true);
  };

  const hideCreateCategorySection = () => {
    setIsShowCreateCategorySection(false);
  };

  return (
    <ActivityCategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        isShowEditCategoryModal,
        showEditCategoryModal,
        hideEditCategoryModal,
        deleteCategoryById,
        isShowCreateCategorySection,
        showCreateCategorySection,
        hideCreateCategorySection,
      }}
    >
      {children}
    </ActivityCategoryContext.Provider>
  );
};

export default ActivityCategoryProvider;

export const useActivityCategoryContext = () => useContext(ActivityCategoryContext);
