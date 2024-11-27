import { ThemeContext } from "@emotion/react";
import { useContext } from "react";

export const useTheme = () => {
    return useContext(ThemeContext);
}