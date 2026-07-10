import React, { useEffect, useState } from 'react';
import { FaSignOutAlt, FaSearch, FaUserShield } from 'react-icons/fa';
import { useNavigate, useLocation  } from 'react-router-dom';

const TopBar = ({ searchItem, setSearchItem }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedInFo, setIsLoggedInFo] = useState(false);
  const [loggedInBo, setIsLoggedInBo] = useState(false);

  const updateLoginState = () => {
    const local = sessionStorage.getItem('local');

    if (local === 'bo') {
      setIsLoggedInBo(true);
      setIsLoggedInFo(false);
    } else if (local === 'fo') {
      setIsLoggedInFo(true);
      setIsLoggedInBo(false);
    } else {
      setIsLoggedInBo(false);
      setIsLoggedInFo(false);
    }
  };

  useEffect(() => {
    updateLoginState();
    const interval = setInterval(() => {
      updateLoginState();
    }, 20);

    return () => clearInterval(interval); 
  }, [location]); 




  const handleLogout = () => {
    var LoggedInFo = localStorage.getItem('loggedInFo');
    var LoggedInBo = localStorage.getItem('loggedInBo');
    var local = sessionStorage.getItem('local');

    if (LoggedInFo && local == 'fo') {
      localStorage.removeItem('loggedInFo');
      sessionStorage.removeItem('local');
      navigate('/');
    }

    if (LoggedInBo && local == 'bo') {
      localStorage.removeItem('loggedInBo');
      sessionStorage.removeItem('local');
      navigate('/stock');
    }

  }

  const handleSearchItem = (event) => {
    setSearchItem(event.target.value);
  }

  return (
    <nav className="navbar navbar-expand nav-back" aria-label="Second navbar example">
      <div className="container-fluid">
        <a className="navbar-brand" href={loggedInBo ? '/dashboard' : '/index'}><img src="/img/Logo_azul.png" alt="Logo" /></a>
        <div className='search'>
          <input type='text' placeholder='Pesquisa...' value={searchItem} onChange={handleSearchItem} />
          <label> <FaSearch /></label>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample02">
          <ul className="navbar-nav me-auto">
            <li>
              {loggedInFo ? (
                <button  style={{ right: '90px' }} onClick={() => navigate('/stock')} className="btn-logout backoffice-btn">
                  <FaUserShield className="logout-icon" />
                </button>
              ) : null}

            </li>
            <li>
              <button onClick={handleLogout} className="btn-logout">
                <FaSignOutAlt className="logout-icon" />
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
