const PW=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
const EMAIL=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const rules={
  fullName:{test:v=>/^[a-zA-Z\s]{2,50}$/.test(v),msg:'Use 2 to 50 letters and spaces only.'},
  empId:{test:v=>/^[A-Z0-9]{6,12}$/i.test(v),msg:'Use 6 to 12 letters or digits.'},
  email:{test:v=>EMAIL.test(v),msg:'Enter a valid email, like name@example.com.'},
  mobile:{test:v=>/^[6-9]\d{9}$/.test(v),msg:'Enter 10 digits starting with 6, 7, 8 or 9.'},
  dept:{test:v=>v!=='',msg:'Select your division.'},
  password:{test:v=>PW.test(v),msg:'Min 8 characters with uppercase, lowercase, number and a symbol (@$!%*?&).'},
  confirm:{test:v=>v!==''&&v===document.getElementById('password').value,msg:'Passwords do not match.'},
  terms:{test:(v,el)=>el.checked,msg:'Accept the Terms of Service to continue.'}
};
document.addEventListener('DOMContentLoaded',()=>{
  const form=document.querySelector('form[data-validate]');
  if(!form)return;
  const mode=form.dataset.validate; // register | signup | signin
  const fields=[...form.querySelectorAll('[data-rule]')];
  const btn=form.querySelector('button[type="submit"]');
  const banner=document.getElementById('banner');
  const touched=new Set();

  const ruleFor=el=>(mode==='signin'&&el.id==='password')
    ?{test:v=>v.length>=8,msg:'Password must be at least 8 characters.'}
    :rules[el.dataset.rule];
  const isValid=el=>ruleFor(el).test(el.value.trim?el.value.trim():el.value,el);

  function show(el){
    const ok=isValid(el),err=el.closest('.field').querySelector('.error-msg');
    el.classList.toggle('invalid',!ok);
    el.classList.toggle('valid',ok);
    if(err)err.textContent=ok?'':ruleFor(el).msg;
    return ok;
  }
  function refresh(){btn.disabled=!fields.every(isValid)}

  fields.forEach(el=>{
    el.addEventListener('blur',()=>{touched.add(el);show(el);refresh()});
    el.addEventListener('input',()=>{
      if(touched.has(el))show(el);
      if(el.id==='password'){const c=document.getElementById('confirm');if(c&&touched.has(c))show(c)}
      refresh();
    });
    el.addEventListener('change',()=>{touched.add(el);show(el);refresh()});
  });
  refresh();

  const eye=document.getElementById('eyeBtn');
  if(eye)eye.addEventListener('click',()=>{
    const p=document.getElementById('password');
    const s=p.type==='password';
    p.type=s?'text':'password';
    eye.textContent=s?'Hide':'Show';
    eye.setAttribute('aria-pressed',s);
  });

  form.addEventListener('submit',e=>{
    e.preventDefault();
    const allOk=fields.map(show).every(Boolean);
    if(!allOk){
      banner.textContent=mode==='signin'?'Invalid credentials format. Check your email and password.':'Please fix the highlighted fields.';
      banner.className='banner err show';
      return;
    }
    try{localStorage.setItem('ch-user',form.querySelector('[data-rule="email"]').value.trim())}catch(err){}
    banner.className='banner okb show';
    banner.textContent=mode==='signin'?'Signed in. Opening your dashboard...':'Account created. Redirecting to sign in...';
    setTimeout(()=>{location.href=mode==='signin'?'home.html':'signin.html'},900);
  });
});