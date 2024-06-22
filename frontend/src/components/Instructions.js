import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Instructions = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();

  const handleStartTest = () => {
    navigate(`/desktop-2/${quizId}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 font-serif">
          Test Instructions
        </h2>
        <ul className="list-disc list-inside mb-6 text-gray-700 font-sans leading-loose">
          <li>The test consists of five questions, each carrying <strong>1 point.</strong></li>
          <li>The total duration of the test is <strong> 5 minutes.</strong> </li>
          <li>After finishing the test, it will automatically submit.</li>
          <li>
            You can check the stats of the questions answered and unanswered on
            the left side of the menu. <strong>Green color</strong> means answered and <strong>red color </strong>
            means unanswered.
          </li>

          <li>
            Do not take help from external resources like mobile phones or
            communication devices.
          </li>
          <li>Read each question carefully and select the best answer.</li>
          <li>
            Make sure you are in a quiet environment to avoid distractions.
          </li>
          <li>
            <strong>You should take the test in full-screen mode.</strong>
          </li>
          <li>
            <strong>Do not switch tabs during the test.</strong>
          </li>
          <li>
            <strong>
              Please click the <strong>finish button </strong> before the timer ends to ensure
              your answers are submitted.
            </strong>
          </li>
        </ul>
        <button
          onClick={handleStartTest}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-sans"
        >
          Start Test
        </button>
      </div>
    </div>
  );
};

export default Instructions;
