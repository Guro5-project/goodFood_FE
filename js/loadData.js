document.addEventListener("DOMContentLoaded", function() {
  const header = document.querySelector("#header");
  const headerHeight = header.offsetHeight; 

  const boardList = document.querySelector(".board-list");
  boardList.style.marginTop = `${headerHeight + 200}px`;
});

const matzipList = document.querySelector("#matzip-list-items");

function loadMatzip() {
  const existingMatzip = JSON.parse(localStorage.getItem("boards")) || [];
  console.log(existingMatzip);

  const latestMatzip = existingMatzip.slice(-6); 

  matzipList.innerHTML = ""; 

  const chunkedMatzip = [];
  for (let i = 0; i < latestMatzip.length; i += 3) {
    chunkedMatzip.push(latestMatzip.slice(i, i + 3));  // 3개씩 묶음
  }

  chunkedMatzip.forEach((chunk) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    chunk.forEach((matzip) => {
      const randomNum = Math.floor(Math.random() * 7) + 1;

      const listItem = document.createElement("div");
      listItem.classList.add("matzip-list");

      listItem.innerHTML = `
        ${
          matzip.image
            ? `<img class="board-image" src="${matzip.image}" alt="게시글 이미지" />`
            : `<img class="board-image" src="../images/${randomNum}.png" alt="게시글 이미지" />`
        }
        <div>
          <span>작성자: ${matzip.userId}</span>
          <span>제목: ${matzip.title}</span>
          <span class="board-content">내용: ${matzip.content}</span>
          <span>${matzip.date}</span>
        </div>
      `;
      slide.appendChild(listItem); 
    });

    matzipList.appendChild(slide);
  });

  new Swiper('.swiper-container', {
    slidesPerView: 1,          
    spaceBetween: 10,          
    loop: true,                
    pagination: {
      el: '.swiper-pagination',  
      clickable: true,           
    },
    navigation: {
      nextEl: '.swiper-button-next',  
      prevEl: '.swiper-button-prev',  
    },
  });
}

loadMatzip();