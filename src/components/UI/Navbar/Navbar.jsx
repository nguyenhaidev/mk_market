import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setActive] = useState(0);

  const setCurrent = (val) => setActive(val);

  useEffect(() => {
    switch (document.location.pathname) {
      case "":
        setCurrent(0);
        break;
      case "/":
        setCurrent(0);
        break;
      case "/categories":
        setCurrent(1);
        break;
      case "/info":
        setCurrent(2);
        break;
      default:
        setCurrent(0);
    }
  });

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="white" light expand="md" className="px-0 mb-2">
      <NavbarBrand href="/">
        <span
          className="p-1 fw-bold"
          style={{
            borderRadius: 8,
            backgroundColor: "#1a1a74",
            color: "white",
          }}
        >
          MK
        </span>{" "}
        Market
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-md-auto " navbar>
          <NavItem>
            <NavLink
              href="/"
              className={isActive === 0 ? "nav-link-active" : ""}
            >
              Trang chủ
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="/categories"
              className={isActive === 1 ? "nav-link-active" : ""}
            >
              Cửa hàng
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="/info"
              className={isActive === 2 ? "nav-link-active" : ""}
            >
              Liên hệ
            </NavLink>
          </NavItem>
        </Nav>
        <Nav className="ms-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav>
              <i className="fas fa-shopping-basket mx-1"></i>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav>
              <i className="far fa-user mx-1"></i>
            </DropdownToggle>
            <DropdownMenu right className="py-0" style={{ overflow: "hidden" }}>
              <DropdownItem>
                <p className="text-center my-1">Đăng nhập</p>
              </DropdownItem>
              <DropdownItem>
                <p className="text-center my-1">Đăng ký</p>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
