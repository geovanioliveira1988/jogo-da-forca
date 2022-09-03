
// **************** Variáveis Globais ***************
let divInserirPalavra = document.querySelector('.divInserirPalavra');
let divInpInserir = document.querySelector('.divInpInserir');
let principal = document.querySelector('.principal');
let divIniciarJogo = document.querySelector('.divIniciarJogo');
let btIniciarJogo = document.querySelector('.btIniciarJogo');
let inputPalavra = document.querySelector('.inputPalavra');
let inputDica = document.querySelector('.inputDica');
let telaGame = document.querySelector('.game');
let dica = document.querySelector('.dica');
let canvas = document.querySelector('canvas');
let lampada = document.querySelector('.lampada');
let txtDica = document.querySelector('.txtDica');
let espacoEsquerda = 740;
let topLetErrada = 320;
let leftLetErrada = 80;
let palavra;
let vetPalavras = [];
let vetDica = [];
let vetLetrasErradas = [];
let vetLetCertasRep = [];
let contador = 0;
let cont = 0;
let x = 0;
let acerto=0;

// ******************* Funções **********************

// checar se há ou não caracteres especiais
inputPalavra.addEventListener("keypress", function(e){
  if (!checarCaractere(e)){
    e.preventDefault();
  }
});

function checarCaractere(e){
  let char = String.fromCharCode(e.keyCode);
  let pattern = '[a-zA-Z0-9- ]';

  if (char.match(pattern)){
    return true;
  } else{
    alert('Permitido Somente Letras e Números')
  }
}

//habilitar inputs e enviar dados aos vetores
function habInput(){
    //limpar campos de input
    inputPalavra.value = "";
    inputDica.value = "";
   
    btIniciarJogo.disable = true;
    divInserirPalavra.style.display = 'none';
    divInpInserir.style.display='inline';
}

function adicionarPalavraDica(){
    palavra = inputPalavra.value.toString().toLowerCase();
    vetPalavras[contador] = palavra.replace(/ /g, "");    
    vetDica[contador] = inputDica.value.toString().toUpperCase();
    contador = contador+1;

    btIniciarJogo.disable = false;
    divInserirPalavra.style.display = 'inline';
    divInpInserir.style.display='none';
}

//função principal

