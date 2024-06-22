import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

// Main Component Definition
const Main = ({ className = "", onMenuToggle, onEndRoundClick, onPreviousClick, isFirstQuestion, timeLeft }) => {
  return (
    <div className={`self-stretch rounded-7xl bg-white flex flex-row items-center justify-between py-6 pr-10 pl-[11px] gap-[20px] mq450:flex-wrap ${className}`}>
      <div className="flex flex-row items-center justify-start gap-2">
        <button onClick={onPreviousClick} className="flex items-center ml-14 justify-center p-2.5 bg-transparent border-none cursor-pointer" disabled={isFirstQuestion}>
          <img className="w-[18px] h-2.5 relative" loading="lazy" alt="Previous" src="/vector-9.svg" />
        </button>
        <button onClick={onMenuToggle} className="flex items-center justify-center p-2.5 bg-transparent border-none cursor-pointer">
          <img className="w-[18px] h-2.5 relative" loading="lazy" alt="menu" src="/vector-1.svg" />
        </button>
      </div>
      <div className="flex flex-col items-center justify-start pt-2.5 px-0 pb-0">
        <span className="text-xl font-bold text-red-600">{timeLeft}</span>
      </div>
      <div className="flex flex-col items-start justify-start pt-2.5 px-0 pb-0">
        <button onClick={onEndRoundClick} className="cursor-pointer py-2.5 px-5 bg-whitesmoke-300 rounded-[9.05px] flex flex-row items-start justify-start whitespace-nowrap hover:bg-lightgray-200 border-none">
          <a className="relative text-xs leading-[18.4px] font-bold font-poppins text-gray-400 text-left inline-block min-w-[58px] whitespace-nowrap text-decoration-none">
            End round
          </a>
        </button>
      </div>
    </div>
  );
};

Main.propTypes = {
  className: PropTypes.string,
  onMenuToggle: PropTypes.func.isRequired,
  onEndRoundClick: PropTypes.func.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  isFirstQuestion: PropTypes.bool.isRequired,
  timeLeft: PropTypes.string.isRequired,
};

