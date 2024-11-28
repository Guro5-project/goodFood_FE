// 모달창 열기
function openModal() {
    document.getElementById("createModal").style.display = "block";
    document.getElementById("modal_p2").style.display = "block";

    // 모달이 열릴 때 페이지의 다른 부분을 비활성화
    document.body.style.overflow = 'hidden';  // 스크롤 비활성화
}

// 모달창 닫기
function closeModal() {
    document.getElementById("createModal").style.display = "none";
    document.getElementById("modal_p2").style.display = "none";
    // 모달이 닫힐 때 페이지의 스크롤을 다시 활성화
    document.body.style.overflow = 'auto';  // 스크롤 활성화
}

// 모달 외부를 클릭했을 때 닫히는 이벤트 추가
document.getElementById("createModal").addEventListener("click", function(event) {
    if (event.target === document.getElementById("createModal")) {
        closeModal();
    }
});

// 이미지 미리보기 함수
function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        const previewImg = document.getElementById("previewImg");
        previewImg.src = reader.result;
        previewImg.style.display = "block";  // 이미지가 업로드되면 보이게 설정
    };

    if (file) {
        reader.readAsDataURL(file);  // 이미지 파일을 Data URL로 변환하여 미리보기
    }
}


// 게시글 작성 모달 초기화 함수
function resetModal() {

    // 제목과 내용 초기화
    document.getElementById('newPostTitle').value = '';
    document.getElementById('newPostContent').value = '';

    // 이미지 미리보기 초기화
    document.getElementById('previewImg').style.display = 'none';  // 미리보기 이미지 숨기기

    // 파일 입력 초기화
    document.getElementById('newPostImage').value = '';  // 파일 입력 필드 초기화
}

let currentPage = 1;
const postsPerPage = 5;

/**
 * 게시글 데이터를 로드하고 테이블에 추가
 */
