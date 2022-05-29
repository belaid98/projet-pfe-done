import React from 'react'
import './Footerv2.css'

function Footerv2() {
    return (
        <div className='Footerv2'>
            <div className="main content">
                <div className="left box">
                    <h2>A propos Nous</h2>
                    <div className="content">
                        <p>
                            Le musée de la monnaie est un musée numismatique  situé en plein centre de Tunis.<br/>
                            Elle est placé dans la partie orientale du nouveau bâtiment de la Banque Centrale <br/> de Tunisie sur l’avenue Mohamed V.
                        </p>
                        <div className="social">
                            <a href="#"><span className="fab fa-facebook-f"> </span></a>
                                                        
                            
                        </div>
                    </div>
                </div>
                <div className="center box">
                    <h2>Adresse</h2>
                    <div className="content">
                        <div className="place">
                            <span className="fas fa-map-marker-alt"></span>
                            <span className="text">Tunisie, Tunis</span>
                        </div>
                        <div className="phone">
                            <span className="fas fa-phone-alt"></span>
                            <span className="text">+216 94613076</span>
                        </div>
                        <div className="email">
                            <span className="fas fa-envelope"></span>
                            <span className="text">waelbelaid205@gmail.com</span>
                        </div>
                    </div>
                </div>

                <div className="right box">
                    <h2> Contacter Nous </h2>
                    <div className="content">
                        <form action="#">
                        <div className="text">
                                <div className="text"> Nom *</div>
                                <input type="text" required />
                            </div>
                            <div className="email">
                                <div className="text"> Email *</div>
                                <input type="email" required />
                            </div>
                            <div className="msg">
                                <div className="text"> Message *</div>
                                <textarea cols="25" rows="5" required></textarea>
                            </div>
                            <div className="btn">
                                <button type="submit"> Envoyer </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <center>
                    <span className="credit"> Created By <a href="https://waelbelaid.netlify.app">wael belaid</a> | </span>
                    <span className="far fa-copyright"></span><span> 2022 All rights reserved .</span>
                </center>
            </div>
        </div>
    )
}

export default Footerv2