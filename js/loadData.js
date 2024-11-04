const matzipList = document.querySelector("#matzip-list-items");

function loadMatzip() {
  const existingMatzip = JSON.parse(localStorage.getItem("boards")) || [];
  console.log(existingMatzip);

  matzipList.innerHTML = "";

  existingMatzip.forEach((matzip) => {
    const listItem = document.createElement("div");
    listItem.innerHTML = `
      <span>작성자: ${matzip.userId}</span>
      <span>제목: ${matzip.title}</span>
      <span>${matzip.date}</span>
    `;
    listItem.classList.add("matzip-list");

    matzipList.appendChild(listItem);
  });
}

loadMatzip();
