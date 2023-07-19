import { ToastContainer, toast } from 'react-toastify';
import { useRef, useState } from 'react';

import { ApiLocalStorageGateway } from './gateways/api/ApiLocalStorage.gateway';
import { AuthLocalStorageGateway } from './gateways/auth/AuthLocalStorage.gateway';

import { LadingPage } from './pages/Landing';
import { HistoryPage } from './pages/History';

import styles from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [page, setPage] = useState(1);

  const api = useRef(new ApiLocalStorageGateway());
  const auth = useRef(new AuthLocalStorageGateway());

  return (
    <div className={styles.container}>
      <ToastContainer
        autoClose={3000}
        position={toast.POSITION.TOP_CENTER}
        closeOnClick
      />

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
        {page === 1 ? (
          <LadingPage apiGateway={api.current} authGateway={auth.current} />
        ) : null}
        {page === 2 ? (
          <HistoryPage apiGateway={api.current} authGateway={auth.current} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
