let siteData;

fetch(
  "https://my-json-server.typicode.com/ArberTu474/quiz-questions-db/questions"
)
  .then((res) => res.json())
  .then((data) => {
    siteData = data;
    renderQuestions(data);
  });

//takes the fetched data and stores it to a variable
setTimeout(() => console.log(siteData), 3000);

function renderQuestions(data) {
  const questionsWrapper = document.querySelector("#questions-wrapper");

  data.forEach(function callback(question, index) {
    //question container
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("question-container");

    //question title
    const questionTitle = document.createElement("h2");
    questionTitle.classList.add("question");
    questionTitle.textContent = question.question;
    questionContainer.append(questionTitle);

    //question img
    if (question.img !== "") {
      const questionImg = document.createElement("div");
      questionImg.classList.add("img");
      questionImg.style.backgroundImage = `url("${question.img}")`;
      questionContainer.append(questionImg);
    } else if (question.img === "") {
      questionTitle.classList.add("no-img-question");
    }

    //question alternatives
    const questionAlternatives = document.createElement("form");
    questionAlternatives.name = "alternatives";

    const alternativesContainer = document.createElement("div");
    alternativesContainer.classList.add("alternatives");
    questionAlternatives.append(alternativesContainer);

    for (let i = 0; i < question.alternatives.length; i++) {
      const alternative = document.createElement("div");
      alternative.classList.add("alternative");

      const input = document.createElement("input");
      input.classList.add(`checkbox${index + 1}`);
      input.classList.add("checkbox");
      input.setAttribute("type", "checkbox");
      input.name = "check1";
      input.setAttribute("data-check1", "");
      questionContainer.append(questionAlternatives);

      const label = document.createElement("label");
      label.classList.add("option");
      label.classList.add("alternative-name");
      label.setAttribute("for", "check1");
      label.innerHTML = question.alternatives[i];
      alternativesContainer.append(alternative);
      alternative.append(input);
      alternative.append(label);
    }

    //puts verything inide the main container
    questionsWrapper.append(questionContainer);
  });
}

const credentionalsContainer = document.querySelector("[data-credentionals]");
const questionsContainer = document.querySelector("[data-questions-container]");

const errorP = document.querySelector("[data-error]");
const errorContainer = document.querySelector("[data-error-container]");

const answerP = document.querySelector("[data-correct]");
const answerContainer = document.querySelector("[data-correct-container]");

function submit() {
  const confirmationText = "A doni të bëni Submit formularin?";
  if (confirm(confirmationText) == true) {
    nameValidation();
  } else return;
}

function nameValidation() {
  const uname = document.querySelector("[data-uname]");
  const email = document.querySelector("[data-email]");

  if (uname.value.trim() === "" && email.value.trim() === "") {
    indicatorHandler(
      errorP,
      errorContainer,
      "Vendosni emrin dhe mbiemrin",
      "block",
      "error-container",
      "error",
      credentionalsContainer
    );
  } else if (uname.value.trim() === "") {
    indicatorHandler(
      errorP,
      errorContainer,
      "Vendosni emrin",
      "block",
      "error-container",
      "error",
      credentionalsContainer
    );
  } else if (email.value.trim() === "") {
    indicatorHandler(
      errorP,
      errorContainer,
      "Vendosni mbiemrin",
      "block",
      "error-container",
      "error",
      credentionalsContainer
    );
  } else {
    indicatorHandler(
      errorP,
      errorContainer,
      "",
      "none",
      "error-container",
      "error",
      credentionalsContainer
    );
    alternativesValidation();
  }
}

function alternativesValidation() {
  const al1 = document.querySelector("[data-check1]");
  const al2 = document.querySelector("[data-check2]");
  const al3 = document.querySelector("[data-check3]");
  const al4 = document.querySelector("[data-check4]");
  const al5 = document.querySelector("[data-check5]");

  for (let i = 0; i < siteData.length; i++) {
    const checkbox = document.getElementsByClassName(`checkbox${i + 1}`);

    const alternatives = document.getElementsByClassName("alternatives");
    let questionIndex = i;

    for (let i = 0; i < siteData[questionIndex].alternatives.length; i++) {
      if (
        checkbox[siteData[questionIndex].answer - 1].checked == true &&
        checkbox[i].checked == true
      ) {
        console.log(`question ${i + 1} is correct`);
      } else {
        console.log(`question ${i + 1} is wrong`);
      }
    }
    console.log("----------------------------");
  }

  // for (let i = 0; i < 4; i++) {
  //   if (checkbox[siteData[i].answer - 1].checked == true) {
  //     console.log(checkbox[siteData[i].answer - 1]);
  //     console.log(`question ${i + 1} is correct`);
  //   } else {
  //     console.log(`question ${i + 1} is wrong`);
  //   }
  // }

  // indicatorHandler(
  //   answerP,
  //   answerContainer,
  //   "SAKTË!",
  //   "block",
  //   "correct-container",
  //   "correct",
  //   questionsContainer
  // );
  // indicatorHandler(
  //   answerP,
  //   answerContainer,
  //   "Përgjigja juaj nuk është e skatë!",
  //   "block",
  //   "wrong-container",
  //   "error",
  //   questionsContainer
  // );
}

function indicatorHandler(
  targetP,
  targetC,
  indicatorText,
  display,
  containerStatus,
  status,
  focus
) {
  targetP.textContent = indicatorText;
  targetP.className = status;
  targetC.style.display = display;
  targetC.className = containerStatus;
  focusDiv(focus);
}

function focusDiv(focusElement) {
  focusElement.scrollIntoView({ behavior: "smooth" });
}

function reset() {
  const confirmationText = "A doni të bëni Cancel formularin?";
  if (confirm(confirmationText) == true) {
    location.reload();
  }
}
