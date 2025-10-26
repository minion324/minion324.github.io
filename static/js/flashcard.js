// Wait for the HTML to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {


    const flashForward = document.querySelector(".flashForward");
    const flashBackward = document.querySelector(".flashBack");
    const flashContent = document.querySelector("#flashContent");


    const myFlashDictionary = new Map();
    myFlashDictionary.set(1, {
        question: "What are disadvantages to wireless connection?",
        answer: "Less range, less secure, licensing issues, and potential interference."
    });
    myFlashDictionary.set(2, {
        question: "What is Object-Oriented Programming (OOP)?",
        answer: "A programming paradigm based on the concept of 'objects', which can contain data and code."
    });

    let currentCardId = 1;
    let isShowingQuestion = true;

    // 3. Initialize the first card's content

    flashContent.textContent = myFlashDictionary.get(currentCardId).question;


    // 4. This function flips the current card
    function flipCard() {
        const card = myFlashDictionary.get(currentCardId);
        
        if (isShowingQuestion) {
            flashContent.textContent = card.answer;
            isShowingQuestion = false;
        } else {
            flashContent.textContent = card.question;
            isShowingQuestion = true;
        }
    }

    // 5. This function moves to the next card
    function nextCard() {
        currentCardId++;
        if (currentCardId > myFlashDictionary.size) {
            currentCardId = 1; // Loop back to the first card
        }
        // Show the question for the new card
        flashContent.textContent = myFlashDictionary.get(currentCardId).question;
        isShowingQuestion = true;
    }

    // 6. This function moves to the previous card
    function prevCard() {
        currentCardId--;
        if (currentCardId < 1) {
            currentCardId = myFlashDictionary.size; // Loop to the last card
        }
        // Show the question for the new card
        flashContent.textContent = myFlashDictionary.get(currentCardId).question;
        isShowingQuestion = true;
    }


    if (flashContent) {
        flashContent.addEventListener("click", flipCard);
    }
    if (flashForward) {
        flashForward.addEventListener("click", nextCard);
    }
    if (flashBackward) {
        flashBackward.addEventListener("click", prevCard);
    }

});