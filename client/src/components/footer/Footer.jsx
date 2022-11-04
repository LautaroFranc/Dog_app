import React from "react";
import './footerStyle.css'
export default class Footer extends React.Component{
  render() {
    return(
      <div className="Conteiner" >
        <div className="i">
          <span>©2022-{new Date().getFullYear()}</span>
          <p>GitHub</p>
        </div>        
      </div>
    )
  }
}