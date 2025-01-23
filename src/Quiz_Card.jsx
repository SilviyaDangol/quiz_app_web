import React, { useState } from 'react';
import { BookOpen, ArrowLeft, ArrowRight, Eye, Check, X } from 'lucide-react';

const quizData = [
    {
        question: "What is the capital of France?",
        answer: "Paris",
        category: "Geography",
        hint: "Known as the City of Light"
    },
    {
        question: "Who painted the Mona Lisa?",
        answer: "Leonardo da Vinci",
        category: "Art",
        hint: "A Renaissance master from Italy"
    },
    {
        question: "What is the largest planet in our solar system?",
        answer: "Jupiter",
        category: "Science",
        hint: "A gas giant with a great red spot"
    },
    {
        question: "In what year did World War II end?",
        answer: "1945",
        category: "History",
        hint: "The year the Allies defeated the Axis powers"
    }
];

const QuizCard = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [answerStatus, setAnswerStatus] = useState(null);

    const handlePrevious = (e) => {
        e.stopPropagation();
        setCurrentQuestionIndex((prev) =>
            prev > 0 ? prev - 1 : quizData.length - 1
        );
        resetQuestionState();
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentQuestionIndex((prev) =>
            (prev + 1) % quizData.length
        );
        resetQuestionState();
    };

    const resetQuestionState = () => {
        setShowAnswer(false);
        setShowHint(false);
        setUserAnswer('');
        setAnswerStatus(null);
    };

    const checkAnswer = () => {
        const currentQuestion = quizData[currentQuestionIndex];
        const cleanUserAnswer = userAnswer.trim().toLowerCase();
        const cleanCorrectAnswer = currentQuestion.answer.trim().toLowerCase();

        if (cleanUserAnswer === cleanCorrectAnswer) {
            setAnswerStatus('correct');
        } else {
            setAnswerStatus('incorrect');
        }
    };

    const currentQuestion = quizData[currentQuestionIndex];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div
                className={`card w-[800px] min-h-[600px] shadow-2xl rounded-2xl overflow-hidden transition-colors duration-300 ease-in-out ${
                    answerStatus === 'correct'
                        ? 'bg-green-50'
                        : answerStatus === 'incorrect'
                            ? 'bg-red-50'
                            : 'bg-white'
                }`}
            >
                <div className="card-body flex flex-col justify-between">
                    {/* Navigation Section */}
                    <div className="flex justify-between items-center mb-6">
                        <button
                            className="btn btn-circle btn-outline hover:bg-blue-50 transition-colors"
                            onClick={handlePrevious}
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>

                        <div className="flex items-center space-x-2">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            <span className="text-sm text-gray-600">
                {currentQuestion.category}
              </span>
                            <span className="text-sm text-gray-400">
                {currentQuestionIndex + 1} / {quizData.length}
              </span>
                        </div>

                        <button
                            className="btn btn-circle btn-outline hover:bg-blue-50 transition-colors"
                            onClick={handleNext}
                        >
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Question Section */}
                    <div className="flex-grow flex flex-col justify-center items-center text-center px-8">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                {currentQuestion.question}
                            </h2>
                        </div>

                        {/* Answer Input Section */}
                        <div className="w-full mb-4 relative">
                            <input
                                type="text"
                                placeholder="Type your answer here"
                                value={userAnswer}
                                onChange={(e) => {
                                    setUserAnswer(e.target.value);
                                    setAnswerStatus(null);
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        checkAnswer();
                                    }
                                }}
                                className={`input w-full p-4 bg-gray-100 border ${
                                    answerStatus === 'correct'
                                        ? 'border-green-300 focus:border-green-500'
                                        : answerStatus === 'incorrect'
                                            ? 'border-red-300 focus:border-red-500'
                                            : 'border-gray-300 focus:border-blue-500'
                                } transition-colors duration-200`}
                            />
                            {answerStatus === 'correct' && (
                                <Check
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 w-6 h-6"
                                />
                            )}
                            {answerStatus === 'incorrect' && (
                                <X
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 w-6 h-6"
                                />
                            )}
                        </div>

                        {/* Hint Section */}
                        {showHint && !showAnswer && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4 w-full">
                                <p className="text-yellow-700 italic">
                                    Hint: {currentQuestion.hint}
                                </p>
                            </div>
                        )}

                        {/* Answer Reveal Section */}
                        {showAnswer && (
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 w-full">
                                <p className="text-green-700 font-semibold text-xl">
                                    {currentQuestion.answer}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4 mt-6">
                        <button
                            className="btn btn-ghost text-blue-600 hover:bg-blue-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowHint(!showHint);
                                setShowAnswer(false);
                            }}
                        >
                            <Eye className="w-5 h-5 mr-2" />
                            {showHint ? 'Hide Hint' : 'Show Hint'}
                        </button>
                        <button
                            className="btn btn-ghost text-green-600 hover:bg-green-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowAnswer(true);
                                setShowHint(false);
                            }}
                        >
                            Reveal Answer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizCard;