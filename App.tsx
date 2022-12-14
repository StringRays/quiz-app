import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard'
import { fetchQuizQuestions } from './API'
//import logo from './logo.svg';
//import './App.css';
import { QuestionState, Difficulty } from './API'
import { GlobalStyle, Wrapper } from './App.styles'

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [level, setLevel] = useState(Difficulty.EASY);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);



  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      level
      //Difficulty.EASY
      );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false)
  };
//passed in as props from Question Card
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if(correct) setScore(prev => prev+1)

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  };

  const nextQuestion = () => {
    const next = number + 1;
    if(next === TOTAL_QUESTIONS){
      setGameOver(true)
    } else {
      setNumber(next)
    }
  };

  const changeDifficulty = () => {
    setLevel(prev => 
      prev === "easy" ? Difficulty.MEDIUM : prev === "medium" ? Difficulty.HARD : Difficulty.EASY
    )
  }

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <>
      <button className="changeLevel" onClick={changeDifficulty}>Difficulty: {level}</button>
      <button className="start" onClick={startQuiz}>Start Quiz</button>
        </>
      ) : null}
      {!gameOver ? <p className="score">Score: {score}/{TOTAL_QUESTIONS} Current Level: {level}</p> : null}
      {loading && <p>Loading questions...</p>}
      {!loading && !gameOver && (
      <QuestionCard 
        questionNumber={number+1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
        />
        )}
      {!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
      <button className="next" onClick={nextQuestion}>Next Question</button> 
      ) : null}
    </Wrapper>
    </>
  );
}

export default App;
