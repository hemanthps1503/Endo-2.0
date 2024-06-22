import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const FrameComponent = ({ className = "", hard, title, onSolveChallengeClick, isActive, onClick }) => {
  return (
    <div 
      className={`self-stretch flex flex-row items-start justify-start relative max-w-full text-left text-sm text-gray-300 font-poppins cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className={`flex-1 rounded-2xl box-border overflow-hidden flex flex-row items-end justify-between pt-4 pb-7 pr-[30px] pl-6 max-w-full gap-[20px] border-[1px] border-solid ${isActive ? 'bg-ivory border-palegoldenrod' : 'bg-white border-palegoldenrod'} hover:bg-ivory hover:border-palegoldenrod`}>
        <div className="flex flex-row items-start justify-start gap-[72px] max-w-full text-xl text-black mq450:flex-wrap mq450:gap-[36px]">
          <div>
            <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit mq450:text-base">
              {title}
            </h3>
            <div className="text-gray-500 text-sm mt-2">
              <span className="mr-42 " style={{ color: '#838383' }}>Total Questions: 5</span>
              <span className=" text-gray-600 "  style={{ color: '#838383' }}>Total Points: 10</span>
            </div>
          </div>
        </div>
        <div className="h-12 flex flex-col items-start justify-end pt-0 px-0 pb-0.5 box-border">
          <button
            className={`cursor-pointer py-3 px-9 h-[49px] rounded-xl box-border flex flex-row items-start justify-start whitespace-nowrap border-[1.5px] border-solid ${isActive ? 'bg-gold border-gold text-gray-300' : 'bg-white border-gold text-gray-300'} hover:bg-goldenrod hover:box-border hover:border-goldenrod`}
            onClick={(e) => {
              e.stopPropagation(); // Prevents triggering the parent onClick
              onSolveChallengeClick();
            }}
          >
            <div className="relative text-base leading-[24px] font-medium font-poppins text-left inline-block min-w-[119px] whitespace-nowrap">
              Solve Challenge
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
  hard: PropTypes.string,
  title: PropTypes.string,
  onSolveChallengeClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

const Sidebar = ({ quizzes, onSolveChallengeClick, activeQuizId, onQuizClick }) => {
  return (
    <section className="flex-1 flex flex-col items-start justify-start pt-8 px-0 pb-0 box-border max-w-[calc(100%_-_332px)] text-left text-5xl text-black font-poppins mq900:max-w-full">
      <div className="self-stretch flex flex-col items-start justify-start gap-[37px] max-w-full mq675:gap-[18px]">
        <div className="self-stretch rounded-3xl bg-white overflow-hidden flex flex-row items-start justify-start pt-8 px-[38px] pb-7">
          <a className="[text-decoration:none] relative text-[inherit] mq450:text-lgi">
            Quizzes for you!
          </a>
        </div>
        <div className="w-[767px] flex flex-col items-start justify-start gap-[16px] max-w-full text-sm text-gray-300">
          {quizzes.map(quiz => (
            <FrameComponent
              key={quiz.id}
              title={quiz.title}
              hard="Hard"
              onSolveChallengeClick={() => onSolveChallengeClick(quiz.id)}
              isActive={quiz.id === activeQuizId}
              onClick={() => onQuizClick(quiz.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

Sidebar.propTypes = {
  quizzes: PropTypes.array.isRequired,
  onSolveChallengeClick: PropTypes.func.isRequired,
  activeQuizId: PropTypes.number.isRequired,
  onQuizClick: PropTypes.func.isRequired,
};

const Desktop1 = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [activeQuizId, setActiveQuizId] = useState(4); // Default to the first quiz being active
  const [showFullscreenNotification, setShowFullscreenNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/quizzes')
      .then(response => setQuizzes(response.data))
      .catch(error => console.error('Error fetching quizzes:', error));
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setShowFullscreenNotification(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
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

  const handleSolveChallengeClick = (quizId) => {
    requestFullScreen();
    navigate(`/instructions/${quizId}`);
  };

  const handleQuizClick = (quizId) => {
    setActiveQuizId(quizId);
  };

  const handleReEnterFullScreen = () => {
    setShowFullscreenNotification(false);
    requestFullScreen();
  };

  return (
    <div className="w-full relative rounded-17xl bg-ghostwhite overflow-hidden flex flex-row items-start justify-start py-0 pr-[33px] pl-0 box-border gap-[32px] leading-[normal] tracking-[normal] text-left text-21xl text-mediumslateblue font-poppins mq900:gap-[16px] mq900:pl-5 mq900:box-border">
      <div className="w-[300px] rounded-17xl bg-white overflow-hidden shrink-0 flex flex-col items-start justify-start pt-[65px] px-0 pb-[741px] box-border gap-[158px] mq450:gap-[79px] mq450:pt-[27px] mq450:pb-[313px] mq450:box-border mq900:hidden mq900:pt-[42px] mq900:pb-[482px] mq900:box-border">
        <div className="self-stretch flex flex-row items-start justify-center py-0 pr-5 pl-[27px]">
          <a className="[text-decoration:none] relative leading-[24px] capitalize font-black text-[inherit] mq450:text-5xl mq450:leading-[14px] mq900:text-13xl mq900:leading-[19px]">
            øendo
          </a>
        </div>
        <div className="w-[137.1px] flex flex-row items-start justify-between gap-[20px] text-base">
          <div className="h-9 w-1 relative rounded-tl-none rounded-tr-md rounded-br-md rounded-bl-none bg-mediumslateblue overflow-hidden shrink-0" />
          <div className="w-[87.1px] flex flex-col items-start justify-start pt-1 px-0 pb-0 box-border">
            <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
              <div className="flex flex-col items-start justify-start pt-[1.5px] px-0 pb-0">
                <div className="w-[21.1px] h-[21.1px] relative">
                  <div className="absolute top-[0px] left-[0px] rounded-tl-[4.58px] rounded-tr-[1.83px] rounded-br-none rounded-bl-[1.83px] bg-white box-border w-[9.2px] h-[9.2px] overflow-hidden border-[1.4px] border-solid border-mediumslateblue" />
                  <div className="absolute top-[11.9px] left-[0px] rounded-tl-[4.58px] rounded-tr-[1.83px] rounded-br-none rounded-bl-[1.83px] bg-white box-border w-[9.2px] h-[9.2px] overflow-hidden border-[1.4px] border-solid border-mediumslateblue" />
                  <div className="absolute top-[9.2px] left-[21.1px] rounded-tl-[4.58px] rounded-tr-[1.83px] rounded-br-none rounded-bl-[1.83px] bg-white box-border w-[9.2px] h-[9.2px] overflow-hidden [transform:_rotate(180deg)] [transform-origin:0_0] border-[1.4px] border-solid border-mediumslateblue" />
                  <div className="absolute top-[21.1px] left-[21.1px] rounded-tl-[4.58px] rounded-tr-[1.83px] rounded-br-none rounded-bl-[1.83px] bg-white box-border w-[9.2px] h-[9.2px] overflow-hidden [transform:_rotate(180deg)] [transform-origin:0_0] border-[1.4px] border-solid border-mediumslateblue" />
                </div>
              </div>
              <div className="relative leading-[24px] capitalize inline-block min-w-[42px]">
                Tests
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sidebar 
        quizzes={quizzes} 
        onSolveChallengeClick={handleSolveChallengeClick} 
        activeQuizId={activeQuizId}
        onQuizClick={handleQuizClick}
      />
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

export default Desktop1;
