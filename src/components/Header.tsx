import { Navbar, NavbarBrand, NavbarText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faCoins } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
        <Navbar className="navbar bg-light">
        <NavbarBrand>
            <FontAwesomeIcon icon={ faCalculator } />
            Cálculo de Financiamento de Capital de Giro
        </NavbarBrand>
        <NavbarText>
        </NavbarText>
        <NavbarText>
            <FontAwesomeIcon icon={ faCoins } />
            calcbank
        </NavbarText>
        </Navbar>
    );
}

export default Header;