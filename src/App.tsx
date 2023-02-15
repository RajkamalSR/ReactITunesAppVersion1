import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderComponent from './components/header/Header';
import SongListsComponent from './components/musiclibrary/SongLists';

function App() {

  return (
    <div className="App">
      <HeaderComponent />
      <main className='main-content'>
          <SongListsComponent />
      </main>
    </div>
  );
}

export default App;
