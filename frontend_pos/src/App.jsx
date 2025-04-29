import React from 'react'


function App() {


  return (
    <>
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to Hungry Panda</h1>
          <p className="lead">Discover authenic Western Cusinie at unbeatable prices!</p>
          <a href="#" className="btn btn-light btn-lg">Browse Now</a>
        </div>
      </header>

      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p>&copy; 2025 Hungry Panda. All rights reserved.</p>
        </div>
      </footer>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Menu</a>
          <button
            className="navbar-toggler"
            type="button"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Products</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>    
  )
}

export default App
