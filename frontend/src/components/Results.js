import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useLocation, useNavigate } from 'react-router-dom';
import 'chart.js/auto';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctAnswers, totalQuestionsAttended, totalQuestionsAsked } = location.state || {}; // handle undefined state
  const [showFullscreenNotification, setShowFullscreenNotification] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setShowFullscreenNotification(true);
      }
    };

    const handleBeforeUnload = (event) => {
      if (!document.fullscreenElement) {
        event.preventDefault();
        event.returnValue = '';
        setShowFullscreenNotification(true);
      }
    };

    const handlePopState = (event) => {
      event.preventDefault();
      window.history.pushState(null, '', window.location.href);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    window.history.pushState(null, '', window.location.href); // Push current state to handle back button

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const requestFullScreen = () => {
    const docElm = document.documentElement;
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) { // Firefox
      docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) { // Chrome, Safari and Opera
      docElm.webkitRequestFullScreen();
    } else if (docElm.msRequestFullscreen) { // IE/Edge
      docElm.msRequestFullscreen();
    }
  };

  const handleReEnterFullScreen = () => {
    setShowFullscreenNotification(false);
    requestFullScreen();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const correctData = {
    datasets: [
      {
        data: [correctAnswers, totalQuestionsAsked - correctAnswers],
        backgroundColor: ['#60d074', '#E6E6E6'],
        hoverBackgroundColor: ['#60d074', '#E6E6E6'],
        borderWidth: 0,
        cutout: '80%',
        borderRadius: 10,
      },
    ],
  };

  const attendedData = {
    datasets: [
      {
        data: [totalQuestionsAttended, totalQuestionsAsked - totalQuestionsAttended],
        backgroundColor: ['#f58a46', '#E6E6E6'],
        hoverBackgroundColor: ['#f58a46', '#E6E6E6'],
        borderWidth: 0,
        cutout: '80%',
        borderRadius: 10,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  if (correctAnswers === undefined || totalQuestionsAttended === undefined || totalQuestionsAsked === undefined) {
    return <div>Error: Result data is missing</div>;
  }

  return (
    <div className="w-full min-h-screen bg-whitesmoke-100 flex flex-col justify-between items-center">
      <header className="w-11/12 max-w-15xl bg-white py-9 pl-14 pr-10 text-center text-gray-400 rounded-t-3xl rounded-b-3xl shadow-md mt-4 flex justify-between items-center">
        <div></div> {/* Placeholder for centering the title */}
        <div className="text-3xl font-bold"></div>
        <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200">Logout</button>
      </header>
      <main className="w-full flex flex-col items-center justify-center py-10 flex-grow">
        <div className="text-21xl font-sans font-bold text-darkgreen mb-10">Thanks for taking the test</div>
        <div className="text-5xl font-sans font-bold text-darkgreen mb-10">Your Report</div>
        <div className="w-full max-w-4xl flex flex-row justify-around">
          <div className="w-1/3 bg-white shadow-lg rounded-3xl p-6 flex flex-col items-center justify-start border border-whitesmoke-200">
            <div className="text-2xl font-sans font-bold mb-6">Questions Attended</div>
            <div className="relative w-40 h-40 text-5xl font-sans font-bold">
              <Doughnut data={attendedData} options={options} />
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">{totalQuestionsAttended}</div>
            </div>
            <div className="w-full flex flex-col mt-6 text-sm text-gray-400">
              <div className="flex flex-row items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-sm mr-2" />
                  <div className="font-sans font-bold">Total Questions Attended</div>
                </div>
                <div className="font-sans font-bold">{totalQuestionsAttended}</div>
              </div>
              <div className="w-full border-t border-gray-200 my-2" />
              <div className="flex flex-row items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded-sm mr-2" />
                  <div className="font-sans font-bold">Total Questions Asked</div>
                </div>
                <div className="font-sans font-bold">{totalQuestionsAsked}</div>
              </div>
            </div>
          </div>
          <div className="w-1/3 bg-white shadow-lg rounded-3xl p-6 flex flex-col items-center justify-start border border-whitesmoke-200">
            <div className="text-2xl font-sans font-bold mb-6">Correct Answers</div>
            <div className="relative w-40 h-40 text-5xl font-sans font-bold">
              <Doughnut data={correctData} options={options} />
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">{correctAnswers}</div>
            </div>
            <div className="w-full flex flex-col mt-6 text-sm text-gray-400">
              <div className="flex flex-row items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-sm mr-2" />
                  <div className="font-sans font-bold">Total Correct Answers</div>
                </div>
                <div className="font-sans font-bold">{correctAnswers}</div>
              </div>
              <div className="w-full border-t border-gray-200 my-2" />
              <div className="flex flex-row items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded-sm mr-2" />
                  <div className="font-sans font-bold">Total Questions Attended</div>
                </div>
                <div className="font-sans font-bold">{totalQuestionsAttended}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 text-sm text-gray-400">
        </div>
      </main>
      <footer className="w-11/12 max-w-10xl bg-white py-11 pl-14 pr-10 text-center text-gray-400 rounded-b-3xl rounded-t-3xl shadow-md mb-4">
      </footer>
      {showFullscreenNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Please enter fullscreen mode to continue the test</h2>
            <button onClick={handleReEnterFullScreen} className="bg-blue-500 text-white px-4 py-2 rounded">Go Fullscreen</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
