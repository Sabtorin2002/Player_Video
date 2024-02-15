
function playVideo(videoSrc){
    var videoPlayer = document.getElementById('videoPlayer');//declarare locala
    videoPlayer.src = videoSrc;//asocierea sursei variabilei cu parametrul
    videoPlayer.play();//rulare vidoclip
}


var playlistItems = document.querySelectorAll('.playlist li');//populare lista cu toate elementele 
//de tip list item din cadrul listei din clasa playlist
//populare lista
var videoSources = [
    'media/corabii.mp4',
    'media/foc.mp4',
    'media/sculptura.mp4',
    'media/batalie.mp4'
];

//pentru fiecare list item, este asociat un buton si daca este apasat, va rula videoclipul corespondent lui
var indexVideo;
var indexNextVideo;
var indexPrevVideo;
playlistItems.forEach(function(item,index){
    item.addEventListener('click', () => {
        playVideo(videoSources[index]);
        indexVideo=index;
        indexNextVideo=(index+1)%videoSources.length;
        indexPrevVideo=(index-1)%videoSources.length;
    });
});

var videoContainer = document.querySelector('.video-container');//referinta catre elementul html cu clasa 'video-container'
var fileInput = document.getElementById('fileInput');//referinta catre elementul html cu id-ul 'fileInput'

fileInput.addEventListener('change', function(e){
    
    const files = e.target.files;//se obtine lista de fisiere selectate de utilizator
    for(let i=0;i<files.length;i++){
        const file = files[i];//se obtine lista de fisiere
            addVideoToPlaylist(file);//se apeleaza functia pentru fiecare fisier
    }
});
function addVideoToPlaylist(file){
    
    const videoURL = URL.createObjectURL(file);

    const videoItem = document.createElement('li');//creare obiect de tip list item
    videoItem.textContent = 'Video adaugat';//adaugare text pentru obiectul creat
    document.querySelector('.playlist ul').appendChild(videoItem);//adaugare nod la finalul listei prin intemediul unui buton
    //si daca este apasat butonul, va derula videoclipul adaugat

    videoItem.onclick = function(){
        playVideo(videoURL);
    };

}

document.getElementById('buttonModificare').addEventListener('click',()=>{
    videoSources.reverse();//inversarea listei populate pentru a modifica ordinea in lista
})

document.getElementById('buttonStergePrimul').addEventListener('click', ()=>{
    const primulVideo = document.querySelector('li');//selectare primul element din lista
    document.querySelector('.playlist ul').removeChild(primulVideo);//eliminare nod
    videoSources.shift();//elimina primul element dintr-un array
});

document.getElementById('buttonStergeUltimul').addEventListener('click',()=>{
    const ultimulVideo = document.querySelector('li:last-child');//selectare ultimul element din lista
    document.querySelector('.playlist ul').removeChild(ultimulVideo);//eliminare nod
    videoSources.pop();//eliminare ultimul element din vector
})

var canvasEffect = document.getElementById('canvasEffect');
var contextEffect = canvasEffect.getContext('2d');
var video = document.getElementById('videoPlayer');

var W = canvasEffect.clientWidth;
var H = canvasEffect.clientHeight;

var h = video.videoHeight;
var w = video.videoWidth;

let mousepos={x:0, y:0};

class butonControl{
    desen = {x: undefined, y: undefined};
    vector =[this.desen];
    isClicked=false;

    constructor(x,y,wv,hv,index){
        this.desen.x=x;
        this.desen.y=y;
        this.wv=wv;
        this.hv=hv;
        this.index=index;
        this.drawPLay();
    }

    drawPLay(){
        contextEffect.fillStyle ="white";
        contextEffect.fillText("Play",15,h-25);
        contextEffect.fillStyle ="rgba(120,120,120,0.1)";
        contextEffect.fillRect(this.desen.x, this.desen.y,this.wv,this.hv);
    }
    startVideo(){
        if(!this.isClicked && mousepos.x>=this.desen.x && mousepos.x<=this.desen.x+this.wv &&
          mousepos.y >=this.desen.y && mousepos.y<=this.desen.y+this.hv){
            this.isClicked=true;
            playVideo(videoSources[this.index]);
          }
    }
}

