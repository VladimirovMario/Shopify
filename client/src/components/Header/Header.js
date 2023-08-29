import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import styles from './Header.module.css';
import SearchBar from '../Shared/SearchBar/SearchBar';
import UserFavorites from './UserFavorites.js/UserFavorites';

export default function Header() {
  const { isAuthenticated } = useAuthContext();

  const combinedStyles = `${styles['profile-icon-wrapper']} ${styles['dropdown-nav']}`;

  return (
    <header className={styles.header}>
      <div className={styles['top-navigation-main']}>
        {/* <!-- Shopify logo  --> */}
        <ul>
          <li>
            <Link to={'/'}>
              <img
                className={styles['shopify-logo']}
                src="/static/shopping-logo.png"
                alt="logo"
              />
            </Link>
          </li>
        </ul>

        {/* <!-- Search form --> */}
        <SearchBar />

        {/* <!-- Action icons --> */}
        <div className={styles['top-icons-wrapper']}>
          <div className={combinedStyles}>
            <img
              className={styles['profile-icon-img']}
              src="/static/icons/login(128).png"
              alt="profile-icon"
            />
            <ul className={styles['dropdown-content']}>
              {/* <!-- Logged users --> */}
              {isAuthenticated && (
                <div className={styles['user-links']}>
                  <li>
                    <Link
                      className={styles['dropdown-content-links']}
                      to={'/auth/profile'}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={styles['dropdown-content-links']}
                      to={'/auth/logout'}
                    >
                      Logout
                    </Link>
                  </li>
                </div>
              )}

              {/* <!-- Guest users --> */}
              {!isAuthenticated && (
                <div className={styles['guest-links']}>
                  <li>
                    <Link
                      className={styles['dropdown-content-links']}
                      to={'/auth/login'}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={styles['dropdown-content-links']}
                      to={'/auth/register'}
                    >
                      Register
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>

          {/* User favorites */}
          <UserFavorites />

          {/* User shopping cart */}
          <div className={styles['shopping-cart-wrapper']}>
            <img
              className={styles['shopping-cart-img']}
              src="/static/icons/shopping-cart(128).png"
              alt="shopping-cart"
            />
            <div className={styles['shopping-count']}>
              <span>12</span>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Header navigation --> */}
      <div className={styles['header-nav-wrapper']}>
        <nav className={styles['header-nav']}>
          <ul className={styles['dropdown-nav']}>
            <li className={styles['main-nav-icon']}>
              <Link to={'/'}>
                <i className="fa-solid fa-bars"></i>
                <span className={styles['categories-link']}>Categories</span>
              </Link>
            </li>

            {/* <!-- Dropdown-content --> */}
            <ul className={styles['dropdown-content']}>
              <li>
                <Link
                  className={styles['dropdown-content-links']}
                  to={'/catalog'}
                >
                  Explore
                </Link>
              </li>

              {isAuthenticated && (
                <li>
                  <Link
                    className={styles['dropdown-content-links']}
                    to={'/create-product'}
                  >
                    Create
                  </Link>
                </li>
              )}
              <li>
                <Link className={styles['dropdown-content-links']} to={'/'}>
                  Link 3
                </Link>
              </li>
            </ul>
          </ul>

          <ul>
            {isAuthenticated && (
              <li>
                <Link to={'/create-product'}>Create</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
