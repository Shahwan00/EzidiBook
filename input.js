let userImageData = ""; // متغير لحفظ نص الصورة

document.addEventListener("DOMContentLoaded", function () {
    let photoInput = document.getElementById("photo");
    if (photoInput) {
        photoInput.onchange = function () {
            const file = this.files[0];
            if (file) {
                let preview = document.getElementById("preview");
                let plus = document.getElementById("plus");
                
                // تحويل الصورة إلى Base64 للحفظ
                const reader = new FileReader();
                reader.onload = function (e) {
                    userImageData = e.target.result;
                    preview.src = userImageData;
                    preview.style.display = "block";
                    plus.style.display = "none";
                };
                reader.readAsDataURL(file);
            }
        };
    }

    let birthInput = document.getElementById("birth");
    if (birthInput) {
        birthInput.onchange = function () {
            let d = new Date(this.value);
            let day = d.getDate();
            let month = d.getMonth() + 1;
            let zodiac = "";

            if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) zodiac = "الحمل";
            else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) zodiac = "الثور";
            else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) zodiac = "الجوزاء";
            else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) zodiac = "السرطان";
            else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) zodiac = "الأسد";
            else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) zodiac = "العذراء";
            else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) zodiac = "الميزان";
            else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) zodiac = "العقرب";
            else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) zodiac = "القوس";
            else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) zodiac = "الجدي";
            else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) zodiac = "الدلو";
            else zodiac = "الحوت";

            document.getElementById("zodiac").value = zodiac;
        };
    }

    let registerBtn = document.getElementById("register");
    if (registerBtn) {
        registerBtn.onclick = function () {
            let photo = document.getElementById("photo").files.length;
            let name = document.getElementById("fullnameInput").value.trim();
            let email = document.querySelector('input[type="email"]').value.trim();
            let pass = document.querySelectorAll('input[type="password"]')[0].value;
            let pass2 = document.querySelectorAll('input[type="password"]')[1].value;

            if (photo == 0) { alert("الرجاء اختيار صورة شخصية"); return; }
            if (name == "") { alert("الرجاء إدخال الاسم الثلاثي"); return; }
            if (email == "") { alert("الرجاء إدخال البريد الإلكتروني"); return; }
            if (pass == "") { alert("الرجاء إدخال كلمة المرور"); return; }
            if (pass2 == "") { alert("الرجاء تأكيد كلمة المرور"); return; }
            if (pass != pass2) { alert("كلمتا المرور غير متطابقتين"); return; }

            let birth = document.getElementById("birth").value;
            if (birth == "") { alert("الرجاء اختيار تاريخ الميلاد"); return; }

            let social = document.getElementById("social").value;
            if (social == "اختر الحالة الاجتماعية") { alert("الرجاء اختيار الحالة الاجتماعية"); return; }

            let gender = document.getElementById("gender").value;
            if (gender == "⚥اختر الجنس") { alert("الرجاء اختيار الجنس"); return; }

            let ezidiClass = document.getElementById("ezidiClass").value;
            if (ezidiClass == "هل حضرتك من أي طبقة اجتماعية إيزيدية؟") { alert("الرجاء اختيار الطبقة الاجتماعية الإيزيدية"); return; }

            let country = document.getElementById("country").value;
            if (country == "اختر الدولة") { alert("الرجاء اختيار الدولة"); return; }

            let region = document.getElementById("region").value.trim();
            if (region == "") { alert("الرجاء إدخال المنطقة"); return; }

            let job = document.getElementById("job").value.trim();
            if (job == "") { alert("الرجاء إدخال المهنة"); return; }

            let selectedLangs = Array.from(document.querySelectorAll('input[name="lang"]:checked')).map(cb => cb.value);
            if (selectedLangs.length === 0) { alert("الرجاء اختيار لغة واحدة على الأقل"); return; }

            let level = document.getElementById("level").value;
            if (level == "مستوى اللغة") { alert("الرجاء اختيار مستوى اللغة"); return; }

            // حفظ الصورة المترجمة إلى نص
            localStorage.setItem("userAvatar", userImageData);

            // حفظ كافة البيانات
            localStorage.setItem("fullname", name);
            localStorage.setItem("birth", birth);
            localStorage.setItem("zodiac", document.getElementById("zodiac").value);
            localStorage.setItem("social", social);
            localStorage.setItem("gender", gender);
            localStorage.setItem("ezidiClass", ezidiClass);
            localStorage.setItem("country", country);
            localStorage.setItem("region", region);
            localStorage.setItem("job", job);
            localStorage.setItem("language", selectedLangs.join(", "));
            localStorage.setItem("level", level);

            window.location.href = "profile.html";
        };
    }
});