// Question Component Definition
const Question = ({ question, index, className = "" }) => {
  return (
    <div className={`flex flex-col items-start justify-start p-5 gap-[22px] text-left text-base text-gray-400 font-poppins ${className}`}>
      <div className="relative capitalize font-medium inline-block">
        {`Question ${index + 1}`}
      </div>
      <div className="relative text-lg capitalize font-medium inline-block">
        {question.text}
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  className: PropTypes.string,
};

// Options Component Definition
const Options = ({ options, questionId, selectedAnswer = null, onChange, className = "" }) => {
  return (
    <div className={`flex flex-col items-start justify-start p-5 gap-[22px] text-left text-base text-gray-400 font-poppins ${className}`}>
      <div className="relative capitalize font-medium inline-block">
        Select one of the following options.
      </div>
      <div className="flex flex-col items-start justify-start gap-[12px] w-full">
        {options.map(option => (
          <label key={option.id} className="cursor-pointer self-stretch rounded-11xl flex flex-row items-center justify-start p-4 gap-[12px] border-[1px] border-solid border-silver-200 w-3/4">
            <input 
              type="radio" 
              id={option.id} 
              name={questionId} 
              value={option.id} 
              checked={selectedAnswer === option.id}
              className="mr-2"
              onChange={() => onChange(questionId, option.id)} 
            />
            <span className="w-4 h-4 rounded-full border border-gray-400 flex-shrink-0"></span>
            <span className="ml-2">{option.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

Options.propTypes = {
  options: PropTypes.array.isRequired,
  questionId: PropTypes.number.isRequired,
  selectedAnswer: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

// Navigation1 Component Definition
const Navigation1 = ({ onNext, onPrevious, className = "", isLastQuestion, isFirstQuestion }) => {
  return (
    <footer className={`self-stretch rounded-7xl bg-white flex flex-row items-center justify-between p-4 gap-[20px] lg:pl-[299px] lg:pr-[23px] lg:box-border mq750:pl-[149px] mq750:box-border mq450:pl-5 mq450:box-border mq1050:flex-wrap ${className}`}>
      <div className="flex flex-row items-center justify-center flex-1">
        <button 
          onClick={onPrevious} 
          className="cursor-pointer p-4 bg-[transparent] rounded-[27.78px] flex flex-row items-center justify-center gap-[20.3px] border-[0.9px] border-solid border-silver-200"
          disabled={isFirstQuestion}
        >
          <div className="flex flex-col items-start justify-start">
            <img
              className="w-[16.7px] h-[9.3px] relative"
              alt="Previous"
              src="/vector-9.svg"
            />
          </div>
          <b className="relative text-sm inline-block font-poppins text-gray-400 text-left">
            Previous
          </b>
        </button>
      </div>
      <button onClick={onNext} className="cursor-pointer p-4 bg-whitesmoke-300 rounded-[28.21px] flex flex-row items-start justify-start gap-[12.7px] border-[0.9px] border-solid border-lightgray-100">
        <b className="relative text-sm inline-block font-poppins text-gray-400 text-left">
          {isLastQuestion ? `Finish` : `Save & Next`}
        </b>
        <div className="flex flex-col items-start justify-start">
          <img
            className="w-[16.9px] h-[9.4px] relative object-contain"
            alt="Next"
            src="/vector-10.svg"
          />
        </div>
      </button>
    </footer>
  );
};

Navigation1.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  className: PropTypes.string,
  isLastQuestion: PropTypes.bool.isRequired,
  isFirstQuestion: PropTypes.bool.isRequired,
};

// Desktop2 Component Definition
const Desktop2 = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showEndRoundNotification, setShowEndRoundNotification] = useState(false);
  const [showFullscreenNotification, setShowFullscreenNotification] = useState(false);
  const [timeLeft, setTimeLeft] = useState('05:00');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://endo-2-0.onrender.com/api/quizzes/${quizId}/questions`)
      .then(response => {
        console.log('Fetched questions:', response.data);
        setQuestions(response.data);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, [quizId]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        const [minutes, seconds] = prev.split(':').map(Number);
        if (seconds > 0) {
          return `${minutes < 10 ? '0' : ''}${minutes}:${seconds - 1 < 10 ? '0' : ''}${seconds - 1}`;
        } else if (minutes > 0) {
          return `${minutes - 1 < 10 ? '0' : ''}${minutes - 1}:59`;
        } else {
          clearInterval(countdown);
          handleSubmitEndRound(); // Ensure the current state is submitted
          return '00:00';
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

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

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigateToResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOptionChange = (questionId, optionId) => {
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: optionId
    }));
  };

  const handleEndRoundClick = () => {
    setShowEndRoundNotification(true);
  };

  const handleCancelEndRound = () => {
    setShowEndRoundNotification(false);
  };

  const handleSubmitEndRound = () => {
    navigateToResults();
  };

  const handleReEnterFullScreen = () => {
    setShowFullscreenNotification(false);
    requestFullScreen();
  };

  const navigateToResults = () => {
    const correctAnswers = questions.filter(question => {
      return selectedAnswers[question.id] === question.correct_answer_id;
    }).length;
    const totalQuestionsAttended = Object.keys(selectedAnswers).length;
    navigate('/results', {
      state: {
        questions,
        selectedAnswers,
        correctAnswers,
        totalQuestionsAttended,
        totalQuestionsAsked: questions.length
      }
    });
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestion.id];

  return (
    <div className="w-full relative rounded-12xl bg-whitesmoke-100 flex flex-col items-start justify-start pt-5 px-5 pb-[10px] box-border gap-[20px] leading-normal tracking-normal min-h-screen">
      <Main onMenuToggle={handleMenuToggle} onEndRoundClick={handleEndRoundClick} onPreviousClick={handlePreviousClick} isFirstQuestion={currentQuestionIndex === 0} timeLeft={timeLeft} />
      {isMenuOpen && (
        <div className="absolute top-32 bg-white shadow-lg rounded-lg p-4 z-10 w-64">
          <ul className="flex flex-col gap-3">
            {questions.map((question, index) => (
              <li 
                key={question.id} 
                className="cursor-pointer flex items-center py-2 px-2 border border-gray-200 rounded-lg" 
                onClick={() => {
                  setCurrentQuestionIndex(index);
                  setIsMenuOpen(false);
                }}
              >
                <div className="flex  w-8 h-8 text-lg font-bold rounded-full border border-black text-gray-400 mr-2 font-poppins">
                  {index + 1}
                </div>
                <div className="flex flex-col ml-4">
                  <span className="text-black  text-base font-bold font-poppins">{`MCQ`}</span>
                  <span className="text-gray-400 text-sm font-poppins">1 Point</span>
                </div>
                <span className={`flex-shrink-0 w-6 h-6 ml-auto rounded-full ${selectedAnswers[question.id] ? 'bg-green-600 border-black' : 'bg-red-600 border-black'}`}></span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showEndRoundNotification && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Submit the test?</h2>
            <div className="flex justify-end">
              <button onClick={handleCancelEndRound} className="bg-white-300 text-black-700 px-4 py-2 rounded mr-2">Cancel</button>
              <button onClick={handleSubmitEndRound} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
            </div>
          </div>
        </div>
      )}
      {showFullscreenNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Please enter fullscreen mode to continue the test</h2>
            <button onClick={handleReEnterFullScreen} className="bg-blue-500 text-white px-4 py-2 rounded">Go Fullscreen</button>
          </div>
        </div>
      )}
      <section className="flex-grow flex flex-row items-stretch justify-start gap-[20px] w-full text-left text-base text-gray-400 font-poppins">
        <div className="flex flex-col flex-[0_0_35%] rounded-7xl bg-white overflow-hidden p-5 box-border">
          <Question question={currentQuestion} index={currentQuestionIndex} />
        </div>
        <div className="flex flex-col flex-1 rounded-7xl bg-white overflow-hidden p-5 box-border">
          <Options options={currentQuestion.options} questionId={currentQuestion.id} selectedAnswer={selectedAnswer} onChange={handleOptionChange} />
        </div>
      </section>
      <Navigation1 
        onNext={handleNext} 
        onPrevious={handlePrevious} 
        isLastQuestion={currentQuestionIndex === questions.length - 1}
        isFirstQuestion={currentQuestionIndex === 0}
      />
    </div>
  );
};

export default Desktop2;
