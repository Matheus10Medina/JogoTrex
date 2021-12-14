//Variaveis do jogo:
var trex, trex_correndo, pontas, trexparado, GameOver, GameOverImagem, restart, restartimagem, sompulo, somcolisao, sompontuacao, aumentarvl=0
var pontuacao= 0
var solo, imagemSolo, soloinvisivel, nuvem, imagemnuvem, cacto;
var c1, c2, c3, c4, c5, c6;
var estadodojogo = "JOGAR";
var grupocactos, gruponuvens;

//Função que carrega as imagens , animações e Sons:
function preload(){
  trex_correndo  = loadAnimation ("trex1.png", "trex3.png", "trex4.png");
  trexparado = loadAnimation ("trex_collided.png")
  sompulo= loadSound ("jump.mp3")
  somcolisao= loadSound ("die.mp3")
  sompontuacao= loadSound ("checkPoint.mp3")
  
  imagemSolo=loadImage("ground2.png")
  imagemnuvem=loadImage("cloud.png")
  c1=loadImage("obstacle1.png")
  c2=loadImage("obstacle2.png")
  c3=loadImage("obstacle3.png")
  c4=loadImage("obstacle4.png")
  c5=loadImage("obstacle5.png")
  c6=loadImage("obstacle6.png")
  GameOverImagem=loadImage("gameOver.png")
  restartimagem=loadImage("restart.png")
}

function setup(){ //Padrões de configuração do jogo!
  createCanvas(600,200)
  
  //criar um sprite do trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation ("running", trex_correndo);
  trex.scale = 0.5;
  trex.addAnimation ("parado", trexparado ) 
  pontas = createEdgeSprites ();
  
  solo = createSprite(300,190,600, 20)
  solo.addImage("solo", imagemSolo)
  
  restart = createSprite(300,90,10,10)
  restart.addImage (restartimagem)
  restart.scale = 0.5;
  restart.visible=false
  
  soloinvisivel=createSprite(300, 200, 600, 10) 
  soloinvisivel.visible=false
  
  
  grupocactos = new Group(); 
  gruponuvens = new Group();
  GameOver= createSprite(300,120,10,10)
  GameOver. addImage (GameOverImagem)
  GameOver.scale = 0.5
  GameOver.visible=false
}

function draw(){
 //SEMPRE:
  background ("white");
  drawSprites();
  text("Pontuacao "+pontuacao, 280, 25)
  
  if (estadodojogo === "JOGAR"){
     if(keyDown("space") && trex.y>150){
      trex.velocityY = -13;
       sompulo.play()
     }
     trex.velocityY = trex.velocityY  +0.6; //gravidade
    pontuacao=pontuacao+1
    if(pontuacao%300===0){
      sompontuacao.play()
      aumentarvl=aumentarvl+1
    }
    if (solo.x<0){
      solo.x=solo.width/2
    }
    solo.velocityX=-(4+aumentarvl)
     Gerarnuvem();
     Gerarcacto();
    if(trex.isTouching(grupocactos)){
     estadodojogo="ENCERRAR";
      somcolisao.play()
       }
    
  }else if (estadodojogo === "ENCERRAR"){
    solo.velocityX=0
    grupocactos.setVelocityXEach(0)
    gruponuvens.setVelocityXEach(0)
    grupocactos.setLifetimeEach(-1)
    gruponuvens.setLifetimeEach(-1)
    trex.changeAnimation("parado", trexparado)
     GameOver.visible=true
    restart.visible=true
    trex.velocityY=0
    
    if(mousePressedOver(restart)){
      estadodojogo="JOGAR"
      grupocactos.destroyEach()
       gruponuvens.destroyEach()
      GameOver.visible=false
      restart.visible=false
      pontuacao=0
      trex.changeAnimation("running", trex_correndo)
    }
  }
  
  trex.collide(soloinvisivel);

 
}

function Gerarcacto(){
  if(frameCount%80===0){
  cacto=createSprite(600,175,10,10)
  cacto.velocityX=-(4+aumentarvl)
  grupocactos.add(cacto);  
    
  var rand=Math.round(random(1,6)) 
  switch(rand){
         case 1:cacto.addImage(c1);
    break
    case 2:cacto.addImage(c2)
    break
    case 3:cacto.addImage(c3)
    break
    case 4:cacto.addImage(c4)
    break
    case 5:cacto.addImage(c5)
    break
    case 6:cacto.addImage(c6)
    break
    default:break
    
    
  
         } 
    
  
  cacto.scale=0.45
      cacto.lifetime=310
  }
  }

function Gerarnuvem(){
  if(frameCount%60===0) {
  nuvem=createSprite(600,60,20,20)
  nuvem.velocityX=-3
    gruponuvens.add(nuvem)
  nuvem.addImage(imagemnuvem)
  nuvem.y=Math.round(random(10,60))
  nuvem.lifetime=210 
  nuvem.depth=trex.depth
  trex.depth=trex.depth+1
  } 
   
  }


