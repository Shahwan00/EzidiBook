let mediaData = { image: "", video: "" };

document.addEventListener("DOMContentLoaded", function () {
    // 1. التحقق من حالة تسجيل الدخول
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
        window.location.replace("login.html");
        return;
    }

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
        id: Date.now(), // رقم فريد للحذف
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

    textInput.value = "";
    mediaData = { image: "", video: "" };
    document.getElementById("imagePreview").style.display = "none";
    document.getElementById("videoPreview").style.display = "none";

    loadPosts();
}

function loadPosts() {
    let feed = document.getElementById("feedContainer");
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");

    if (posts.length === 0) {
        feed.innerHTML = `<p style="text-align:center; color:#888; margin-top:20px;">لا توجد منشورات حتى الآن</p>`;
        return;
    }

    let postsHTML = "";
    posts.forEach(post => {
        postsHTML += `
            <div class="post-card">
                <div class="post-header" style="position:relative;">
                    <div class="post-avatar">
                        <img src="${post.avatar}" alt="Avatar">
                    </div>
                    <div class="post-user-info">
                        <span class="post-author-name">${post.author}</span>
                        <span class="post-time">${post.time}</span>
                    </div>
                    <button onclick="deletePost(${post.id})" style="position:absolute; left:0; top:0; background:#ffebee; color:#d32f2f; border:none; padding:4px 8px; border-radius:6px; cursor:pointer; font-size:12px;">🗑️ حذف</button>
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

// دالة حذف المنشور
function deletePost(id) {
    if (confirm("هل تريد حذف هذا المنشور؟")) {
        let posts = JSON.parse(localStorage.getItem("posts") || "[]");
        posts = posts.filter(p => p.id !== id);
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
    }
}

// دالة تسجيل الخروج
function logout() {
    localStorage.setItem("isLoggedIn", "false");
    window.location.replace("login.html");
}
