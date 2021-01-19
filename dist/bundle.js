(()=>{"use strict";const e=document.getElementById("callback"),t=document.querySelector(".modal-overlay"),l=(document.getElementById("responseMessage"),document.querySelectorAll(".callback-btn")),s=document.querySelectorAll(".absolute"),n=document.querySelector(".button-services"),o=document.getElementById("form1"),c=document.createElement("div"),r=()=>{for(let e=0;e<o.length-1;e++)o[e].value=""};l.forEach((l=>{l.addEventListener("click",(l=>{l.preventDefault(),e.style.display="block",t.style.display="block"}))})),s.forEach((l=>{l.addEventListener("click",(l=>{l.preventDefault(),e.style.display="block",t.style.display="block"}))})),n.addEventListener("click",(l=>{l.preventDefault(),e.style.display="block",t.style.display="block"})),e.addEventListener("click",(l=>{"IMG"===l.target.tagName&&(e.style.display="none",t.style.display="none",r())})),t.addEventListener("click",(()=>{e.style.display="none",t.style.display="none",r()})),(()=>{const e=document.getElementById("services"),t=document.getElementById("faq"),l=document.getElementById("contacts"),s=document.querySelectorAll(".top-menu ul li"),n=document.querySelector(".up");s.forEach(((s,n)=>{s.addEventListener("click",(s=>{s.preventDefault(),0===n?e.scrollIntoView({block:"start",behavior:"smooth"}):1===n?t.scrollIntoView({block:"start",behavior:"smooth"}):2===n&&l.scrollIntoView({block:"start",behavior:"smooth"})}))})),window.addEventListener("scroll",(()=>{n.hidden=pageYOffset<document.documentElement.clientHeight/2,n.addEventListener("click",(()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})}))}))})(),(()=>{const e=document.querySelector(".accordeon"),t=document.querySelectorAll(".accordeon .element"),l=document.querySelectorAll(".accordeon .element-content");e.addEventListener("click",(e=>{let s=e.target;s.classList.contains("title")&&t.forEach(((e,n)=>{e===s.closest(".element")&&(e=>{for(let s=0;s<l.length;s++)e===s?(t[s].classList.add("active"),l[s].style.display="block"):(t[s].classList.remove("active"),l[s].style.display="none")})(n)}))}))})(),(()=>{const e=document.querySelector(".top-slider"),t=document.querySelectorAll(".top-slider .item"),l=document.querySelector(".slick-dots");let s,n=0;t.forEach((()=>{const e=document.createElement("li");l.appendChild(e)}));const o=document.querySelectorAll(".slick-dots li");o[0].classList.add("slick-active");const c=(e,t,l)=>{e[t].classList.remove(l)},r=(e,t,l)=>{e[t].classList.add(l)},a=()=>{c(t,n,"active"),c(o,n,"slick-active"),n++,n>=t.length&&(n=0),r(t,n,"active"),r(o,n,"slick-active")},i=(e=3e3)=>{s=setInterval(a,e)};e.addEventListener("click",(e=>{e.target.matches(".slick-dots li")&&(c(t,n,"active"),c(o,n,"slick-active"),e.target.matches(".slick-dots li")&&o.forEach(((t,l)=>{t===e.target&&(n=l)})),r(t,n,"active"),r(o,n,"slick-active"))})),e.addEventListener("mouseover",(e=>{e.target.matches(".slick-dots li")&&clearInterval(s)})),e.addEventListener("mouseout",(e=>{e.target.matches(".slick-dots li")&&i()})),i()})(),(()=>{const e=document.querySelector(".services-elements"),t=document.querySelector(".services-carousel"),l=document.querySelector(".services-carousel").children,s=document.querySelector(".services-arrow").children;let n=0,o=3,c=Math.floor(100/o);(()=>{e.classList.add("services-slider"),t.classList.add("services-slider__wrap");for(const e of l)e.classList.add("services-slider__item")})(),(()=>{const e=document.createElement("style");e.id="services-slider__style",document.head.appendChild(e)})();const r=()=>{document.getElementById("services-slider__style").textContent=`\n\t\t\t.services-slider {\n\t\t\t\toverflow: hidden !important;\n\t\t\t}\n\t\t\t.services-slider__wrap {\n\t\t\t\tdisplay: flex !important;\n\t\t\t\ttransition: translate 0.5s !important;\n\t\t\t\twill-change: transform !important;\n\t\t\t}\n\t\t\t.services-slider__item {\n\t\t\t\tflex: 0 0 ${c}% !important;\n\t\t\t\tmargin: auto 0 !important;\n\t\t\t}\n\t\t`};r(),(()=>{for(let e=0;e<s.length;e++)s[e].addEventListener("click",(e=>{e.target.matches(".arrow-right")?(++n,n===l.length-o+1&&(n=0),t.style.transform=`translateX(-${n*c}%)`,console.log(n,c)):e.target.matches(".arrow-left")&&(--n,n<0&&(n=l.length-o),t.style.transform=`translateX(-${n*c}%)`,console.log(n,c))}))})();const a=()=>{e.clientWidth>=992?(o=3,c=Math.floor(100/o),r()):e.clientWidth>769&&e.clientWidth<992?(o=2,c=Math.floor(100/o),r()):e.clientWidth<=768&&(o=1,c=Math.floor(100/o),r())};a(),window.addEventListener("resize",a)})(),c.style.cssText="font-size: 2rem; color: black; text-align: center; padding-top: 10px;",o.addEventListener("submit",(l=>{l.preventDefault(),o.appendChild(c),c.textContent="Идет отправка ...";const s=new FormData(o);let n={};s.forEach(((e,t)=>{n[t]=e})),console.log(c),(e=>fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}))(n).then((l=>{if(200!==l.status)throw new Error("status network not 200");if(200===l.status){let l=setInterval((()=>c.textContent="Спасибо! Мы скоро с Вами свяжемся!"),0);r(),setTimeout((()=>{clearInterval(l),c.textContent="",e.style.display="none",t.style.display="none"}),5e3)}})).catch((e=>{c.textContent="Сообщение не отправлено",console.error(e)}))})),o.addEventListener("input",(e=>{const t=e.target;"tel"===t.name&&(t.setAttribute("maxlength",11),t.setAttribute("pattern","[8]{1}[0-9]{10}"),t.value=t.value.replace(/[^+\d]/g,""),/\+/.test(t.value)&&(t.setAttribute("maxlength",12),t.setAttribute("pattern","[+]{1}[0-9]{11}"))),"fio"===t.name&&(t.setAttribute("pattern","[А-Яа-яЁё]{2,}$"),t.value=t.value.replace(/[^а-яё]/gi,""))}))})();