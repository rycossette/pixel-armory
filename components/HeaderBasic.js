import React from 'react';
import PropTypes from 'prop-types';

const HeaderBasic = ({ title, subtitle, backgroundImage, backgroundColor, marginTop = 'mt-24' }) => {
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
    <section
      className={`relative h-[50vh] flex items-center justify-center ${marginTop}`}
      style={{ ...backgroundStyle, ...containerStyle }}
    >
      <div className="container mx-auto px-6 lg:px-32 flex flex-col md:flex-row items-center text-white">
        <div className="md:w-1/3 text-left">
          <h2 className="text-5xl font-bold pb-5">{title}</h2>
        </div>
        <div className="md:w-2/3 text-left">
          <p className="text-xl">{subtitle}</p>
        </div>
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
