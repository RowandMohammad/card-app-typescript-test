import { faBolt, faMoon, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useThemeContext } from "../styles/ThemeProvider";
import { darkModeStyles } from "../styles/themes";
import { useRef } from "react";

export default function NavBar() {
  const { darkMode, toggleDarkMode } = useThemeContext();
  const styles = darkModeStyles(darkMode);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openSettings = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      dialogRef.current.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 100,
        fill: "forwards",
      });
    }
  };

  const closeSettings = () => {
    if (dialogRef.current) {
      dialogRef.current.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 100,
        fill: "forwards",
      }).onfinish = () => dialogRef.current?.close();
    }
  };

  return (
    <nav className={`flex justify-between items-center p-4 ${styles.bgColor}`}>
      <div className="flex-grow flex justify-center">
        <NavLink
          className={`m-3 p-4 text-xl rounded-md font-medium ${styles.textColor} ${styles.buttonEditBgColor}`}
          to="/"
        >
          All Entries
        </NavLink>
        <NavLink
          className={`m-3 p-4 text-xl rounded-md font-medium ${styles.textColor} ${styles.buttonEditBgColor}`}
          to="/create"
        >
          New Entry
        </NavLink>
      </div>
      <button
        className={`m-3 py-3 px-4 text-xl rounded-full ${styles.buttonEditBgColor}`}
        onClick={openSettings}
        title="Settings"
      >
        <FontAwesomeIcon icon={faCog} />
      </button>

      <dialog
        ref={dialogRef}
        className={`relative rounded-lg shadow-lg p-6 transition-all ease-in-out duration-300 ${styles.cardBgColor} ${styles.cardShadow}`}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeSettings();
        }}
      >
        <h2 className={`text-lg font-semibold mb-4 ${styles.textColor}`}>Settings</h2>
        <div className="flex items-center justify-between">
          <p className={`${styles.textColor} mr-4`}>Toggle Dark Mode</p>
          <button
            className={`w-10 h-10 flex items-center justify-center text-xl rounded-full ${styles.buttonEditBgColor}`}
            onClick={toggleDarkMode}
            style={{ transition: "transform 0.3s ease" }}
          >
            <FontAwesomeIcon
              style={{
                transform: darkMode ? "rotate(360deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
              icon={darkMode ? faBolt : faMoon}
            />
          </button>
        </div>
      </dialog>
    </nav>
  );
}