import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import StudentPerformanceChart from './StudentPerformanceChart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <div className="App">
            <StudentPerformanceChart />
        </div>
    </React.StrictMode>,
);
