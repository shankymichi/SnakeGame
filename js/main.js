// Your code here!
function init() {
    canvas = document.getElementById("mycanvas");
    pen = canvas.getContext('2d');
    H = canvas.height;
    W = canvas.width;
    go = false;
    food = getrandomfood();
    fakescore=0;

    snake = {
        init_length: 5,
        color: "yellow",
        cells: [],
        direction: "right",

        createsnake: function () {
            for (var i = this.init_length - 1; i >= 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }

        },
        drawbigfood: function () {
            if (this.cells.length % 4 == 0) {
                drawx = Math.round(Math.random() * (W - 20) / 20);
                drawy = Math.round(Math.random() * (H - 20) / 20);
                pen.fillRect(drawx * 10, drawy * 10, 20, 20);
            }

        },

        drawsnake: function () {
            var i;
            for ( i = 0; i < this.cells.length; i++) {
                pen.fillStyle = 'white';
                pen.strokeStyle = 'black';
                pen.lineWidth = 5;
                pen.strokeRect(this.cells[i].x * 10, this.cells[i].y * 10,10,10);

                pen.fillRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
             

            }
           
            //pen.strokeStyle = 'red';
            //pen.beginPath();
            //pen.arc(57, 5, 3.5, 0, Math.PI* 2, true);
            //pen.stroke();
        },

       

        updatesnake: function () {
            var headx = this.cells[0].x;
            var heady = this.cells[0].y;
            //if (this.cells.length % 4 == 0 && (bigfood.x <= headx < bigfood.x + 20) && (bigfood.y <= heady < bigfood.y + 20)) {
            //    bigfood = getrandombigfood();
            //    fakescore += 4;

            //}
            //else
            if (headx == food.x && heady == food.y) {
                food = getrandomfood();
                    fakescore++;
               
            }
          
            // nextheadx = headx + 1;
            else {   this.cells.pop();
            }

            

            if (this.direction == "right") {
                nextheadx =headx +1 ;
                nextheady = heady  ;
            }
            else if (this.direction == "left") {
                nextheadx = headx-1;
                nextheady = heady;
            }
            else if (this.direction == "down") {
                nextheadx = headx;
                nextheady =heady+1 ;
            }
            else if (this.direction == "up") {
                nextheadx =headx ;
                nextheady = heady-1;
            }


            this.cells.unshift({ x: nextheadx, y: nextheady });
            var lastx = Math.round(W / 10);
            var lasty = Math.round(H / 10);
        //the boundary wala level
            {
                if (this.cells[0].y < 0 || this.cells[0].x < 0 ||
                    this.cells[0].x > lastx || this.cells[0].y > lasty) {
                    alert("gameover");
                    go = true;

                }
            }
            
        }

       

    };
    snake.createsnake();

    function buttonpress(e) {
        if (e.key == "ArrowRight") {
            snake.direction = "right";
        }
        else if (e.key == "ArrowLeft") {
            snake.direction = "left";
        }
        else if (e.key == "ArrowDown") {
            snake.direction = "down";
        }
        else if (e.key == "ArrowUp") {
            snake.direction = "up";
        }
    }
    document.addEventListener('keydown', buttonpress);
}


function getrandomfood() {
     foodx = Math.round(Math.random() * (W - 10) / 10);
     foody = Math.round(Math.random() * (H- 10)/ 10);

    foodcolors = ["red", "blue", "orange", "green", "yellow"];
    var i = Math.round(Math.random() * foodcolors.length);
    var food = {
        x: foodx,
        y: foody,
        color: foodcolors[i]
    }
    return food;

   
}


function getrandombigfood() {
    bigfoodx = Math.round(Math.random() * (W - 20) / 20);
    bigfoody = Math.round(Math.random() * (H - 20) / 20);
    
    var bigfood = {
        x: bigfoodx,
        y: bigfoody,
       
    }
    return bigfood;


}


function draw() {
    pen.clearRect(0,0,W,H);
   // pen.fillStyle("yellow");
    pen.fillStyle = 'green';
    snake.drawsnake();
    pen.fillStyle = food.color;

    if (snake.cells.length % 4 == 0) {
        //var bigfood = getrandombigfood();
        pen.fillRect(food.x * 20, food.y * 20, 20, 20);
    }
    
        pen.fillRect(food.x * 10, food.y * 10, 10, 10); 
    pen.fillStyle = "white";
    pen.font = "14 px Roboto";
    pen.fillText("SCORE :" + fakescore * 8, 10, 10);

    
   
}
function update() {
    snake.updatesnake();
    
}

function gameloop() {
    draw();
    update();
    if (go == true) {
        clearInterval(f);
        
    }
}  

init();
var f = setInterval(gameloop, 100);   
//var g = setInterval(snake.drawbigfood, 900);   