function loadPosts() {
    const postsData = localStorage.getItem("boards");
    const posts = postsData ? JSON.parse(postsData) : [];
    const tableBody = document.querySelector("#postsTable tbody");
    const pagination = document.getElementById("pagination");
    tableBody.innerHTML = "";

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    paginatedPosts.forEach((post, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td><a href="postDetail.html?index=${startIndex + index}" class="post-link" data-index="${startIndex + index}">${post.title}</a></td>
            <td>${post.username}</td>
            <td>${post.date}</td>
            <td>${post.views}</td>
        `;
        tableBody.appendChild(row);
    });


    const totalPages = Math.ceil(posts.length / postsPerPage);
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerHTML = i;
        pageButton.classList.add("btn", "btn-link", "mx-1");
        if (i === currentPage) {
            pageButton.style.fontWeight = "bold";
        }
        pageButton.onclick = function () {
            currentPage = i;
            loadPosts();
        };
        pagination.appendChild(pageButton);
    }

    // 제목 클릭 이벤트 추가
    document.querySelectorAll(".post-link").forEach((link) => {
        link.addEventListener("click", function (event) {
            const index = parseInt(link.dataset.index, 10);
            increaseViewCount(index);
        });
    });

    // 상위 게시글 표시
    displayTopPosts();

    resetModal();
}

/**
 * 조회수 증가
 */
function increaseViewCount(index) {
    const postsData = localStorage.getItem("boards");
    if (!postsData) return;
    const posts = JSON.parse(postsData);
    if (posts[index]) {
        posts[index].views = (posts[index].views || 0) + 1; // 조회수 증가
        localStorage.setItem("boards", JSON.stringify(posts)); // 변경된 데이터 저장
        loadPosts(); // 테이블 업데이트
    }
}

/**
 * 페이지 로드 시 게시글 데이터를 로드
 */
document.addEventListener("DOMContentLoaded", loadPosts);

/**
 * 글쓰기 버튼 클릭 이벤트
 */
document.getElementById("createPostBtn").addEventListener("click", function () {
    document.getElementById("newPostTitle").value = "";
    document.getElementById("newPostContent").value = "";
    document.getElementById("newPostImage").value = "";
    document.getElementById("createModal").style.display = "block";
});

/**
 * 새 게시글 저장
 */
document.getElementById("savePostBtn").addEventListener("click", function () {
    const title = document.getElementById("newPostTitle").value;
    const content = document.getElementById("newPostContent").value;
    const image = document.getElementById("newPostImage").files[0];

    if (title && content) {
        if (image) {
            // 이미지를 Base64로 변환
            const reader = new FileReader();
            reader.onload = function (event) {
                const base64Image = event.target.result;
                savePostToLocalStorage(title, content, base64Image); // Base64 이미지 저장
            };
            reader.readAsDataURL(image);
        } else {
            savePostToLocalStorage(title, content, ""); // 이미지가 없으면 빈 문자열 저장
        }
    } else {
        alert("제목과 내용을 모두 입력해주세요.");
    }
});

/**
 * 게시글 데이터를 로컬 스토리지에 저장
 */
function savePostToLocalStorage(title, content, image) {
    const postsData = localStorage.getItem("boards");
    const posts = postsData ? JSON.parse(postsData) : [];
    const newPost = {
        title,
        content,
        username: localStorage.getItem("currentUser") || "익명 사용자",
        date: new Date().toLocaleString(),
        views: 0,
        image, // Base64 이미지 저장
    };
    posts.push(newPost);
    localStorage.setItem("boards", JSON.stringify(posts));
    document.getElementById("createModal").style.display = "none";
    loadPosts();
}

/**
 * 조회 수 기준 상위 3개 게시글 가져오기
 */
function getTopPosts() {
    const postsData = localStorage.getItem("boards");
    const posts = postsData ? JSON.parse(postsData) : [];

    // 조회수 기준으로 정렬
    posts.sort((a, b) => (b.views || 0) - (a.views || 0));

    // 상위 3개 게시글 반환
    return posts.slice(0, 3);
}

/**
 * 상위 3개 게시글을 카드 뷰로 표시
 */
function displayTopPosts() {
    const topPosts = getTopPosts();
    const topPostsContainer = document.getElementById("topPosts");
    topPostsContainer.innerHTML = ""; // 기존 카드 초기화

    topPosts.forEach((post) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.width = "18rem";
        card.style.transition = "transform 0.3s ease"; // 호버 효과 추가

        // 카드 호버 시 확대 효과
        card.onmouseover = () => {
            card.style.transform = "scale(1.05)";
        };
        card.onmouseout = () => {
            card.style.transform = "scale(1)";
        };

        const img = document.createElement("img");
        img.src = post.image || "default.jpg"; // 이미지가 없으면 기본 이미지 사용
        img.className = "card-img-top";
        img.alt = "게시글 이미지";
        img.style.objectFit = "cover"; // 이미지 비율 유지하며 채우기
        img.style.height = "200px"; // 이미지 높이 고정
        img.style.width = "100%"; // 이미지 너비 고정

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = post.title;

        const author = document.createElement("p");
        author.className = "card-text";
        author.textContent = `작성자: ${post.username}`;

        const date = document.createElement("p");
        date.className = "card-text";
        date.textContent = `작성일: ${post.date}`;

        cardBody.appendChild(title);
        cardBody.appendChild(author);
        cardBody.appendChild(date);
        card.appendChild(img);
        card.appendChild(cardBody);

        topPostsContainer.appendChild(card);
    });
}


// 상세 모달 열기
// function openDetailModal(postData) {
//     const [title, content, image, author] = postData;

//     // 상세 정보 모달에 데이터 채우기
//     document.getElementById('detail_title_text_p2').textContent = title;
//     document.getElementById('detail_author_text_p2').textContent = author;
//     document.getElementById('detail_content_text_p2').textContent = content;

//     const detailPreviewImg = document.getElementById('detail_previewImg');
//     detailPreviewImg.src = image;
//     detailPreviewImg.style.display = "block"; // 이미지 표시

//     // 상세 모달 보이기
//     const modalWrapper = document.getElementById("modal_detail_p2");
//     modalWrapper.style.display = "flex";
//     document.body.style.overflow = "hidden"; // 스크롤 비활성화
// }

// 상세 모달 닫기
// function closeDetailModal() {
//     const modalWrapper = document.getElementById("modal_detail_p2");
//     modalWrapper.style.display = "none";
//     document.body.style.overflow = "auto"; // 스크롤 활성화
// }

// 게시글이 있으면 "게시글이 없습니다" 메시지 숨김
// function emptyMessageShow() {
//     const emptyMessage = document.getElementById('emptyMessage');
//     if (emptyMessage) {
//         emptyMessage.style.display = 'none'; 
//     }
// }

// 글 작성 후 카드 추가
// function submitPost() {
//     const title = document.getElementById('newPostTitle').value;
//     const content = document.getElementById('newPostContent').value;
//     const previewImg = document.getElementById('previewImg');  
//     const image = previewImg.src;  
//     const author = "익명 사용자"; 
//     const uploadDate = new Date().toLocaleDateString('ko-KR');
//     const uploadTime = new Date().toLocaleTimeString(); 
//     const dateTime = `${uploadDate} | ${uploadTime}`; 
//     const views = 0; 

//     emptyMessageShow();
   

    
//     if (!image || image === "data:," || image === "" || image === "null") {
//         alert('이미지가 업로드되지 않았습니다.');
//         return; 
//     }


//     if (title && content) {
//         let boards = JSON.parse(localStorage.getItem('boards')) || [];

//         const newPost = [title, content, image, author, dateTime, views];
//         boards.push(newPost);

        
//         localStorage.setItem('boards', JSON.stringify(boards));

        
//         addPostToUI(newPost);

        
//         closeModal();
//         resetModal(); 
//     } else {
//         alert('제목과 내용을 입력해주세요.');
//     }
//}

// 게시글 UI 추가 함수
// function addPostToUI(postData) {
//     const [title, content, image, author, dateTime, views] = postData;

//     const cardDeck = document.getElementById('postCards_p2');

//     const cardElement = document.createElement('div');
//     cardElement.classList.add('card', 'mb-3', 'postItem_p2');
//     cardElement.style.maxWidth = '540px';

//     const img = document.createElement('img');
//     img.src = image;  
//     img.classList.add('card-img-top', 'thumbnail_p2');
//     img.alt = "대표 이미지";

//     const cardBody = document.createElement('div');
//     cardBody.classList.add('card-body', 'postItem_body_p2');

//     const cardTitle = document.createElement('h5');
//     cardTitle.classList.add('card-title', 'postItem_newPostTitle');
//     cardTitle.textContent = title;

//     const authorText = document.createElement('p');
//     authorText.classList.add('card-text', 'postItem_text_p2');
//     authorText.textContent = author;

//     const smallText = document.createElement('p');
//     smallText.classList.add('card-text', 'postItem_text_p2');

//     const small = document.createElement('small');
//     small.classList.add('text-body-secondary');
//     small.textContent = `${dateTime} | 조회수: ${views}`;
//     smallText.appendChild(small);

//      cardElement.onclick = function () {
//         openDetailModal(postData);
//     };

//     cardBody.appendChild(cardTitle);
//     cardBody.appendChild(authorText);
//     cardBody.appendChild(smallText);

//     cardElement.appendChild(img);   
//     cardElement.appendChild(cardBody); 

//     cardDeck.appendChild(cardElement);
// }

// 페이지 로드 시 로컬 스토리지에서 게시글 데이터 불러오기
// window.onload = function() {
//     try {
//         const boards = JSON.parse(localStorage.getItem('boards')) || [];
//         if (Array.isArray(boards) && boards.length > 0) {
//             emptyMessageShow();
//             boards.forEach((post) => {
//                 if (Array.isArray(post)) {
//                     addPostToUI(post); // 올바른 형식의 데이터를 전달
//                 } else {
//                     console.error("Invalid post format:", post); // 디버깅용 메시지
//                 }
//             });
//         }
//     } catch (error) {
//         console.error("Error parsing boards from localStorage:", error);
//     }
// };

