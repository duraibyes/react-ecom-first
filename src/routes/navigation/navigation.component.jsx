import { Fragment } from 'react';
import {Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
    return (
      <Fragment>
        <div className='navigation'>
            <Link to='/' className='logo-container'>
                <CrownLogo />
            </Link>
            <div className="nav-links-container">
                <Link to='/shop'>
                    SHOP
                </Link>
                <Link className='' to='/auth'>
                    SIGNIN
                </Link>
            </div>
        </div>
        <Outlet />
      </Fragment>
    );
}

export default Navigation;