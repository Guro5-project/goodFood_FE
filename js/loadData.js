const matzipList = document.querySelector("#matzip-list-items");

function loadMatzip() {
  const existingMatzip = JSON.parse(localStorage.getItem("boards")) || [];
  console.log(existingMatzip);

  const latestMatzip = existingMatzip.slice(-6);

  matzipList.innerHTML = "";

  latestMatzip.forEach((matzip) => {
    const listItem = document.createElement("div");
    const randomNum = Math.floor(Math.random() * 7) + 1;

    listItem.innerHTML = `
      ${
        matzip.image
          ? `<img class="board-image" src="${matzip.image}" alt="게시글 이미지" />`
          : `<img class="board-image" src="../images/${randomNum}.png"`
      }
      <div>
        <span>작성자: ${matzip.userId}</span>
        <span>제목: ${matzip.title}</span>
        <span class="board-content">내용: ${matzip.content}</span>
        <span>${matzip.date}</span>
      </div>
    `;
    listItem.classList.add("matzip-list");

    matzipList.appendChild(listItem);
  });
}

loadMatzip();
