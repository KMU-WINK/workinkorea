import React from 'react';
import SpinnerImage from '../../../public/svgs/spin.svg';

const Spinner = () => {
  return (
    <div className="pt-20 flex flex-col justify-center w-full">
      <div className="flex justify-center w-20 h-20 self-center">
        <SpinnerImage />
      </div>
    </div>
  );
};

export default Spinner;
