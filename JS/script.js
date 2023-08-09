const wordText=document.querySelector(".word"),
hintText=document.querySelector(".hint span"),
inputField=document.querySelector("input"),
timeText=document.querySelector(".time b"),
refreshBnt=document.querySelector(".refresh-word"),
checkBtn=document.querySelector(".check-word");



let correctWord,timer;




const initTimer = maxTime => {
    clearInterval(timer);
     timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText=maxTime;
           
        } else {
            clearInterval(timer);
            alert(`Maalesef, zamanınız doldu. Doğru kelime: ${correctWord}`);
            initGame();
        }
    }, 1000);
};




const initGame=()=>{
    initTimer(30)
    let randomObj=kelimeler[Math.floor(Math.random()*kelimeler.length)];          
    let wordArray=randomObj.kelime.split("");
    for(let i=wordArray.length-1;i>0;i--){
        let j=Math.floor(Math.random() * (i+1));
        [wordArray[i],wordArray[j]]=[wordArray[j],wordArray[i]];
    }

   wordText.innerText=wordArray.join("");
   if (wordArray.length > 8){
    wordText.style.fontSize = "15px";
   
   }
   else if(wordArray.length > 12){
    wordText.style.fontSize = "10px";
   }
   hintText.innerText=randomObj.ipucu;
   correctWord=randomObj.kelime.toLowerCase();
   inputField.value="";
   inputField.setAttribute("maxlength",correctWord.length);
}



initGame();

const checkWord=()=>{
    let userWord=inputField.value.toLocaleLowerCase();
    if(!userWord) return alert(`Lütfen bir kelime girin!`);
    

    if(userWord!==correctWord) return  alert (`Maalesef, ${userWord} yanlış, Tekrar deneyin!`);
   
    
    alert(`Evet, ${userWord}  doğru! Tebrikler!`);
    initGame();
}



inputField.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    checkWord();
  }
});

refreshBnt.addEventListener("click",initGame);
checkBtn.addEventListener("click",checkWord);