class butonPause{
    desen = {x: undefined, y: undefined};
    vector =[this.desen];
    isClicked=false;

    constructor(x,y,wv,hv){
        this.desen.x=x;
        this.desen.y=y;
        this.wv=wv;
        this.hv=hv;
        this.drawPause();
    }

    drawPause(){
        contextEffect.fillStyle ="white";
        contextEffect.fillText("Pause",63,h-25);
        contextEffect.fillStyle ="rgba(120,120,120,0.1)";
        contextEffect.fillRect(this.desen.x, this.desen.y,this.wv,this.hv);
    }
    pauseVideo(){
        if(!this.isClicked && mousepos.x>=this.desen.x && mousepos.x<=this.desen.x+this.wv &&
            mousepos.y >=this.desen.y && mousepos.y<=this.desen.y+this.hv){
                this.isClicked=true;
                video.pause();
            }
    }
}

class butonNext{
    desen = {x: undefined, y: undefined};
    vector =[this.desen];
    isClicked=false

    constructor(x,y,wv,hv,index){
        this.desen.x=x;
        this.desen.y=y;
        this.wv=wv;
        this.hv=hv;
        this.index=index;
        this.drawNext();
    }

    drawNext(){
        contextEffect.fillStyle ="white";
        contextEffect.fillText("Next",w-97,h-25);
        contextEffect.fillStyle ="rgba(120,120,120,0.1)";
        contextEffect.fillRect(this.desen.x, this.desen.y,this.wv,this.hv);
    }
    nextVideo(){
        if(!this.isClicked && mousepos.x>=this.desen.x && mousepos.x<=this.desen.x+this.wv &&
            mousepos.y >=this.desen.y && mousepos.y<=this.desen.y+this.hv){
                this.isClicked=true;
                playVideo(videoSources[this.index]);
            }
    }
}

class butonPrev{
    desen = {x: undefined, y: undefined};
    vector =[this.desen];

    constructor(x,y,wv,hv,index){
        this.desen.x=x;
        this.desen.y=y;
        this.wv=wv;
        this.hv=hv;
        this.index=index;
        this.drawPrev();
    }

    drawPrev(){
        contextEffect.fillStyle ="white";
        contextEffect.fillText("Prev",w-147,h-25);
        contextEffect.fillStyle ="rgba(120,120,120,0.1)";
        contextEffect.fillRect(this.desen.x, this.desen.y,this.wv,this.hv);
    }
    prevVideo(){
        if(!this.isClicked && mousepos.x>=this.desen.x && mousepos.x<=this.desen.x+this.wv &&
            mousepos.y >=this.desen.y && mousepos.y<=this.desen.y+this.hv){
                this.isClicked=true;
                playVideo(videoSources[this.index]);
            }
    }
}

class baraVideo{
    desen = {x: undefined, y: undefined};
    vector =[this.desen];

    constructor(x,y,wv,hv){
        this.desen.x=x;
        this.desen.y=y;
        this.wv=wv;
        this.hv=hv;
        this.drawbaraVideo();
    }
    drawbaraVideo(){

        contextEffect.fillStyle="rgba(255,180,180,0.3)";
        contextEffect.fillRect(this.desen.x, this.desen.y, this.wv, this.hv);
    }

}

