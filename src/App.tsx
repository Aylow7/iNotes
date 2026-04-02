import { Sidebar } from './components/sidebar/Sidebar';
import { TopBar } from './components/topbar/TopBar';
import { Editor } from './components/editor/Editor';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
  useKeyboardShortcuts();

  return (
    <div className="app-container">
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
      `}</style>
    </div>
  );
}

export default App;
