import React from 'react';

const Video: React.FC = () => {
  return (
    <section className="video-section">
      <div className="container-5">
        <div className="videopitch">
          <h2>Vídeo Pitch</h2>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/tQOsknzOH7c"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Video;
