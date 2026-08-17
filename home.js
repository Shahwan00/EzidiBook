let mediaData = { image: "", video: "" };

document.addEventListener("DOMContentLoaded", function () {
    let imgInput = document.getElementById("postImage");
    let videoInput = document.getElementById("postVideo");

    if (imgInput) {
        imgInput.onchange = function () {
            let file = this.files[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    mediaData.image = e.target.result;
                    let imgPreview = document.getElementById("imagePreview");
                    imgPreview.src = mediaData.image;
                    imgPreview.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        };
    }

    if (videoInput) {
        videoInput.onchange = function () {
            let file = this.files[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    mediaData.video = e.target.result;
                    let videoPreview = document.getElementById("videoPreview");
                    videoPreview.src = mediaData.video;
                    videoPreview.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        };
    }

    loadPosts();
});

function addNewPost() {
    let textInput = document.getElementById("postInput");
    let text = textInput.value.trim();

    if (!text && !mediaData.image && !mediaData.video) {
        alert("الرجاء كتابة نص أو اختيار صورة/فيديو للنشر");
        return;
    }

    let savedName = localStorage.getItem("fullname") || "اسم المستخدم";
    let savedAvatar = localStorage.getItem("userAvatar") || "https://via.placeholder.com/40";

    let newPost = {
        author: savedName,
        avatar: savedAvatar,
        text: text,
        image: mediaData.image,
        video: mediaData.video,
        time: "الآن"
    };

    let posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    // إعادة تعيين الحقول
    textInput.value = "";
    mediaData = { image: "", video: "" };
    document.getElementById("imagePreview").style.display = "none";
    document.getElementById("videoPreview").style.display = "none";

    loadPosts();
}

function loadPosts() {
    let feed = document.getElementById("feedContainer");
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");

    if (posts.length === 0) return;

    let postsHTML = "";
    posts.forEach(post => {
        postsHTML += `
            <div class="post-card">
                <div class="post-header">
                    <div class="post-avatar">
                        <img src="${post.avatar}" alt="Avatar">
                    </div>
                    <div class="post-user-info">
                        <span class="post-author-name">${post.author}</span>
                        <span class="post-time">${post.time}</span>
                    </div>
                </div>

                ${post.text ? `<div class="post-text">${post.text}</div>` : ""}

                ${post.image ? `<div class="post-media"><img src="${post.image}"></div>` : ""}

                ${post.video ? `<div class="post-media"><video controls style="width:100%; border-radius:10px;"><source src="${post.video}"></video></div>` : ""}

                <div class="post-actions">
                    <button class="action-btn">❤️ <span>إعجاب</span></button>
                    <button class="action-btn">💬 <span>تعليق</span></button>
                    <button class="action-btn">🎙️ <span>صوتي</span></button>
                    <button class="action-btn">🔄 <span>مشاركة</span></button>
                    <button class="action-btn">✈️ <span>إرسال</span></button>
                </div>
            </div>
        `;
    });

    feed.innerHTML = postsHTML;
}