function jogar(){  
  let divBotoes = document.querySelector('.divBotoes');
  let tela = document.querySelector('canvas');
  let pincel = tela.getContext('2d');
  let numAleatorio = Math.round(Math.random() * (vetPalavras.length -1));

  divBotoes.style.display = 'none';
  telaGame.style.display = 'inline';

  console.log(vetPalavras[numAleatorio]);
  console.log(vetDica[numAleatorio]);  

  //Inserir dica
  dica.innerHTML = vetDica[numAleatorio];

  function desenhar(){

    let footer = document.querySelector('footer');
    footer.style.marginTop = '430px';

   
    pincel.fillStyle = 'transparent';
    pincel.fillRect(100, 0, 80, 320);

    pincel.fillStyle = '#AA0000';
    pincel.fillRect(100,148,80,2);
    pincel.fill();
 
   
 
    dica.innerHTML = vetDica[numAleatorio];    
   
    for (i=0; i<vetPalavras[numAleatorio].length; i++){
      //criar quadrado
      let divQuadrado = document.createElement('div');
      divQuadrado.classList.add("letra"+i);
      let divRisco = document.createElement('div');
      divQuadrado.style.width = '50px';
      divQuadrado.style.height = '49px';
      divQuadrado.style.backgroundColor='white';
      divQuadrado.style.position = 'absolute';
      divQuadrado.style.left = espacoEsquerda+'px';  
      divQuadrado.style.top = 518 +'px';
      divQuadrado.style.fontFamily = 'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', 'sans-serif';
      divQuadrado.style.fontSize = '50px'
      divQuadrado.style.color = 'white';
      divQuadrado.style.border = '2px solid black'
      divQuadrado.style.textAlign = 'center';
      divQuadrado.style.paddingBottom='5px';
      divQuadrado.style.textTransform = "uppercase";
      divQuadrado.style.borderRadius='5px'
      principal.appendChild(divQuadrado);
 
      //criar riscos
      divRisco.style.width = '54px';
      divRisco.style.height = '3px';
      divRisco.style.backgroundColor='white';
      divRisco.style.position = 'absolute';
      divRisco.style.left = espacoEsquerda+'px';  
      divRisco.style.top = 581 +'px';
      espacoEsquerda = espacoEsquerda + 60;
      principal.appendChild(divRisco);
    }
  }

 
  function boneco(x){
    canvas.style.display='inline';
    let tela = document.querySelector('canvas');
    let pincel = tela.getContext('2d');
    if (x==0){
      pincel.fillStyle = 'black';
      pincel.fillRect(120,0,2,148);
      pincel.fill();
    } else if (x==1){
      pincel.fillStyle = 'black';
      pincel.fillRect(120,0,80,2);
      pincel.fill();
    } else if (x==2){
      pincel.strokeStyle='black';    
      pincel.moveTo(122,30);
      pincel.lineTo(150,0);
      pincel.lineWidth = 2;
      pincel.stroke();
    } else if (x==3){
      pincel.fillStyle = 'black';
      pincel.fillRect(200,0,2,30);
      pincel.fill();
    } else if (x==4){
      pincel.fillStyle = '#AA0000';
      pincel.beginPath();
      pincel.arc(201,40, 10, 0, 2 * Math.PI );
      pincel.fill();

      pincel.fillStyle = '#AA0000';
      pincel.beginPath();
      pincel.arc(201,40, 5, 0, 2 * Math.PI );
      pincel.fill();
    } else if (x==5){
      pincel.fillStyle = '#AA0000';
      pincel.fillRect(200,50.5,2,40);
      pincel.fill();
 
      pincel.fillStyle = '#AA0000';
      pincel.beginPath();
      pincel.arc(201,40, 5, 0, 2 * Math.PI );
      pincel.fill();
    } else if (x==6){
      //braço esquerdo do boneco
      pincel.strokeStyle='#AA0000';
      //movimenta eixo
      pincel.moveTo(201,60);
      //tamanho do braço (maior o x mais curto fica o braço) quanto menor o Y o braço vai levantando mais
      pincel.lineTo(215,80);
      pincel.lineWidth = 2;
      pincel.stroke();
 
      pincel.fillStyle = '#AA0000';
      pincel.beginPath();
      pincel.arc(201,40, 5, 0, 2 * Math.PI );
      pincel.fill();
    } else if (x==7){
      //braço direito do boneco
      pincel.strokeStyle='#AA0000';
      //movimenta eixo
      pincel.moveTo(201,60);
      //tamanho do braço (maior o x mais curto fica o braço) quanto menor o Y o braço vai levantando mais
      pincel.lineTo(187,80);
      pincel.lineWidth = 2;
      pincel.stroke();
     
      pincel.fillStyle = 'transparent';
      pincel.beginPath();
      pincel.arc(201,40, 5, 0, 2 * Math.PI );
      pincel.fill();
    } else if (x==8){
      //perna esquerda do boneco
      pincel.strokeStyle='#AA0000';
      //movimenta eixo
      pincel.moveTo(201,90);
      //tamanho do braço (maior o x mais curto fica o braço) quanto menor o Y o braço vai levantando mais
      pincel.lineTo(215,110);
      pincel.lineWidth = 2;
      pincel.stroke();
     
      pincel.fillStyle = 'transparent';
      pincel.beginPath();
      pincel.arc(201,40, 5, 0, 2 * Math.PI );
      pincel.fill();
    } else if (x==9){
      //perna esquerda do boneco
      pincel.strokeStyle='#AA0000';
      //movimenta eixo
      pincel.moveTo(201,90);
      //tamanho do braço (maior o x mais curto fica o braço) quanto menor o Y o braço vai levantando mais
      pincel.lineTo(187,110);
      pincel.lineWidth = 2;
      pincel.stroke();
     
      pincel.fillStyle = 'transparent';
      pincel.beginPath();
      pincel.arc(201,40, 5, 0, 2 * Math.PI );
      pincel.fill();
 
      let perdeu = document.querySelector('.perdeu');
      perdeu.style.display = 'inline';  
       
      lampada.style.display='none';
      dica.style.display='none';
      txtDica.style.display='none';  
    }
  }

  function verificarTecla(evento){
    if (x==10 || acerto == (vetPalavras[numAleatorio].length)){
      return false;
    } else {      
      let codTecla = evento.keyCode;
      let teclaPressionada = String.fromCharCode(codTecla);
      let pattern = '[a-zA-Z0-9]';
     
      if (teclaPressionada.match(pattern)){
        checarLetra(teclaPressionada);
      } else{
        alert('Permitido Somente Letras e Números');
      }          
    }    
  }

  function checarLetra(teclaPressionada){    
    //CHECANDO SE A LETRA EXISTE NA STRING
    console.log(teclaPressionada);
    if (verifica = vetPalavras[numAleatorio].indexOf(teclaPressionada) > -1){
      let posicaoInicial = (vetPalavras[numAleatorio].indexOf(teclaPressionada));
      let palavra = vetPalavras[numAleatorio];    
 
      for(let i=0; i<vetLetCertasRep.length; i++){
        if(teclaPressionada == vetLetCertasRep[i]){
          return;
        }
      }
 
      vetLetCertasRep[cont] = teclaPressionada;  
   
      cont = cont+1;    
     
      //CHECANDO SE EXISTE MAIS LETRAS NA STRING
      for(let i=posicaoInicial; i<vetPalavras[numAleatorio].length; i++){
         
          let div = document.querySelector(".letra"+i);
 
          if(teclaPressionada == palavra[i]){
            div.style.backgroundColor='#004C54';
            div.innerHTML = teclaPressionada;
            acerto = acerto+1;        
           
            if(acerto == (vetPalavras[numAleatorio].length)){            
               let trofeu = document.querySelector('.trofeu');              
               trofeu.style.display = 'inline';                          
               lampada.style.display='none';
               dica.style.display='none';
               txtDica.style.display='none';                      
            }
                     
          }  
      }  
    } else {    
      if(x==10){      
        return;        
      }    
       
      if(checarIgualdade = vetLetrasErradas.indexOf(teclaPressionada) > -1){
        x=x;    
        return;
      }
 
      boneco(x);
 
      vetLetrasErradas[x] = teclaPressionada;    
 
      x = x+1;
 
      if (x == 6){        
        leftLetErrada = leftLetErrada+56;
        topLetErrada = topLetErrada - 270;
      }    
 
      //LETRAS QUE NÃO EXISTEM
      let divLetErrada = document.createElement('div');

      divLetErrada.classList.add('divLetErrada'+x);
      divLetErrada.style.width = '55px';
      divLetErrada.style.height = '53px';  
      divLetErrada.style.backgroundColor='#AA0000';
      divLetErrada.style.position = 'absolute';
      divLetErrada.style.left=leftLetErrada+'px';
      divLetErrada.style.top=topLetErrada+'px';
      divLetErrada.style.border='2px solid black';
      divLetErrada.style.color='white';
      divLetErrada.style.fontSize = '40px';
      divLetErrada.style.fontFamily= 'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', 'sans-serif';
      divLetErrada.style.textAlign='center';
      divLetErrada.style.textTransform='uppercase';
      divLetErrada.style.borderRadius='5px';
     
      principal.appendChild(divLetErrada);      
      divLetErrada.innerHTML = teclaPressionada;            
      topLetErrada = (topLetErrada+54);
    }  
  }
 
  desenhar();
  document.addEventListener('keypress', verificarTecla);
}