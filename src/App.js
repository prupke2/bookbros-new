import React from 'react';
import './App.scss';
import Home from './Home/Home';
// import { Routes, Route } from "react-router-dom";

import { initializeParse } from '@parse/react';

initializeParse(
  'https://bookbros.b4a.io/',
  'j8bZXyteOFiSCWNItcLmRfdimaPOSdZF9vBPKQFv',
  'YZDR2jPHJKrHmP2UjtT0l6D6jPvo7SsH2qSIJdU8'
);

export default function App() {
  return <Home />
}
