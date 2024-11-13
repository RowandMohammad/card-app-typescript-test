import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { useThemeContext } from "../styles/ThemeProvider";
import { darkModeStyles } from "../styles/themes";
import { EntryContext } from "../utilities/globalContext";

export default function EditEntry() {
  const { id } = useParams();
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), scheduled_at: new Date() };

  const { updateEntry, entries } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);

  useEffect(() => {
    const entry = entries.filter((entry) => entry.id === id)[0];
    setNewEntry(entry);
  }, []);

  const { darkMode } = useThemeContext();
  const styles = darkModeStyles(darkMode);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };

  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    updateEntry(id as string, newEntry);
  };

  return (
    <div className="min-h-screen flex-grow">
      <section
        className={`transition flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 ${styles.cardBgColor} ${styles.textColor} p-8 rounded-md`}
      >
        <input
          className={`p-3 rounded-md ${styles.bgColor}`}
          type="text"
          placeholder="Title"
          name="title"
          value={newEntry.title}
          onChange={handleInputChange}
        />
        <textarea
          className={`p-3 rounded-md ${styles.bgColor}`}
          placeholder="Description"
          name="description"
          value={newEntry.description}
          onChange={handleInputChange}
        />
        <label className="text-center">When should this be scheduled?</label>
        <input
          className={`p-3 rounded-md ${styles.bgColor}`}
          type="date"
          name="scheduled_at"
          value={new Date(newEntry.scheduled_at).toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
        <button
          onClick={(e) => {
            handleSend(e);
          }}
          className={`bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md ${styles.buttonEditBgColor}`}
        >
          Update
        </button>
      </section>
    </div>
  );
}