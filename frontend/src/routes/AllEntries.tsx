import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { useThemeContext } from "../styles/ThemeProvider";
import { darkModeStyles } from "../styles/themes";
import { EntryContext } from "../utilities/globalContext";

export default function AllEntries() {
  const { entries, deleteEntry } = useContext(EntryContext) as EntryContextType;
  const { darkMode } = useThemeContext();
  const styles = darkModeStyles(darkMode);
  const navigate = useNavigate();

  if (entries.length === 0) {
    return (
      <section className={`min-h-screen transition flex flex-col justify-center items-center`}>
        <h1 className={`text-center font-semibold text-2xl m-5 ${styles.textColor}`}>You don't have any cards</h1>
        <p className={`text-center font-medium text-md ${styles.textColor}`}>
          <Link className="text-blue-400 underline-offset-1 hover:text-blue-600 text-lg" to="/create">
            Let's Create One!
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section className={`min-h-screen grid grid-cols-2 md:grid-cols-4 transition`}>
      {entries.map((entry: Entry, index: number) => {
        return (
          <div
            id={entry.id}
            key={index}
            className={`shadow-md ${styles.cardShadow} transition inline-block 
            m-3 p-4 rounded ${styles.cardBgColor} max-h-48 overflow-y-auto`}
          >
            <div className="flex justify-between">
              <h1 className={`font-bold text-sm md:text-lg ${styles.textColor}`}>{entry.title}</h1>
              <div className="flex flex-col items-center">
                <h1 className={`font-bold text-sm md:text-lg ${styles.textColor}`}>Scheduled for: </h1>
                <time className={styles.textColor}>{new Date(entry.scheduled_at.toString()).toDateString()}</time>
              </div>
            </div>

            <p className={`text-center text-lg font-light md:mt-2 md:mb-4 mt-1 mb-3 ${styles.textColor}`}>
              {entry.description}
            </p>

            <section className="flex items-center justify-between flex-col md:flex-row pt-2 md:pt-0">
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    deleteEntry(entry.id as string);
                  }}
                  className={`m-1 md:m-2 p-1 w-10 h-10 font-semibold rounded-md ${styles.buttonDeleteBgColor}`}
                >
                  <FontAwesomeIcon className={styles.textColor} icon={faXmark}></FontAwesomeIcon>
                </button>
                <button
                  onClick={() => {
                    navigate(`/edit/${entry.id}`, { replace: true });
                  }}
                  className={`m-1 md:m-2 p-1 w-10 h-10 font-semibold rounded-md ${styles.buttonEditBgColor}`}
                >
                  <FontAwesomeIcon className={styles.textColor} icon={faPenToSquare}></FontAwesomeIcon>
                </button>
              </div>
              <div className="flex flex-col items-center">
                <h1 className={`font-bold text-sm md:text-lg ${styles.textColor}`}>Created on: </h1>
                <time className={styles.textColor}>{new Date(entry.created_at.toString()).toDateString()}</time>
              </div>
            </section>
          </div>
        );
      })}
    </section>
  );
}