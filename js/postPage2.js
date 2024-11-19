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
    const image = document.getElementById('previewImg').src;  // 선택된 이미지 URL 가져오기

    // 이미지 URL이 유효한지 확인
    if (!image || image === "data:," || image === "") {
        alert('이미지가 업로드되지 않았습니다.');
        return; // 이미지가 없으면 글 작성 불가
    }

    if (title && content) {
        const cardDeck = document.getElementById('postCards_p2');

        // 새로운 카드 요소 생성
        const card = document.createElement('div');
        card.classList.add('col-12', 'mb-3');

        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'mb-3');
        cardElement.style.maxWidth = '540px';

        const row = document.createElement('div');
        row.classList.add('row', 'g-0');

        // 카드 이미지 영역
        const colImage = document.createElement('div');
        colImage.classList.add('col-md-4');

        const img = document.createElement('img');
        img.src = image;  // 업로드된 이미지 사용
        img.classList.add('img-fluid', 'rounded-start');
        img.alt = "대표 이미지";

         // 이미지 크기 강제 설정
         img.width = 150; // 너비를 150px로 설정
         img.height = 150; // 높이를 150px로 설정

        // 카드 본문 영역
        const colBody = document.createElement('div');
        colBody.classList.add('col-md-8');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = title;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = content;

        const smallText = document.createElement('p');
        smallText.classList.add('card-text');
        const small = document.createElement('small');
        small.classList.add('text-body-secondary');
        small.textContent = 'Last updated 3 mins ago';
        smallText.appendChild(small);

        // 카드 요소를 결합
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(smallText);

        colBody.appendChild(cardBody);
        row.appendChild(colImage);
        row.appendChild(colBody);

        cardElement.appendChild(row);
        card.appendChild(cardElement);
        cardDeck.appendChild(card);

        // 모달 닫기 및 폼 초기화
        closeModal();
        document.getElementById('title_p2').value = '';
        document.getElementById('content_p2').value = '';
        document.getElementById('previewImg').style.display = 'none';  // 미리보기 이미지 숨기기
    } else {
        alert('제목과 내용을 입력해주세요.');
    }
}

