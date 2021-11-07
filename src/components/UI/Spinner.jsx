/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/loading/loading.min.css';

const Spinner = ({
  // atributes
  spinnerType, moveType,

  // styles
  color, margin,
}) => (
  <>
    <div
      className={`ld ld-${spinnerType} ld-${moveType}`}
      style={{
        color,
        margin,
      }}
    />
  </>
);

Spinner.defaultProps = {
  color: 'white',
  margin: '0 auto',
};

Spinner.propTypes = {
  // atributes
  moveType: PropTypes.oneOf(['beat', 'blink', 'blur', 'bounce', 'bounceAlt', 'breath', 'clock', 'coin-h', 'coin-v', 'cycle',
    'cycle-alt', 'damage', 'dim', 'fade', 'flip', 'flip-h', 'flip-v', 'float', 'heartbeat', 'hit', 'jelly', 'jelly-alt', 'jingle',
    'jump', 'measure', 'metronome', 'move-btt', 'move-fade-btt', 'move-fade-ltr', 'move-fade-rtl', 'move-fade-ttb', 'move-ltr',
    'move-rtl', 'move-ttb', 'orbit', 'pulse', 'rubber-h', 'rubber-v', 'rush-btt', 'rush-ltr', 'rush-rtl', 'rush-ttb', 'shake-h',
    'shake-v', 'shiver', 'skew', 'skew-alt', 'slide-btt', 'slide-ltr', 'slide-rtl', 'slide-ttb', 'smash', 'spin', 'spin-fast',
    'squeeze', 'surprise', 'swim', 'swing', 'tick', 'tick-alt', 'tremble', 'vortex', 'vortex-alt', 'wander-h', 'wander-v', 'wrench']).isRequired,
  spinnerType: PropTypes.oneOf(['ball', 'hourglass', 'ring', 'square', 'cross', 'spinner', 'pie']).isRequired,

  // styles
  color: PropTypes.string,
  margin: PropTypes.string,
};

export default Spinner;
