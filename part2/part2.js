//VOLDEMORT BATTLE
console.log("Changes");
let direction = 'right';

window.onload = function () {
    document.getElementById("start-button").onclick = function () {
        startGame();
    };



    //Start Maze
    function startGame() {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');




        //Creating player (HARRY)
        var harryRight = new Image();
        harryRight.onload = function () {
            ctx.drawImage(harryRight, player.x, player.y, 50, 50);
        }
        harryRight.src = "../img/characters/harryFlying.png"


        var harryLeft = new Image();
        harryLeft.onload = function () {
            ctx.drawImage(harryLeft, player.x, player.y, 50, 50);
        }
        harryLeft.src = "../img/characters/harryFlyingLeft.png"


        var player = {
            x: 0,
            y: 450,
            w: 50,
            h: 50,
            moveLeft: function () { 
                let p = {...player};
                p.x -=50
                if(!checkAllCollisions(p, rectangles)){
                    player.x -= 50 }
                direction = 'left';
                },
    
                
            moveRight: function () { 
                let p = {...player};
                p.x +=50
                if(!checkAllCollisions(p, rectangles)){
                    player.x += 50 }
                direction = 'right';
                },

            moveUp: function () {
                let p = {...player};
                p.y -=50
                if(!checkAllCollisions(p,rectangles)){
                    player.y -= 50 }
                },
                
            moveDown: function () {
                let p = {...player};
                p.y +=50
                if(!checkAllCollisions(p,rectangles)){
                    player.y += 50 }
                },
        }





        //Creating end goal (QUIZ)
        var wand = new Image();
        wand.onload = function () {
            ctx.drawImage(wand, battle.x, battle.y, 50, 50);
        }
        wand.src = "../img/icons-&-items/wand-icon.png"


        var battle = {
            x: 250,
            y: 450,
            w: 50,
            h: 50
        }




        //Draw image onto canvas
        function draw(obj, img) {
            if(obj == player){
                switch(direction){
                    case 'right': img = harryRight; break;
                    case 'left': img = harryLeft; break;
                }
            }
            ctx.drawImage(img, obj.x, obj.y, 50, 50)
        }




        //Draw the maze
        let wall1 = { x: -1, y: 0, w: 1, h: canvas.height }
        let wall2 = { x: 0, y: -1, w: canvas.width, h: 1 }
        let wall3 = { x: 0, y: 501, w: canvas.width, h: 1}
        let wall4 = { x: 401, y: 0, w: 1, h: canvas.height}

        let r1 = {x: 0, y: 0, w: 150, h: 50};
        let r2 = {x: 0, y: 100, w: 50, h: 250};
        let r3 = {x: 200, y: 0, w: 50, h: 150};
        let r4 = {x: 300, y: 50, w: 50, h: 150};
        let r5 = {x: 50, y: 400, w: 50, h: 100};
        let r6 = {x: 100, y: 200, w: 50, h: 200};
        let r7 = {x: 200, y: 200, w: 50, h: 300};
        let r8 = {x: 300, y: 300, w: 50, h: 200};
        let r9 = {x: 100, y: 100, w: 100, h: 50};
        let r10 = {x: 50, y: 400, w: 100, h: 50};
        let r11 = {x: 200, y: 200, w: 150, h: 50};

        let rectangles = [wall1, wall2, wall3, wall4, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11];


        function drawBoardGame() {
            ctx.fillStyle = 'black';
            for(let i=0; i<rectangles.length; i++){
                ctx.fillRect(rectangles[i].x, rectangles[i].y, rectangles[i].w, rectangles[i].h);
            }
        }





        //Check if there is a collision
        function checkCollision(rect1, rect2) {
            if (rect1.x < rect2.x + rect2.w &&
                rect1.x + rect1.w > rect2.x &&
                rect1.y < rect2.y + rect2.h &&
                rect1.y + rect1.h > rect2.y) {
                return true;
            }
        }
        
        
        //Check each block in maze for collision
        function checkAllCollisions(p, rectangles){
            for(let i=0; i<rectangles.length; i++){
                if(checkCollision(p, rectangles[i])){
                    return true;
                }
            }
        }
        

    


        //Updating canvas 
        function updateCanvas() {
            ctx.clearRect(0, 0, 400, 500);
            drawBoardGame();
            draw(player, null);
            draw(battle, wand);
            endGoal();
            window.requestAnimationFrame(updateCanvas);
        }
        window.requestAnimationFrame(updateCanvas);






        //Checks user movements to move player
        document.onkeyup = function (e) {
            switch (e.keyCode) {
                case 37: player.moveLeft(); break;
                case 38: player.moveUp(); break;
                case 39: player.moveRight(); break;
                case 40: player.moveDown(); break;
            }
        }



        //Check if player reached the end
        function endGoal(){
            if(checkCollision(player, battle)){
                window.open('RPS/html/rps.html', '_self');
                //document.querySelector("#myModal").style.display = 'block';
            }
        }
    }
}




















// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("quizBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function () {
    //modal.style.display = "block";
    document.querySelector("#myModal").style.display = 'block';
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



