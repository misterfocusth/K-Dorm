export const getLocalstorageItem = (key: string): string | null => {
	if (typeof window === "undefined") return null;

	return window.localStorage.getItem(key);
};
