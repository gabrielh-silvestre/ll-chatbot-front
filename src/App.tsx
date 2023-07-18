import { useState } from 'react';
import styles from './App.module.css';
import { LadingPage } from './pages/Landing';

function App() {
  const [page, setPage] = useState(1);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <div className={styles.tab} onClick={() => setPage(1)}>
            Chat
            {page === 1 ? <div className={styles.tab_indicator} /> : null}
          </div>

          <div className={styles.tab} onClick={() => setPage(2)}>
            History
            {page === 2 ? <div className={styles.tab_indicator} /> : null}
          </div>
        </div>
      </div>

      <div className={styles.tab_content}>
        {page === 1 ? <LadingPage /> : null}
        {page === 2 ? <div>History</div> : null}
      </div>
    </div>
  );
}

export default App;
