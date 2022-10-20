
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, options);
  });
el= document.querySelector('.tabs')
options={swipable:true}
var instance = M.Tabs.init(el, options);

new VideoBackgrounds('[data-vbg]')

let apiKey='AIzaSyAaIJVBZE_g7fd_G1k0dgSX7HeIlZYUHeI' /*FIXME: FIX API KEY*/
let songList = document.querySelector('.container')
if(songList){
songList.addEventListener('click',function(e){
target= e.target
console.log(target)
if(target.getAttribute('class')=='fa fa-play-circle play')
{
    
  console.log('this is ',target.getAttribute('id'))
    let songName = target.getAttribute('id')
    let url=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${songName}&key=${apiKey}`
    
    fetch(url).then(data =>{return data.json()})
    .then (function(res)
    {
    let songLink= 'https://www.youtube.com/watch?v='+res.items[0].id.videoId
    document.querySelector('#ytbg-1').remove()
    
    let newSongDiv = document.querySelector('.example-marquee').appendChild(document.createElement('div'))
    newSongDiv.setAttribute('id','ytbg-1')
    newSongDiv.setAttribute('data-vbg-mute-button',"true")
    document.getElementById('ytbg-1').setAttribute('data-vbg',songLink)
    new VideoBackgrounds('[data-vbg]')
  })
  let controllerToRemove=document.querySelectorAll('.video-background-controls')
  controllerToRemove[0].remove()
  console.log(document.querySelector('.video-background-controls').innerHTML)
}
})}
let active= window.location.pathname
active= active.substring(1)
active= active.substring(active.indexOf('/') + 1)
if (active== ''){
  active = 'home'
}
document.querySelector('.'+active+'M').classList.add('active')
document.querySelector('.mute-toggle').classList.add('pulse')

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, options);
});