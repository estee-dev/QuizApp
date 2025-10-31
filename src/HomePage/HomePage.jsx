import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import styles from './HomePage.module.css'
import Logo from '../assets/Logo.png'
import Button from './Button';
import TakeQuiz from '../TakeQuiz/TakeQuiz';

function HomePage() {

    const [quizData, setQuizData] = useState([]);
    const [quizTaker, setQuizTaker] = useState('');
    const [showQuiz, setShowQuiz] = useState(false);
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
        };

        reader.readAsArrayBuffer(file);
    };


    const handleTakeQuiz = () => {
        const name = prompt('Enter your name to start the quiz:');
        if (name && name.trim() !== '') {
            setQuizTaker(name.trim());
            setShowQuiz(true);
        } else {
            alert('Name is required to take the quiz.');
        }
    };

    if (showQuiz) {
        return <TakeQuiz quizTaker={quizTaker} uploadedQuizData={quizData} />;
    }


    return (
        <>
            <body className={styles.body}>
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

                {/* {quizData.length > 0 && (
                    <pre>{JSON.stringify(quizData, null, 2)}</pre>
                )} */}
            </body>
        </>
    );
}

export default HomePage