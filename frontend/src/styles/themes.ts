export const darkModeStyles = (darkMode: boolean) => {
  const lightModeStyles = {
    textColor: "text-gray-900",
    bgColor: "bg-blue-50",
    cardBgColor: "bg-white",
    cardShadow: "shadow-lg shadow-blue-200",
    buttonDeleteBgColor: "bg-red-500 hover:bg-red-600",
    buttonEditBgColor: "bg-indigo-500 hover:bg-indigo-600",
  };

  const darkModeStyles = {
    textColor: "text-gray-100",
    bgColor: "bg-gray-900",
    cardBgColor: "bg-gray-800",
    cardShadow: "shadow-lg shadow-gray-700",
    buttonDeleteBgColor: "bg-pink-500 hover:bg-pink-600",
    buttonEditBgColor: "bg-teal-500 hover:bg-teal-600",
  };

  return darkMode ? darkModeStyles : lightModeStyles;
};
