document.addEventListener('DOMContentLoaded',()=>{
  const host=document.getElementById('calc');
  if(!host)return;
  host.innerHTML='<div class="calc-screen" id="calcOut" aria-live="polite">0</div><div class="keys" id="calcKeys"></div>';
  const out=document.getElementById('calcOut'),keys=document.getElementById('calcKeys');
  let expr='';
  const layout=['7','8','9','/','4','5','6','*','1','2','3','-','0','.','C','+','='];
  layout.forEach(k=>{
    const b=document.createElement('button');
    b.textContent=k;b.type='button';
    if('+-*/='.includes(k))b.className='op';
    b.onclick=()=>press(k);
    if(k==='=')b.style.gridColumn='span 4';
    keys.appendChild(b);
  });
  function show(t,err){out.textContent=t||'0';out.classList.toggle('error',!!err)}
  function press(k){
    if(out.classList.contains('error')){expr='';out.classList.remove('error')}
    if(k==='C'){expr='';return show('0')}
    if(k==='='){
      if(!expr)return;
      if(/[+\-*/.]$/.test(expr))return show('Invalid expression',true);
      if(/\/0(?!\d*\.?\d*[1-9])/.test(expr))return show('Cannot divide by zero',true),expr='';
      try{
        const r=Function('"use strict";return ('+expr+')')();
        if(!isFinite(r))throw 0;
        expr=String(Math.round(r*1e10)/1e10);
        show(expr);
      }catch(e){show('Invalid expression',true);expr=''}
      return;
    }
    if(/[+*/]/.test(k)&&(!expr||/[+\-*/]$/.test(expr)))return; // block bad operator starts
    expr+=k;show(expr);
  }
  document.addEventListener('keydown',e=>{
    if(!host.contains(document.activeElement))return;
    if(/[0-9+\-*/.]/.test(e.key))press(e.key);
    else if(e.key==='Enter')press('=');
    else if(e.key==='Escape')press('C');
  });
});