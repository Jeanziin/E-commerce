import React from 'react';

const BookContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 my-10 mb-10" >
      <div className="max-w-6xl bg-white p-5 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/3">
            <img src="https://source.unsplash.com/random/300x400" alt="Book Cover" className="w-full rounded-lg shadow-lg" />
          </div>
          <div className="sm:w-2/3 sm:pl-6 mt-4 sm:mt-0">
            <h1 className="text-3xl font-bold mb-4">JavaScript: The Definitive Guide</h1>
            <span className="text-gray-600 text-sm mb-2">by David Flanagan</span>
            <div className="flex items-center mb-4">
              <span className="text-gray-600 text-sm">(12)</span>
            </div>
            <p className="text-gray-800 text-lg font-medium mb-4">
              This fifth edition of a classic book covers new features added to the JavaScript language since the third edition, including new features in ECMAScript 5, 6, and 7.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$29.99</div>
              <button className="rounded-3xl bg-black px-6 py-2 text-xl font-medium uppercase text-white">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookContainer;