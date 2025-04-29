import React from "react";
import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={css.link}>
        HOME
      </NavLink>
      <NavLink to="/movies" className={css.link}>
        MOVIE
      </NavLink>
    </nav>
  );
};

export default Navigation;
