import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import styles from './HomePage.module.css'
import Logo from '../assets/Logo.png'
import Button from './Button';
import TakeQuiz from '../TakeQuiz/TakeQuiz';
import Form from '../Form/Form';

function HomePage() {

    const [quizData, setQuizData] = useState([]);
    const [quizTaker, setQuizTaker] = useState('');
    const [showQuiz, setShowQuiz] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [timeLimit, setTimeLimit] = useState(0);
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);

            setQuizData(jsonData);
            console.log('Uploaded Quiz Data:', jsonData);
            alert('✅ Quiz upload successful! You may proceed to take a Quiz');
        };

        reader.readAsArrayBuffer(file);
    };


    const handleTakeQuiz = () => {
        if (quizData.length === 0) {
            alert('Please upload a quiz file first!');
            return;
        }
        setShowForm(true);
    };

    const handleStartQuiz = (name, time) => {
        setQuizTaker(name);
        setTimeLimit(time);
        setShowForm(false);
        setShowQuiz(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    if (showQuiz) {
        return (
            <TakeQuiz
                quizTaker={quizTaker}
                uploadedQuizData={quizData}
                timeLimit={timeLimit}
                onRestart={() => {
                setShowQuiz(false);
                setQuizTaker('');
                setQuizData([]);
                setTimeLimit(0);
            }}
            />
        );
    }



    return (
        <>
            <div className={styles.homepage}>
                <img src={Logo} alt="Logo" />
                <div className={styles.content}>
                    <h1>Welcome to Quiz.COM</h1>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                />

                <Button name="Uplaod Quiz" onClick={handleUploadClick} />
                <Button name="Take Quiz" onClick={handleTakeQuiz} />

                {showForm && <Form onStart={handleStartQuiz} onClose={handleCloseForm} />}

                {/* {quizData.length > 0 && (
                    <pre>{JSON.stringify(quizData, null, 2)}</pre>
                )} */}
            </div>
        </>
    );
}

export default HomePage