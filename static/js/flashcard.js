// Wait for the HTML to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {

    const flashForward = document.querySelector(".flashForward");
    const flashBackward = document.querySelector(".flashBack");
    const flashContent = document.querySelector("#flashContent");
    const exportCard = document.querySelector("#exportCard");
    const fileInput = document.querySelector("#file-upload-input");
    //the number is the key and the value is an anonymous object literal so to access something it would be myFlashDictionary.1.question which returns
    //What are the disadvantages to wireless connection?
    const myFlashDictionary = new Map();
    myFlashDictionary.set(1, {
        question: "What are disadvantages to wireless connection?",
        answer: "Less range, less secure, licensing issues, and potential interference."
    });

    myFlashDictionary.set(2, {
        question: "What is Object-Oriented Programming (OOP)?",
        answer: "A programming paradigm based on the concept of 'objects', which can contain data and code."
    });

    flashContent.textContent = myFlashDictionary.get(1).question;
    let currentCardId = 1;
    let isShowingQuestion = true;

    //Import and export

    async function exportCardFunc(){
        try {
            const jsonObject =  Object.fromEntries(myFlashDictionary);
            const jsonString = JSON.stringify(jsonObject);
            const response = await fetch('/exportCard', {
                method: 'POST',
                headers: {
                    //This is telling the backend what format the data is in. Since I declared the format a json
                    //Flask is expecting a json format so flask with decide how to parse that format
                    //Flask will turn this json into a python dictionary.
                    'Content-Type': 'application/json'
                },
                body: jsonString
            });
            // response is waiting for a response  from the backend which is a JSON string b/c you can only
            //send text between frontend and backend with html. The .json() is parsing the json string into javscript object
            //.json() will turn an json format into a javacsript object

            const result = await response.json();
            console.log(JSON.stringify(result));
            alert("You have exported your flashcards!")
        } catch (error) {
            console.log("sad");
        }
    }

    async function importCardFunc() {
        const file = fileInput.files[0];
        if (!file) {
            return alert("Please select a file!");
        }
        try {
            const importText = await file.text();
            const jsonToObject  = JSON.parse(importText);
            const objectToArray = Object.entries(jsonToObject);
            // Object.entries returns:
            // [
            //   ["1", {question: "What is OOP?", answer: "..."}],
            //   ["2", {question: "What is JSON?", answer: "..."}]
            // ]
            myFlashDictionary.clear();
            for(const [key, value] of objectToArray) {
                myFlashDictionary.set(parseInt(key), value)
            }
            currentCardId = 1;
            flashContent.textContent = myFlashDictionary.get(1).question;
            isShowingQuestion = true;
            alert("Import was successful")
        } catch {
            alert("Failed to import")
        }
    }


  // Basic flashcard logic, flip, next, and back

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


    //Button click logic
    if (flashContent) {
        flashContent.addEventListener("click", flipCard);
    }
    if (flashForward) {
        flashForward.addEventListener("click", nextCard);
    }
    if (flashBackward) {
        flashBackward.addEventListener("click", prevCard);
    }

    if (exportCard) {
        exportCard.addEventListener("click", exportCardFunc);
    }
    if(fileInput) {
        fileInput.addEventListener("change", importCardFunc);
    }

});


