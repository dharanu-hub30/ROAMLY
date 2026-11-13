document.addEventListener('DOMContentLoaded',()=>{
  const fab=document.createElement('button');
  fab.id='chatFab';fab.setAttribute('aria-label','Open assistant');fab.textContent='?';
  const panel=document.createElement('div');
  panel.id='chatPanel';
  panel.innerHTML='<div id="chatHead">Campus assistant</div><div id="chatLog"></div><form id="chatForm"><input id="chatIn" placeholder="Ask about CGPA, attendance..." autocomplete="off" aria-label="Message"><button>Send</button></form>';
  document.body.append(fab,panel);
  const log=panel.querySelector('#chatLog'),form=panel.querySelector('#chatForm'),input=panel.querySelector('#chatIn');

  const replies=[
    [['hello','hi','hey'],'Hi! I can help with attendance, SGPA, themes and the calculator.'],
    [['attendance','bunk','skip'],'Open the Attendance tool on the dashboard. Enter attended and total classes to see how many you can skip.'],
    [['cgpa','sgpa','grade','gpa'],'Use the SGPA tool: add credits and grade points per subject, and it shows your SGPA.'],
    [['register','sign up','signup','account'],'Use the Register or Sign up page. Fields turn green when valid.'],
    [['password'],'Passwords need 8+ characters with uppercase, lowercase, a number and a symbol (@$!%*?&).'],
    [['theme','dark','light'],'Use the theme button in the header. Your choice is remembered.'],
    [['calculator','calc'],'The calculator is on the dashboard, in the right column.'],
    [['note','notes'],'Add sticky notes on the dashboard. They stay saved in this browser.']
  ];
  function add(cls,text){
    const d=document.createElement('div');
    d.className=cls;d.textContent=text;
    log.appendChild(d);
    log.scrollTop=log.scrollHeight;
  }
  add('bot-msg','Hello! Ask me about attendance, SGPA, the calculator or themes.');
  fab.onclick=()=>{panel.classList.toggle('open');if(panel.classList.contains('open'))input.focus()};
  form.onsubmit=e=>{
    e.preventDefault();
    const t=input.value.trim();
    if(!t)return;
    add('user-msg',t);input.value='';
    const q=t.toLowerCase();
    const hit=replies.find(r=>r[0].some(k=>q.includes(k)));
    setTimeout(()=>add('bot-msg',hit?hit[1]:'Sorry, I did not get that. Try: attendance, SGPA, password, theme or calculator.'),350);
  };
});