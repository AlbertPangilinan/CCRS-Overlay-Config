import { useState } from 'react';
import Config from './pages/Config/Config';
import Teams from './pages/Teams/Teams';

const pages = {
    0: <Config />,
    1: <Teams />,
}

function App() {

    const [currentPage, setCurrentPage] = useState(0)

    function changePage(page) {
        setCurrentPage(page);
    }

    function renderPage() {
        return pages[currentPage];
    }

    return (
        <div className="app">
            <div className="navbar">
                <div className="navbar__page" style={{ color: currentPage === 0 ? "white" : "grey" }} onClick={() => changePage(0)}>Overlay Config</div>
                <div className="navbar__page" style={{ color: currentPage === 1 ? "white" : "grey" }} onClick={() => changePage(1)}>Team Data</div>
            </div>
            {renderPage()}
        </div>
    );
}

export default App;
