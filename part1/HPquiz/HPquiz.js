
$(document).ready(function() {
    start(questionNumber);
    
    $(".submit-answer").on("click", function(event) {
    
        var userAnswer = parseInt($(this).attr("id"));
        answerCheck(userAnswer);
    
        setTimeout(function() {
                    $(".submit-answer").removeClass("correctStyle incorrectStyle");
                     start(questionNumber);
                 }, 800)
    
         questionNumber++;
      });
    
    });
    



    var questionNumber = 0,
        totalCorrect = 0,
        optionFinal = 0;
    
    var allQuestions = [
         {
            question: "What creature is depicted in the emblem for Gryffindor house?",
            choices: ['Eagle', 'Snake', 'Lion', 'Badger'],
            answer: 2},
        {
            question: "What is the incantation for the Summoning Charm?",
            choices: ['Accio', 'Anapneo', 'Aparecium', 'Ascendio'],
            answer: 0},
        // {
        //     question: "What colour is the Hogwarts Express?",
        //     choices: ['Indigo', 'Scarlet', 'Emerald', 'Bronze'],
        //     answer: 1},
        // {
        //     question: "How are parcels and letters sent in the wizarding world?",
        //     choices: ['via the Floo Network', 'via broomstick', 'via owls', ''],
        //     answer: 2},
        {
            question: "What do Harry and Ron crash into when they fly Arthur Weasley's car to Hogwarts?",
            choices: ['The Great Lake', 'The Whomping Willow', 'The Astronomy Tower', 'The Leaky Cauldron'],
            answer: 1},
        {
            question: "Which family was Dobby originally bound to serve?",
            choices: ['The Blacks', 'The Potters', 'The Weasleys', 'The Malfoys'],
            answer: 3},
        // {
        //     question: "What item of clothing grants Dobby his freedom?",
        //     choices: ['An old hat', 'A slimy sock', 'A broken shoe', ''],
        //     answer: 1},
        // {
        //     question: "What does Harry Potter receive as an anonymous Christmas present in Philosopher’s Stone?",
        //     choices: ['A pair of cufflinks', 'A broom', 'An invisibility cloak', ''],
        //     answer: 2},
        {
            question: "In Deathly Hallows, Lord Voldemort has a ‘Taboo’ put on his name. What does this mean, exactly?",
            choices: ['It is impossible to say his name out loud', 'Voldemort can see inside that person\'s mind', 'Whoever says his name is trackable', 'Any protective spells on the speaker will stop working'],
            answer: 2},
        {
            question: "What is the last spell Harry uses against Voldemort at the battle of Hogwarts?",
            choices: ['Expelliarmus', 'Protego', 'Stupefy', 'Finite Incantartum'],
            answer: 0}
      ];
    
    var result = [
        {
          image: "https://media3.giphy.com/media/PXvCWUnmqVdks/giphy.gif?cid=790b76118c6ad0040644aeabb6d94a78c779c1675164898a&rid=giphy.gif",
          comment: " Wowzers!"}
        ,{
          image: "https://media0.giphy.com/media/8l1UFvNSS5SwM/giphy.gif?cid=790b7611440215680f4fea638ba4cdd2dcb956678cbee277&rid=giphy.gif",
          comment:  " Not bad."}
        ,{
          image: "https://media0.giphy.com/media/AisOYaOZdrS1i/giphy.gif?cid=790b7611b6cf677a7b07b124c4de40d2d2775ffa1ca25c3b&rid=giphy.gif",
          comment: " Disappointing."}
        ,{
          image: "https://media1.giphy.com/media/12nfFCZA0vyrSw/giphy.gif?cid=790b76115b4171068e37f414ba5ca598ae9f7026a443da77&rid=giphy.gif",
          comment: "Failure!"}
        ];
    
    
    // continue with next question or end
    var start = function(questionNumber) {
          $('h2').hide().fadeIn(400);
    
          if(questionNumber !== allQuestions.length){
              question(questionNumber);
          }else{
              end();
          }
    };
    
    // show question and possible answers
    function question(questionNum) {
          $("h2").text(allQuestions[questionNum].question);
    
          $.each(allQuestions[questionNum].choices, function(i, answers){
             $("#" + i).html(answers);
          });
    };
    
    function end() {
      finalImage();
      $("ul").hide();
      $("h2").text("You scored " + totalCorrect + " out of " + allQuestions.length + ". " + result[optionFinal].comment);
      $("#image").html('<img src=' + result[optionFinal].image + ' alt="">').fadeIn(1000);
      $("#try-again-container").show();
      restart();
      console.log(optionFinal);
    };
    
    // result image accourding to correct answers
    function finalImage() {
      if(totalCorrect < allQuestions.length && totalCorrect >= (allQuestions.length*.7)){
                optionFinal = 1;
        }else if(totalCorrect <= (allQuestions.length*.6) && totalCorrect >= (allQuestions.length*.2)){
              optionFinal = 2;
        }else if(totalCorrect !== allQuestions.length){
              optionFinal = 3;
        }
    }
    
    function restart(){
      console.log(optionFinal);
      
      if(optionFinal == 0 || optionFinal == 1){
        document.querySelector("#try-again").innerHTML = 'Finish';
        $("#try-again").click(function(){
          window.open('../../part2/part2.html', '_self');
        })
      }
      else{
        $("#try-again").click(function(){
          questionNumber = 0,
          totalCorrect = 0,
          optionFinal = 0;
      
          start(questionNumber);
          $("#image").hide();
          $("#try-again-container").hide();
          $("ul").fadeIn(400);
        });
      }
    } 
    
    function answerCheck(userAnswer) {
         var correctAnswer = allQuestions[questionNumber].answer;
    
         if (userAnswer === correctAnswer) {
             $("#" + userAnswer).addClass("correctStyle");
             totalCorrect++;
         }else{
            $("#" + userAnswer).addClass("incorrectStyle");
         }
    };
    
    
    
    
    
    