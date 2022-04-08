import React, { useState } from 'react';
import api from '../services/api';

import '../../src/global.css';
import './App.css';
import '../../src/Sidebar.css';
import '../../src/Main.css';

import Form from '../components/Form';

function App() {

  const [Local, setLocal] = useState([]);
  const [weather, setWeather] = useState([]);
  const [wind, setWind] = useState([]);
  const [clouds, setclouds] = useState([]);
  const [main, setMain] = useState([]);
  const [vissibily, setVissibily] = useState(true);


  async function handleAdd(data) {

    const response = await api.get(`/weather?lat=${data.latitude}&lon=${data.longitude}&lang=pt&&appid=639298eeca16ccec11f2d27a7797fcd2&units=metric`);

    if (!response !== null) {
      setVissibily(false)
    }

    setLocal(response.data);
    setWind(response.data.wind);
    setclouds(response.data.clouds)
    setWeather(response.data.weather[0])
    setMain(response.data.main)

    console.log(response.data);

    return response;

  }

  return (
    <div id="app">
      <aside>
        <strong>Dados meteorológicos da sua cidade</strong>
        <Form onSubmit={handleAdd} />
      </aside>
      <main>

        {vissibily ? false :
          <ul>
            <li className="item">

              <header>

                <div className="info">

                  <strong>{Local.name}</strong>
                  <span>{weather.main} </span>
                  <span>{weather.description}</span><br />
                  <span>Umidade: {clouds.all}%</span><br />
                  <span>Temperatura: {main.temp}Cº</span><br />
                </div>
              </header>

              <p> Velocidade do vento: <strong>{wind.speed} km/h</strong></p>
              <p>Direção do vento: <strong>{wind.deg}</strong></p>
              <p>Rajada de vento:  <strong>{wind.gust} km/h</strong></p>
            </li>

          </ul>
        }

      </main>

    </div>
  );
}

export default App;


