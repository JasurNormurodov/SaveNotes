// window.onbeforeunload = function () {
//     window.scrollTo(0, 0);
//   }
// if(window.location.href==='http://localhost:3000/#position'){

//     // window.location.href = "http://localhost:3000/";
//     window.history.back();

// }
// console.log(window.location.href)

const innerLink = document.getElementById("innerLink");
const toTop=document.querySelector('.fa-chevron-up');
const footer=document.querySelector('footer');

innerLink.onclick = () => {
  if (innerLink.textContent === "ABOUT") {
    innerLink.textContent = "LOGIN";
    innerLink.href = "#about";
  } else {
    innerLink.textContent = "ABOUT";
    innerLink.href = "#";
  }
};

window.onscroll = () => {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  console.log(scrolled)
  if (scrolled === 0) {
    innerLink.textContent = "ABOUT";
    innerLink.href = "#";
  } else if (scrolled > 20) {
    document.querySelector(".to-top").classList.remove("d-none");
    innerLink.textContent = "LOGIN";
    innerLink.href = "#about";
  } 
  
  
  else {
    document.querySelector(".to-top").classList.add("d-none");
  }
  document.getElementById("myBar").style.width = scrolled + "%";
  showVisible();
};

//Function to check whether an element is visible
function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

  // top elem edge is visible?
  let topVisible = coords.top > 350 && coords.top < windowHeight;

  // bottom elem edge is visible?
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}

//Load visible elements
let rows=document.querySelectorAll('.row');
function showVisible() {
 
  // console.log('rows', rows)
  for (let i=1;i<rows.length;i++) {
    
    // if (!realSrc) continue;
    if(isVisible(footer)){
      toTop.classList.add('text-white')
    }
    else if(!isVisible(footer)){
      toTop.classList.remove('text-white')
    }
    if (isVisible(rows[i])) {
      // console.log(rows[i])
      let slideElements = rows[i].getElementsByClassName('slideElement');
      // console.log(slideElements)
      // rows[i].classList.add('bg-danger')
      for(const elem of slideElements){
        elem.classList.add('to-zero');
      }
    }
  }
}

showVisible();
// window.onscroll = showVisible;

document.querySelector('#mailto').addEventListener('click',()=>{
  document.querySelector('.email').classList.add('to-zero');
  // On click, get href and remove 'mailto:'
  // Store email address in a variable.
    copyToClipboard('mynotes.techsup@gmail.com');
})
document.querySelector('#mailto').addEventListener('mouseleave',()=>{
  document.querySelector('.email').classList.remove('to-zero');
  
})


  
// Copies the email variable to clipboard
function copyToClipboard(text) {
  const input = document.createElement("input");
  document.body.appendChild(input);
  input.setAttribute('value', text);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}