function deseneaza(){
    //contextEffect.clearRect(0,0,W,H);
    contextEffect.drawImage(video,0,0);
    var imageData=contextEffect.getImageData(0,0,W,H);//desenarea imaginii video pe canvas
    var pixels = imageData.data;//datele pentru fiecare pixel
    //alb-negru
    for(y=0;y<H;y++)
        for(x=0;x<W;x++){
        index=(y*W+x)*4;
        medie=(pixels[index]+pixels[index+1]+pixels[index+2])/3;//ton de gri
        pixels[index]=pixels[index+1]=pixels[index+2]=medie;//egalarea pixerilor RGB cu aceeasi valoare de gri
    }
    
    document.getElementById('btnRotatie').addEventListener('click',function(){
        let unghi = Math.PI/2;
        let ct = Math.cos(unghi);
        let st = Math.sin(unghi);
        let x = video.clientWidth/2;
        let y = video.clientHeight/2;
        contextEffect.transform(ct, -st, st, ct, -x*ct-y*st+x, x*st-y*ct+y);
        contextEffect.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
        contextEffect.fillText("Rotatie", 10, 10);
    });
    

    contextEffect.putImageData(imageData,0,0);//reafisare cu datele modificate
    contextEffect.font="bold italic 16px times-new-roman";
    contextEffect.fillStyle="white";
    contextEffect.fillText("Alb-Negru, Pozitie: " + video.currentTime.toFixed(2)+"s",10,20);

    let butonPlayVideo = new butonControl(10,h-50,40,40,indexVideo);
    let butonPauseVideo = new butonPause(60,h-50,45,40);//pozitie in canvas x,y/marime obiect
    let butonNextVideo = new butonNext(w-100,h-50,40,40,indexNextVideo);
    let butonPrevVideo = new butonPrev(w-150,h-50,40,40,indexPrevVideo);
    let baraVideoCanvas = new baraVideo(120, h-35, 670, 10);

    canvasEffect.onmousemove = (e)=>{
        mousepos.x = e.clientX-canvasEffect.getBoundingClientRect().x;
        mousepos.y = e.clientY-canvasEffect.getBoundingClientRect().y;
    };

    updateProgressBar();

    butonPlayVideo.startVideo();
    butonPauseVideo.pauseVideo();
    butonNextVideo.nextVideo();
    butonPrevVideo.prevVideo();
    

}

var interval=window.setInterval(deseneaza,50);

var progressBar = document.getElementById('videoProgress');
video.addEventListener('timeupdate', updateProgressBar);
function updateProgressBar(){
    var value =(video.currentTime/video.duration)*100;
    progressBar.value = value;}

    var previewContainer=document.getElementById('previewContainer');
    var previewImage=document.getElementById('previewImage');
    var canvasPreview = document.getElementById('canvasPreview');
    var contextPreview = canvasPreview.getContext('2d');

    progressBar.addEventListener('mousemove',function(e){
        contextPreview.drawImage(video, 0, 0, canvasPreview.width, canvasPreview.height);
        previewContainer.style.display='block';//elementul de previzualizare sa devina vizivil atunci cand mouse-ul este miscat peste bara de progres
        previewImage.src = canvasPreview.toDataURL();//se actualizeaza sursa imaginii, convertirea continutului canvas intr-un URL de date care poate fi utilizat pentru a actualiza sursa imaginii
    });

var subtitles = [];
function loadSubtitles(subtitleFile) {
    fetch(subtitleFile)
      .then(response => response.json())
      .then(data => {
        subtitles = data;
      })
      .catch(error => console.error('Eroare încărcare subtitrări:', error));
  }
  
  // afisarea subtitrarilor in functie de timpul specificat
  function displaySubtitles() {
    var currentTime = video.currentTime;
    for (var i = 0; i < subtitles.length; i++) {
      if (currentTime >= subtitles[i].start && currentTime <= subtitles[i].end) {
        document.getElementById('subtitleContainer').innerText = subtitles[i].text;
        break;
      }
    }
  }
  
  //pentru afisarea subtitrarilor la timpul specificat
  video.addEventListener('timeupdate', displaySubtitles);
  
  function startSubtitles() {
    loadSubtitles('media/1.json');
  }
  startSubtitles();







    





