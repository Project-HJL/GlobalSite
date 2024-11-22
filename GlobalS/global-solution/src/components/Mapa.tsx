'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Place {
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  description: string;
  country: string;
  image?: string; // O nome da imagem
  link?: string;
}

const Mapa = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null); // Para controlar a instância do mapa
  const [sources, setSources] = useState<Place[]>([]);
  const [filteredSources, setFilteredSources] = useState<Place[]>([]);
  const [selectedType, setSelectedType] = useState<string>('Todos');

  const customIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: '/images/pin.svg',
        iconSize: [30, 40],
        iconAnchor: [15, 40],
        popupAnchor: [0, -40],
      }),
    []
  );

  useEffect(() => {
    // Fetch inicial para carregar os dados da API
    fetch('http://localhost:8080/JavaGs/webapi/places')
      .then((response) => response.json())
      .then((data) => {
        setSources(data);
        setFilteredSources(data); // Inicializa o filtro com todos os dados
      })
      .catch((error) => {
        console.error('Erro ao carregar os dados:', error);
      });
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Inicializa o mapa
    const map = L.map(mapRef.current).setView([42.2, 9.1], 7);
    mapInstance.current = map;

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/luccashiroshi/cm383wunp005z01o1968373k9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibHVjY2FzaGlyb3NoaSIsImEiOiJjbTM4M2Vvbzcwbm9jMmtvY3YzYW9jM2p0In0.Jjg0vEJA-G81jrS3SapKyA',
      {
        attribution:
          '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(map);

    return () => {
      // Remove o mapa ao desmontar o componente
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    const map = mapInstance.current;

    // Função para adicionar os marcadores
    const addMarkers = (locations: Place[]) => {
      // Remove todos os marcadores existentes
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Adiciona os novos marcadores
      locations.forEach((source) => {
        const popupContent = document.createElement('div');
        popupContent.className = 'custom-popup';

        const imageElement = document.createElement('img');
        imageElement.src = source.image ? `/images/${source.image}` : '';
        imageElement.alt = 'Imagem';
        imageElement.className = 'popup-image';
        imageElement.style.width = '98%';
        imageElement.style.height = '220px';
        imageElement.style.borderRadius = '5px';

        const textElement = document.createElement('div');
        textElement.className = 'popup-text';
        textElement.innerHTML = `
          <b class="popup-title">${source.name}</b><br>
          <span class="popup-type">Tipo: ${source.type}</span><br>
          <span class="popup-country">País: ${source.country}</span><br>
          <p class="popup-description">${source.description}</p>
          <a href="${source.link}" target="_blank" class="popup-link">Mais informações</a>
        `;

        popupContent.appendChild(imageElement);
        popupContent.appendChild(textElement);

        L.marker([source.latitude, source.longitude], { icon: customIcon })
          .addTo(map)
          .bindPopup(popupContent);
      });
    };

    addMarkers(filteredSources);
  }, [filteredSources, customIcon]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedType(selected);

    if (selected === 'Todos') {
      setFilteredSources(sources);
    } else {
      const filtered = sources.filter((place) => place.type === selected);
      setFilteredSources(filtered);
    }
  };

  return (
    <div className='mapa-container-inside'>
      <h1>Mapa de Fontes de Energia Renovável</h1>
      <select value={selectedType} onChange={handleFilterChange}>
        <option value="Todos">Todos</option>
        <option value="Usina Hidrelétrica">Usina Hidrelétrica</option>
        <option value="Fazenda Eólica">Fazenda Eólica</option>
        <option value="Fazenda Solar">Fazenda Solar</option>
        <option value="Usina de Energia das Marés">Usina de Energia das Marés</option>
      </select>

      <div className='mapinha' ref={mapRef}></div>
    </div>
  );
};

export default Mapa;
