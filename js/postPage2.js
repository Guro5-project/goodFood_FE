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

// 모달 외부를 클릭했을 때 닫히는 이벤트 추가
document.getElementById("modal_wrapper_p2").addEventListener("click", function(event) {
    if (event.target === document.getElementById("modal_wrapper_p2")) {
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

// 글 작성 후 카드 추가
function submitPost() {
    const title = document.getElementById('title_p2').value;
    const content = document.getElementById('content_p2').value;
    const previewImg = document.getElementById('previewImg');  // 미리보기 이미지

    // 이미지 URL이 유효한지 확인
    const image = previewImg.src;  // 선택된 이미지 URL 가져오기

    // 이미지 URL이 유효한지 확인
    if (!image || image === "data:," || image === "" || image === "null") {
        alert('이미지가 업로드되지 않았습니다.');
        return; // 이미지가 없으면 글 작성 불가
    }

    // "게시글이 없습니다" 메시지 숨기기
    const emptyMessage = document.getElementById('emptyMessage');
    if (emptyMessage) {
        emptyMessage.style.display = 'none';
    }

    if (title && content) {
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

        const cardText = document.createElement('p');
        cardText.classList.add('card-text', 'postItem_text_p2');
        cardText.textContent = content;

        const smallText = document.createElement('p');
        smallText.classList.add('card-text', 'postItem_text_p2');

        // 작성일자 표시 (현재 시간)
        const uploadDate = new Date().toLocaleDateString('ko-KR');
        const uploadTime = new Date().toLocaleTimeString();
        const small = document.createElement('small');
        small.classList.add('text-body-secondary');
        small.textContent = uploadDate + " | " + uploadTime;
        smallText.appendChild(small);

        // 카드 요소를 결합
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(smallText);

        // 카드에 이미지와 본문 결합
        cardElement.appendChild(img);   
        cardElement.appendChild(cardBody); 

        cardDeck.appendChild(cardElement);

        // 모달 닫기 및 폼 초기화
        closeModal();
        resetModal(); 
    } else {
        alert('제목과 내용을 입력해주세요.');
    }
}



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