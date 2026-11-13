(function(){
  var root=document.documentElement,key='ch-theme';
  function apply(t){
    root.dataset.theme=t;
    var b=document.getElementById('themeBtn');
    if(b)b.textContent=t==='dark'?'Light':'Dark';
    try{localStorage.setItem(key,t)}catch(e){}
  }
  var saved=null;
  try{saved=localStorage.getItem(key)}catch(e){}
  apply(saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
  document.addEventListener('DOMContentLoaded',function(){
    var b=document.getElementById('themeBtn');
    if(!b)return;
    b.textContent=root.dataset.theme==='dark'?'Light':'Dark';
    b.addEventListener('click',function(){apply(root.dataset.theme==='dark'?'light':'dark')});
  });
})();