import React, { useState } from 'react';
import { usePokemonContext } from './PokemonContext'; // Update path if necessary
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const NftCarousel: React.FC = () => {
  const { stages } = usePokemonContext();
  const [currentStage, setCurrentStage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  if (!stages || stages.length === 0) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg h-[800px] flex flex-col items-center justify-center text-white shadow-lg border-2 border-green-500">
        <h2 className="text-3xl font-pixel mb-6 text-green-300 text-center">
          Pokémon Carousel
        </h2>
        <p className="text-center mb-4 font-pixel text-xl leading-relaxed">
          It is always better to know your Pokémon before taking a step to buy them.
        </p>
        <p className="text-center font-pixel text-xl leading-relaxed">
          Choose a Pokémon and click on the <span className="text-yellow-400">"Know More"</span> button to get the details of that respective Pokémon, stage-wise.
        </p>
      </div>
    );
  }

  const handlePrevious = () => {
    setCurrentStage((prevStage) => (prevStage > 0 ? prevStage - 1 : stages.length - 1));
  };

  const handleNext = () => {
    setCurrentStage((prevStage) => (prevStage < stages.length - 1 ? prevStage + 1 : 0));
  };

  const stage = stages[currentStage];

  const handleBuyClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProceed = () => {
    setIsModalOpen(false);
    navigate('/myprofile'); // Navigate to Myprofile.tsx
  };

  return (
    <div className="p-2 bg-gray-800 bg-opacity-80 rounded-lg h-[800px] flex flex-col items-center">
      {/* Stage Indicator */}
      <h2 className="text-2xl font-pixel mb-3 text-green-300 text-center">
        Stage {stage.stage}
      </h2>

      {/* Image Section */}
      <div className="w-56 h-56 bg-gray-900 mb-9 flex items-center justify-center relative overflow-hidden rounded-md">
        <img
          src={stage.image}
          alt={`Stage ${stage.stage}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name and Short Description */}
      <h3 className="text-lg font-pixel font-semibold text-white mb-1.5 text-center">{stage.name}</h3>

      {/* Long Description */}
      <div className="p-4 rounded-lg mb-4">
        <h4 className="text-md font-pixel font-semibold text-green-300 mb-2 text-center">Detailed Description</h4>
        <ul className="list-disc list-inside text-gray-300 font-pixel text-sm">
          {stage.longDescription.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mb-2 w-full px-1">
        <button
          onClick={handlePrevious}
          disabled={currentStage === 0}
          className={`w-2.5/5 py-2 ${currentStage === 0 ? 'bg-blue-950 cursor-not-allowed' : 'bg-blue-950 hover:bg-gray-900'} font-pixel text-white rounded-lg transition`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStage === stages.length - 1}
          className={`w-2/5 py-2 ${currentStage === stages.length - 1 ? 'bg-blue-950 cursor-not-allowed' : 'bg-blue-950 hover:bg-gray-900'} font-pixel text-white rounded-lg transition`}
        >
          Next
        </button>
      </div>

      {/* Buy Button */}
      <button
        onClick={handleBuyClick}
        className="w-full py-2 bg-green-600 text-white rounded-lg font-pixel font-bold hover:bg-green-500 transition"
      >
        BUY NFT
      </button>

      {/* Modal for Buy NFT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full relative">
            {/* Close Icon */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-2xl font-pixel mb-4 text-green-300 text-center">
              Buy {stage.name} (Stage 1)
            </h2>
            <div className="flex items-center justify-center mb-4">
              <img
                src={stages[0].image} // Stage 1 image
                alt="Stage 1 Pokémon"
                className="w-52 h-52 object-cover rounded-sm"
              />
            </div>
            <p className="text-yellow-400 text-center font-pixel mb-2">
              When you purchase this card, you will start with Stage 1.
            </p>
            <p className="text-white text-center font-pixel mb-4">
              Price: {stages[0].price} Apt
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleProceed} // Navigate to Myprofile.tsx
                className="w-full py-2 bg-green-600 text-white rounded-lg font-pixel font-bold hover:bg-green-500 transition"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NftCarousel;
