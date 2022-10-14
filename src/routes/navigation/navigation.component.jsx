import { Fragment, useContext } from 'react';
import {Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { userContext } from '../../contexts/user.context';
import { authSignOut } from '../../utils/firebase/firebase.utils';
import './navigation.styles.scss';

const Navigation = () => {
    const {currentUser, setCurrentUser} = useContext(userContext);
    const signOutHandler = async () => {
        await authSignOut();
        setCurrentUser(null);
    }

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
                {
                    currentUser ? (
                        <span className='nav-link' onClick={signOutHandler} >SIGNOUT</span>
                    ) : (
                        <Link className='nav-link' to='/auth'>
                            SIGNIN
                        </Link>
                    )
                }
                
            </div>
        </div>
        <Outlet />
      </Fragment>
    );
}

export default Navigation;