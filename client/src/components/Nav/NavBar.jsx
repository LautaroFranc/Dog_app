import React from 'react';
import { NavLink } from 'react-router-dom';
import draw from '../landing page/patitasDraw'
import './styleNavar.css';


export default function NavBar() {
	const [menu, setMenu]= React.useState({
		btn_vander:true,
		btn_menu:"btn-menu",
		inc:"⫶",
		ul:"list",
		li:"list_item"
	})

	function onclikMenu(){
		if(menu.btn_vander){
			setMenu({
				btn_vander:false,
				btn_menu:"clos_btn",
				inc:"✕",
				ul:"list-reponsi",
				li:"list_item-reponsi"});
		}else{
			setMenu({
				btn_vander:true,
				btn_menu:"btn-menu ",
				inc:"⫶",
				ul:"scrol ",
				li:"list_item-reponsi"})
		}
	}
	function onClickCondicion(e) {
		draw.stop()
		if(e.clientX<86&&e.clientX!==0){
			onclikMenu()
		}
	}
  return (

  	<header className="navbar">
				<div className="navbar-logo">
					<NavLink exact to="/" >
						<span className="logoDog" >Dog</span>
					</NavLink>
				</div>
				<nav>
					<ul className={menu.ul}>
							<li className={menu.li}>
								<NavLink exact to="/Dogs" onClick={(e) => onClickCondicion(e)}>Home</NavLink>
							</li>
							<li className={menu.li}> 
								<NavLink to="/CreatDog"  onClick={(e) => onClickCondicion(e)}>CreatDog</NavLink>
							</li>
					</ul>
				</nav>
				<div className ="btn-container">
					<button onClick={onclikMenu} className={menu.btn_menu}>{menu.inc}</button>
				</div>
			</header>
  )
}