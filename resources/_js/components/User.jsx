import React from 'react';

import ReactDOM from 'react-dom/client';
function User() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card text-center">
                        <div className="card-header"><h2>React Component in Laravel</h2></div>
                        <div className="card-body">I'm tiny React component in Laravel app!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default User;
// DOM element
if (document.getElementById('user')) {
    const Index = ReactDOM.createRoot(document.getElementById("user"));

    Index.render(
        <React.StrictMode>
            <User/>
        </React.StrictMode>
    )
}
