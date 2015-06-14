/// Author : Md. Shohanur Rahaman
///Email : shohan4556@gmail.com
/// Blog : cupc71.blogspot.com

var game= new Phaser.Game(800,600,Phaser.AUTO, " ",{
    preload:preload,create:create,update:update
})
    
    function preload(){
        game.load.image("bg1","assets/background1.png");
        game.load.image("brick8","assets/brick8.png");
        game.load.image("paddle","assets/paddle.png");
        game.load.image("ball","assets/gball.png");
    }

//************ variable declare *************//
    var paddle;
    var ball;
    var cursor;
    var bricks
    var scoreText;
    var score=0;
    var music;


    function create(){
        game.add.sprite(0,0,"bg1");
        paddle=game.add.sprite(400,570,"paddle");
        ball=game.add.sprite(450,500,"ball");
        
        game.physics.arcade.enable(paddle);
        game.physics.arcade.enable(ball);
        
        bricks=game.add.group();
        bricks.enableBody=true;    
        

        /// adding brick
        for(var i=0;i<10;i++){
            for(var j=1;j<=6;j++){
               game.add.sprite(i*80,40*j,"brick8",0,bricks);
            }
        }
        // end adding brick
        
        bricks.setAll("body.immovable",true); // make sure that brick object wont move
        paddle.body.immovable=true;
        paddle.body.collideWorldBounds=true;  // make sure the paddle cross the game world boundary
        
        ball.body.velocity.x=300;
        ball.body.velocity.y=300;
        ball.body.collideWorldBounds=true;
        ball.body.bounce.x=1;
        ball.body.bounce.y=1;
        
        cursor=game.input.keyboard.createCursorKeys(); //used to handle input
        scoreText=game.add.text(16,05,"Score : 0",{fontSize: '30px',fill : "#000"});
       
        //***********************//
    // Adjusting the game to any screen size
        game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally=true;
        game.scale.pageAlighVertically=true;
        game.scale.setScreenSize(true);
        
    } // end create ()


    function update(){
            // move paddle
        if(cursor.left.isDown && paddle.game.world.x>=0){
            paddle.body.velocity.x= -300;
        }
        else if(cursor.right.isDown){
            paddle.body.velocity.x = 300;
        }
        else{
          paddle.body.velocity.x=0;
        }
        
        game.physics.arcade.collide(paddle,ball); // collide 
        game.physics.arcade.collide(ball,bricks,remove_brick,null,this);
        
    }
    
    function remove_brick(ball,bricks){
        bricks.kill();
        score=score+10;
        scoreText.text="Score : "+score;
    }












