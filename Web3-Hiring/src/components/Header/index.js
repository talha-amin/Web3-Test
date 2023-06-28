import React, { useEffect, useState } from 'react';
// reactstrap components
import { Row, Col } from 'reactstrap';
import { Link} from 'react-router-dom';
import axios from 'axios'


import './index.scss';
function HomePage() {

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if Metamask is installed
    if (typeof window.ethereum == 'undefined') {
      alert("No Metamask!")
    }
  }, []);

  const connectWallet = async () => {
    try {
      // Request access to the user's Metamask wallet
      await window.ethereum.enable();
      const accounts =  await window.ethereum.request({ method: 'eth_requestAccounts' });
      setIsConnected(true);
      const address = accounts[0]
      const message = "Hello,Chainfuse!";
      const Signature = await window.ethereum.request({ method: 'personal_sign', params: [message,address]});
      console.log("Signature",Signature);
      await axios.post(`http://localhost:3500/api/endpoint`, {Signature} , {signature: Signature});
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
    }
  };


  return (
    <Row className="padding-32">
      <Col xs="4" className="">
        {' '}
        <img src={require('assets/img/logo.png')} />{' '}
      </Col>
      <Col xs="4" className="logo" >
        <Link to="/" className="margin-12">
          HOME
        </Link>{' '}
        <span>/</span>
        <Link to="/about" className="margin-12">
          ABOUT
        </Link>{' '}
        <span>/</span>
        <Link to="/loginpage" className="margin-12">
          LOGIN
        </Link>
      </Col>
      <Col xs="4" className="logo" >
        <a className="margin-12" onClick={connectWallet}>
          {isConnected ? 'Connected' : 'Connect Wallet'}
        </a>
      </Col>
    </Row>
  );
}

export default HomePage;
