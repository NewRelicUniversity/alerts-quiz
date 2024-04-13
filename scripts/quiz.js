const quizData = [
    {
        question: 'You are creating an alert condition to monitor CPU usage reported by the New Relic Infrastructure agent. Which aggregation method should you choose?',
        options: ['Event Timer', 'Cadence', 'Event Flow', 'Loss of Signal']
    },
    {
        question: 'You have created an alert condition based on the following query: <p style="margin: 1pt 0 1pt 0"><code>SELECT count(*) FROM Transaction WHERE error IS true</code></p> Which aggregation method will likely work best?',
        options: ['Event Timer', 'Cadence', 'Event Flow', 'Loss of Signal']
    },
    {
        question: 'You have created an alert condition based on the following query: <p style="margin: 1pt 0 1pt 0"><code>SELECT count(*) FROM Transaction WHERE error IS true</code></p> The condition correctly creates an incident when an error occurs, but the incident doesn&rsquo;t close when there are no errors. Which alerts option is likely misconfigured?',
        options: ['Event Timer', 'Cadence', 'Event Flow', 'Loss of Signal']
    },
    {
        question: 'You want to be notified if a daily batch process fails to run. Which alerts option should you use?',
        options: ['Event Timer', 'Cadence', 'Event Flow', 'Loss of Signal']
    },
    {
        question: 'Your application is deployed in an auto-scaling environment. When a new container starts up, the application runs slowly for the first few minutes. Which alerts option can you use to avoid false positive incidents?',
        options: ['Cadence Aggregation', 'Gap Filling', 'Loss of Signal', 'Evaluation Delay']
    }
];

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');

let currentQuestion = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);    
    submitButton.style.fontWeight = 'normal';
    submitButton.setAttribute('disabled', 'disabled');
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        newrelic.addPageAction('questionAnswered', { questionId: currentQuestion, answer: answer });

        currentQuestion++;
        if (currentQuestion < quizData.length) {
            selectedOption.checked = false;
            displayQuestion();
        }
        if (currentQuestion == quizData.length - 1) {
            submitButton.textContent = 'Submit';
        }
        if (currentQuestion == quizData.length) {
            submitButton.hidden = true;
        }        
    }
}

function toggleSubmit() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        submitButton.removeAttribute('disabled');
        submitButton.style.fontWeight = 'bold';
    }
}

quizContainer.addEventListener('click', toggleSubmit);
submitButton.addEventListener('click', nextQuestion);
displayQuestion();