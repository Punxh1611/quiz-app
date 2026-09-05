import { useState, useContext } from "react";
import QuestionsData from "../data/QuestionsData";
import { DataContext } from "../App";

const Quiz = () => {
    const [current, setCurrent] = useState(0)
    const [answers, setAnswers] = useState(Array(QuestionsData.length).fill(""))
    const { setScore, setAppState } = useContext(DataContext)

    const selectAnswer = (choice) => {
        const newAnswers = [...answers]
        newAnswers[current] = choice
        setAnswers(newAnswers)
    }

    const calculateScore = () => {
        let total = 0
        for (let i = 0; i < QuestionsData.length; i++) {
            if (answers[i] === QuestionsData[i].answer) {
                total = total + 1
            }
        }
        setScore(total)
    }

    const nextQuestion = () => {
        if (current === QuestionsData.length - 1) {
            calculateScore()
            setAppState("score")
        } else {
            setCurrent(current + 1)
        }
    }

    const prevQuestion = () => {
        if (current > 0) {
            setCurrent(current - 1)
        }
    }

    return (
        <div className="quiz">
            <h1>{QuestionsData[current].question}</h1>
            <div className="choices">
                <button
                    className={answers[current] === "A" ? "selected" : ""}
                    onClick={() => selectAnswer("A")}
                >
                    {QuestionsData[current].A}
                </button>
                <button
                    className={answers[current] === "B" ? "selected" : ""}
                    onClick={() => selectAnswer("B")}
                >
                    {QuestionsData[current].B}
                </button>
                <button
                    className={answers[current] === "C" ? "selected" : ""}
                    onClick={() => selectAnswer("C")}
                >
                    {QuestionsData[current].C}
                </button>
                <button
                    className={answers[current] === "D" ? "selected" : ""}
                    onClick={() => selectAnswer("D")}
                >
                    {QuestionsData[current].D}
                </button>
                <div className="navigation">
                    <button onClick={prevQuestion}>ย้อนกลับ </button>
                    <button onClick={nextQuestion}>ถัดไป</button>
                </div>
            </div>
            <p>{`${current + 1} / ${QuestionsData.length}`}</p>

        </div>
    )
}

export default Quiz;