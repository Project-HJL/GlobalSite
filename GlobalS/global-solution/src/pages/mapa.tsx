import dynamic from 'next/dynamic';

const MapaComponente = dynamic(() => import('../components/Mapa'), {
  ssr: false,
});

const PaginaMapa = () => {
  return (
    <div className='mapa-container'>
      <MapaComponente />
    </div>
  );
};

export default PaginaMapa;
