let siteData;
let checkbox;

fetch(
  "https://my-json-server.typicode.com/ArberTu474/quiz-questions-db/questions"
)
  .then((res) => res.json())
  .then((data) => {
    siteData = data;
    renderQuestions(data);
  });

//takes the fetched data and stores it to a variable
//setTimeout(() => console.log(siteData), 3000);

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
    const questionAlternatives = document.createElement("div");
    questionAlternatives.name = "alternatives";

    const alternativesContainer = document.createElement("div");
    alternativesContainer.classList.add("alternatives");
    questionAlternatives.append(alternativesContainer);

    for (let i = 0; i < question.alternatives.length; i++) {
      const alternative = document.createElement("div");
      alternative.classList.add("alternative");

      const input = document.createElement("input");
      input.classList.add(`checkbox${index + 1}`);
      input.name = `checkbox${index + 1}`;
      input.classList.add("checkbox");
      input.setAttribute("type", "radio");
      questionContainer.append(questionAlternatives);

      const label = document.createElement("label");
      label.classList.add("option");
      label.classList.add("alternative-name");
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
  if (confirm(confirmationText) === true) {
    nameValidation();
  } else return;
}

function nameValidation() {
  const uName = document.querySelector("[data-uname]");
  const surname = document.querySelector("[data-surname]");

  if (uName.value.trim() === "" && surname.value.trim() === "") {
    indicatorHandler(
      errorP,
      errorContainer,
      "Vendosni emrin dhe mbiemrin",
      "block",
      "error-container",
      "error",
      credentionalsContainer
    );
  } else if (uName.value.trim() === "") {
    indicatorHandler(
      errorP,
      errorContainer,
      "Vendosni emrin",
      "block",
      "error-container",
      "error",
      credentionalsContainer
    );
  } else if (surname.value.trim() === "") {
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
  for (let i = 0; i < siteData.length; i++) {
    checkbox = document.getElementsByClassName(`checkbox${i + 1}`);

    let questionIndex = i;

    for (let i = 0; i < siteData[questionIndex].alternatives.length; i++) {
      //checks if the correct alternative is not checked and if an other alternative is checked and mrks the wrong alternative
      if (
        checkbox[i].checked === true &&
        checkbox[siteData[questionIndex].answer - 1].checked === false
      ) {
        checkbox[i].parentNode.classList.add("wrong-alternative");
        //checks if the correct alternative is checked and marks it as correct
      } else if (
        checkbox[siteData[questionIndex].answer - 1].checked === true
      ) {
        checkbox[siteData[questionIndex].answer - 1].parentNode.classList.add(
          "correct-alternative"
        );
        //checks if the correct alternative is not checked and tells the user the correct alterantive by highliting it
      } else if (
        checkbox[siteData[questionIndex].answer - 1].checked === false
      ) {
        checkbox[siteData[questionIndex].answer - 1].parentNode.classList.add(
          "correct-alternative"
        );
      }
    }
  }
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
