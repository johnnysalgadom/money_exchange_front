import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { history } from "../common/route";

const NavbarGuest = () => {
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      history.push('/search')
    }
  }

  return (
    <div className="py-1">
      <div className="container">
        <nav className="section-navbar-guest navbar navbar-expand-lg navbar-light justify-content-between bg-white">
          <Link to="/" className="navbar-brand" style={{ fontSize: "32px", fontWeight: "bold", color: "#17ba4d" }}>
            Reto Cambio de Moneda
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default NavbarGuest
