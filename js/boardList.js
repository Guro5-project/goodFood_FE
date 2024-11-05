// 게시글 목록 로드 함수
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('boards')) || [];
    const postList = document.querySelector('#postList tbody');
    postList.innerHTML = ''; // 초기화
  
    posts.forEach(post => {
      const row = document.createElement('tr');
  
      const numberCell = document.createElement('td');
      numberCell.textContent = post.id;
      row.appendChild(numberCell);
  
      const titleCell = document.createElement('td');
      titleCell.textContent = post.title;
      row.appendChild(titleCell);
  
      const userCell = document.createElement('td');
      userCell.textContent = post.username;
      row.appendChild(userCell);
  
      const dateCell = document.createElement('td');
      dateCell.textContent = post.date;
      row.appendChild(dateCell);
  
      postList.appendChild(row);
    });
  }
  
  // 게시글 저장 함수
  document.getElementById("savePostBtn").addEventListener("click", function () {
    const title = document.getElementById("newPostTitle").value;
    const content = document.getElementById("newPostContent").value;
    const posts = JSON.parse(localStorage.getItem('boards')) || [];
  
    const newPost = {
      id: posts.length + 1,
      title: title,
      username: "user123", // 예시 사용자명
      date: new Date().toISOString().split("T")[0]
    };
  
    posts.push(newPost);
    localStorage.setItem('boards', JSON.stringify(posts)); // 로컬 스토리지에 저장
  
    loadPosts(); // 게시글 목록 갱신
  
    // 입력 필드 초기화 및 모달 닫기
    document.getElementById("newPostTitle").value = "";
    document.getElementById("newPostContent").value = "";
    document.getElementById("createModal").style.display = "none";
  });
  
  // 페이지 로드 시 초기화
  document.addEventListener('DOMContentLoaded', loadPosts);
  
  // 게시글 생성 버튼 클릭 시 모달 열기
document.getElementById("createPostBtn").addEventListener("click", function () {
    document.getElementById("createModal").style.display = "block";
});

// 모달 닫기 버튼 기능 추가
document.querySelector(".close-create-btn").addEventListener("click", function () {
    document.getElementById("createModal").style.display = "none";
});

// 모달 외부 클릭 시 모달 닫기
window.addEventListener("click", function (event) {
    const modal = document.getElementById("createModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
