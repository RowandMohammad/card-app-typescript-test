import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import { ThemeProvider, useThemeContext } from "./styles/ThemeProvider";
import { darkModeStyles } from "./styles/themes";
import { EntryProvider } from "./utilities/globalContext";

export default function App() {
  return (
    <section className="min-h-screen flex flex-col">
      <Router>
        <EntryProvider>
          <ThemeProvider>
            <Content></Content>
          </ThemeProvider>
        </EntryProvider>
      </Router>
    </section>
  );
}

const Content: React.FC = () => {
  const { darkMode } = useThemeContext();
  const styles = darkModeStyles(darkMode);

  return (
    <div className={`transition ${styles.bgColor}`}>
      <NavBar />
      <Routes>
        <Route path="/" element={<AllEntries />} />
        <Route path="create" element={<NewEntry />} />
        <Route path="edit/:id" element={<EditEntry />} />
      </Routes>
    </div>
  );
};