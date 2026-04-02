import { Sidebar } from './components/sidebar/Sidebar';
import { TopBar } from './components/topbar/TopBar';
import { Editor } from './components/editor/Editor';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useNotesStore } from './store/useNotesStore';

function App() {
  useKeyboardShortcuts();
  const { activeNoteId } = useNotesStore();

  return (
    <div className={`app-container ${activeNoteId ? 'has-active-note' : ''}`}>
      <Sidebar />
      <div className="main-layout">
        <TopBar />
        <Editor />
      </div>

      <style>{`
        .app-container {
          display: flex;
          width: 100vw;
          height: 100vh;
          background-color: var(--bg-color);
          overflow: hidden;
        }

        .main-layout {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .app-container .sidebar {
            display: flex;
            width: 100%;
          }

          .app-container .main-layout {
            display: none;
          }

          /* When a note is active, show editor and hide sidebar */
          .app-container.has-active-note .sidebar {
            display: none;
          }

          .app-container.has-active-note .main-layout {
            display: flex;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
