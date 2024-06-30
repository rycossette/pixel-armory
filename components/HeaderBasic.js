import React from 'react';
import PropTypes from 'prop-types';

const HeaderBasic = ({ title, subtitle, backgroundImage, backgroundColor, marginTop }) => {
  const containerStyle = {
    marginTop: marginTop || '0px', // Default to 0px if marginTop is not provided
  };

  let backgroundStyle = {};
  if (backgroundImage) {
    backgroundStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
  } else if (backgroundColor) {
    backgroundStyle = {
      backgroundColor: backgroundColor,
    };
  }

  return (
    <section className="relative h-[50vh] flex items-center justify-center" style={{ ...backgroundStyle, ...containerStyle }}>
      <div className="container mx-auto px-6 lg:px-32 text-center text-white">
        <div className="section-title mb-8">
          <h2 className="text-5xl font-bold pb-5">{title}</h2>
        </div>
        <p className="text-xl mb-8">{subtitle}</p>
      </div>
    </section>
  );
};

HeaderBasic.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string, // Optional background image URL
  backgroundColor: PropTypes.string, // Optional background color
  marginTop: PropTypes.string, // Optional margin top value
};

export default HeaderBasic;
