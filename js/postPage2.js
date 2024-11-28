// 모달창 열기
function openModal() {
    document.getElementById("modal_wrapper_p2").classList.add("show");
    document.getElementById("modal_p2").classList.add("show");
    // 모달이 열릴 때 페이지의 다른 부분을 비활성화
    document.body.style.overflow = 'hidden';  // 스크롤 비활성화
}

// 모달창 닫기
function closeModal() {
    document.getElementById("modal_wrapper_p2").classList.remove("show");
    document.getElementById("modal_p2").classList.remove("show");
    // 모달이 닫힐 때 페이지의 스크롤을 다시 활성화
    document.body.style.overflow = 'auto';  // 스크롤 활성화
}

// 상세 모달 열기
function openDetailModal(postData) {
    const [title, content, image, author] = postData;

    // 상세 정보 모달에 데이터 채우기
    document.getElementById('detail_title_text_p2').textContent = title;
    document.getElementById('detail_author_text_p2').textContent = author;
    document.getElementById('detail_content_text_p2').textContent = content;

    const detailPreviewImg = document.getElementById('detail_previewImg');
    detailPreviewImg.src = image;
    detailPreviewImg.style.display = "block"; // 이미지 표시

    // 상세 모달 보이기
    const modalWrapper = document.getElementById("modal_detail_p2");
    modalWrapper.style.display = "flex";
    document.body.style.overflow = "hidden"; // 스크롤 비활성화
}

// 상세 모달 닫기
function closeDetailModal() {
    const modalWrapper = document.getElementById("modal_detail_p2");
    modalWrapper.style.display = "none";
    document.body.style.overflow = "auto"; // 스크롤 활성화
}

// 모달 외부를 클릭했을 때 닫히는 이벤트 추가
document.getElementById("modal_wrapper_p2").addEventListener("click", function(event) {
    if (event.target === document.getElementById("modal_wrapper_p2")) {
        closeModal();
    }
});

function emptyMessageShow() {
    const emptyMessage = document.getElementById('emptyMessage');
    if (emptyMessage) {
        emptyMessage.style.display = 'none'; // 게시글이 있으면 "게시글이 없습니다" 메시지 숨김
    }
}

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

// 글 작성 후 카드 추가
function submitPost() {
    const title = document.getElementById('title_p2').value;
    const content = document.getElementById('content_p2').value;
    const previewImg = document.getElementById('previewImg');  // 미리보기 이미지
    const image = previewImg.src;  // 선택된 이미지 URL 가져오기
    const author = "익명 사용자"; // 글 작성자(익명 사용자)
    const uploadDate = new Date().toLocaleDateString('ko-KR');
    const uploadTime = new Date().toLocaleTimeString(); 
    const dateTime = `${uploadDate} | ${uploadTime}`; // 작성일자 표시
    const views = 0; // 조회 수 초기값

    emptyMessageShow();
   

    // 이미지 URL이 유효한지 확인
    if (!image || image === "data:," || image === "" || image === "null") {
        alert('이미지가 업로드되지 않았습니다.');
        return; // 이미지가 없으면 글 작성 불가
    }


    if (title && content) {
        let boards = JSON.parse(localStorage.getItem('boards')) || [];

        const newPost = [title, content, image, author, dateTime, views];
        boards.push(newPost);

        // 로컬 스토리지 업데이트
        localStorage.setItem('boards', JSON.stringify(boards));

        // 게시판 화면 업데이트
        addPostToUI(newPost);

        // 모달 닫기 및 폼 초기화
        closeModal();
        resetModal(); 
    } else {
        alert('제목과 내용을 입력해주세요.');
    }
}

// 게시글 UI 추가 함수
function addPostToUI(postData) {
    const [title, content, image, author, dateTime, views] = postData;

    const cardDeck = document.getElementById('postCards_p2');

    // 새로운 카드 요소 생성
    const cardElement = document.createElement('div');
    cardElement.classList.add('card', 'mb-3', 'postItem_p2');
    cardElement.style.maxWidth = '540px';

    // 카드 이미지 영역 
    const img = document.createElement('img');
    img.src = image;  
    img.classList.add('card-img-top', 'thumbnail_p2');
    img.alt = "대표 이미지";

    // 카드 본문 영역
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'postItem_body_p2');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title', 'postItem_title_p2');
    cardTitle.textContent = title;

    // 작성자 영역

    const authorText = document.createElement('p');
    authorText.classList.add('card-text', 'postItem_text_p2');
    authorText.textContent = author;

    const smallText = document.createElement('p');
    smallText.classList.add('card-text', 'postItem_text_p2');

    const small = document.createElement('small');
    small.classList.add('text-body-secondary');
    small.textContent = `${dateTime} | 조회수: ${views}`;
    smallText.appendChild(small);

     // 카드 클릭 이벤트 추가
     cardElement.onclick = function () {
        openDetailModal(postData);
    };

    // 카드 요소를 결합
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(authorText);
    cardBody.appendChild(smallText);

    // 카드에 이미지와 본문 결합
    cardElement.appendChild(img);   
    cardElement.appendChild(cardBody); 

    cardDeck.appendChild(cardElement);
}

// // 페이지 로드 시 로컬 스토리지에서 게시글 데이터 불러오기
window.onload = function() {
    try {
        const boards = JSON.parse(localStorage.getItem('boards')) || [];
        if (Array.isArray(boards) && boards.length > 0) {
            emptyMessageShow();
            boards.forEach((post) => {
                if (Array.isArray(post)) {
                    addPostToUI(post); // 올바른 형식의 데이터를 전달
                } else {
                    console.error("Invalid post format:", post); // 디버깅용 메시지
                }
            });
        }
    } catch (error) {
        console.error("Error parsing boards from localStorage:", error);
    }
};


// 게시글 작성 모달 초기화 함수
function resetModal() {

    // 제목과 내용 초기화
    document.getElementById('title_p2').value = '';
    document.getElementById('content_p2').value = '';

    // 이미지 미리보기 초기화
    document.getElementById('previewImg').style.display = 'none';  // 미리보기 이미지 숨기기

    // 파일 입력 초기화
    document.getElementById('image_p2').value = '';  // 파일 입력 필드 초기화
}