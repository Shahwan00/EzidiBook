let userImageData = "";

document.addEventListener("DOMContentLoaded", function () {
    let photoInput = document.getElementById("photo");
    if (photoInput) {
        photoInput.onchange = function () {
            const file = this.files[0];
            if (file) {
                let preview = document.getElementById("preview");
                let plus = document.getElementById("plus");
                
                const reader = new FileReader();
                reader.onload = function (e) {
                    userImageData = e.target.result;
                    if(preview) {
                        preview.src = userImageData;
                        preview.style.display = "block";
                    }
                    if(plus) plus.style.display = "none";
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

            let zodiacInput = document.getElementById("zodiac");
            if(zodiacInput) zodiacInput.value = zodiac;
        };
    }

    let registerBtn = document.getElementById("register");
    if (registerBtn) {
        registerBtn.onclick = function (e) {
            e.preventDefault();

            // 1. قراءة البيانات بطريقة آمنة لمنع تعطل الكود
            let photoEl = document.getElementById("photo");
            let photo = (photoEl && photoEl.files) ? photoEl.files.length : 0;

            let nameEl = document.getElementById("fullnameInput");
            let name = nameEl ? nameEl.value.trim() : "";

            let emailEl = document.querySelector('input[type="email"]');
            let email = emailEl ? emailEl.value.trim() : "";

            let passInputs = document.querySelectorAll('input[type="password"]');
            let pass = passInputs.length > 0 ? passInputs[0].value : "";
            let pass2 = passInputs.length > 1 ? passInputs[1].value : "";

            let birthEl = document.getElementById("birth");
            let birth = birthEl ? birthEl.value : "";

            let socialEl = document.getElementById("social");
            let social = socialEl ? socialEl.value : "";

            let genderEl = document.getElementById("gender");
            let gender = genderEl ? genderEl.value : "";

            let ezidiEl = document.getElementById("ezidiClass");
            let ezidiClass = ezidiEl ? ezidiEl.value : "";

            let countryEl = document.getElementById("country");
            let country = countryEl ? countryEl.value : "";

            let regionEl = document.getElementById("region");
            let region = regionEl ? regionEl.value.trim() : "";

            let jobEl = document.getElementById("job");
            let job = jobEl ? jobEl.value.trim() : "";

            let selectedLangs = Array.from(document.querySelectorAll('input[name="lang"]:checked')).map(cb => cb.value);

            let levelEl = document.getElementById("level");
            let level = levelEl ? levelEl.value : "";

            let zodiacEl = document.getElementById("zodiac");
            let zodiacVal = zodiacEl ? zodiacEl.value : "";

            let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            // 2. التحقق من الحقول
            if (photo === 0) { alert("الرجاء اختيار صورة شخصية"); return; }
            if (name === "") { alert("الرجاء إدخال الاسم الثلاثي"); return; }
            if (email === "") { alert("الرجاء إدخال البريد الإلكتروني"); return; }
            if (!emailPattern.test(email)) { alert("الرجاء إدخال بريد إلكتروني صحيح"); return; }
            if (pass === "") { alert("الرجاء إدخال كلمة المرور"); return; }
            if (pass2 === "") { alert("الرجاء تأكيد كلمة المرور"); return; }
            if (pass !== pass2) { alert("كلمتا المرور غير متطابقتين"); return; }
            if (birth === "") { alert("الرجاء اختيار تاريخ الميلاد"); return; }
            if (social === "اختر الحالة الاجتماعية" || social === "") { alert("الرجاء اختيار الحالة الاجتماعية"); return; }
            if (gender === "⚥اختر الجنس" || gender === "") { alert("الرجاء اختيار الجنس"); return; }
            if (ezidiClass === "هل حضرتك من أي طبقة اجتماعية إيزيدية؟" || ezidiClass === "") { alert("الرجاء اختيار الطبقة الاجتماعية الإيزيدية"); return; }
            if (country === "اختر الدولة" || country === "") { alert("الرجاء اختيار الدولة"); return; }
            if (region === "") { alert("الرجاء إدخال المنطقة"); return; }
            if (job === "") { alert("الرجاء إدخال المهنة"); return; }
            if (selectedLangs.length === 0) { alert("الرجاء اختيار لغة واحدة على الأقل"); return; }
            if (level === "مستوى اللغة" || level === "") { alert("الرجاء اختيار مستوى اللغة"); return; }

            // 3. حفظ البيانات بنجاح
            localStorage.setItem("userAvatar", userImageData);
            localStorage.setItem("fullname", name);
            localStorage.setItem("email", email);
            localStorage.setItem("password", pass);
            localStorage.setItem("birth", birth);
            localStorage.setItem("zodiac", zodiacVal);
            localStorage.setItem("social", social);
            localStorage.setItem("gender", gender);
            localStorage.setItem("ezidiClass", ezidiClass);
            localStorage.setItem("country", country);
            localStorage.setItem("region", region);
            localStorage.setItem("job", job);
            localStorage.setItem("language", selectedLangs.join(", "));
            localStorage.setItem("level", level);
            
            localStorage.setItem("isLoggedIn", "true");
            window.location.replace("home.html");
        };
    }
});
