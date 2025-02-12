export function generateData(DBData = [], switchState = 'Timestamp') {
    const chartData = [];
    const cData = {};
    const tableData = [];

    if (DBData.length === 0) {
        for (let i = 1; i <= getRandomInt(5, 25); i++) {
            for (let ii = 1; ii <= getRandomInt(5, 35); ii++) {
                DBData.push(generateObject('Student_' + i));
            }
        }
    }
    DBData.forEach((entry) => {
        const { Student_Name, Question_Id, Event_Timestamp, Test, Correct } = entry;
        let test = Number(Test);
        let correct = Number(Correct);
        let Label =
            !test && correct
                ? 'Correct'
                : test && correct
                ? 'Correct-Test'
                : test && !correct
                ? 'Incorrect-Test'
                : 'Incorrect';

        if (!cData[Label]) cData[Label] = [];

        cData[Label].unshift({
            x: switchState === 'Timestamp' ? new Date(Event_Timestamp) : Question_Id,
            y: Student_Name,
        });
        tableData.push({ ...entry });
    });

    Object.keys(cData).forEach((key, index) => {
        chartData[index] = {
            id: key,
            data: cData[key],
        };
    });

    return { chartData, tableData };
}

function generateObject(Student_Name) {
    const Test = Math.random() < 0.5 ? '1' : '0';
    const Correct = Math.random() < 0.4 ? '1' : '0';
    let question_random = Math.random();
    const Question_Id =
        question_random < 0.3
            ? 'Question 1.1'
            : question_random < 0.6
            ? 'Question 2.2'
            : question_random < 0.8
            ? 'Question 2.5'
            : 'Question 3.0';
    return {
        Student_Name,
        Question_Id,
        Event_Timestamp: generateRandomTimestamp(),
        Test,
        Correct,
    };
}
function generateRandomTimestamp() {
    const date = new Date();
    date.setHours(getRandomInt(0, 23), getRandomInt(0, 59), getRandomInt(0, 59), 0);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
