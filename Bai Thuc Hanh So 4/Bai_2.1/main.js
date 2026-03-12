// Lay phan tu form

const form = document.querySelector('.sign-up-form');

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const telephoneInput = document.querySelector('#telephone');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const sexInputs = document.querySelectorAll('input[name="sex"]');
const dieukhoanInput = document.querySelector('#dieukhoan');

// Ham hien thi loi

function showError(id, message) {
    document.querySelector(`#${id}`).textContent = message;
}

function clearError(id) {
    document.querySelector(`#${id}`).textContent = '';
}

// Ham kiem tra du lieu

// 1. Kiem tra ho va ten
function validateFullName() {
    const value = nameInput.value.trim();
    const regex = /^[A-Za-zÀ-ỹ\s]+$/;

    if (value === "") {
        showError("name-error", "Không được để trống");
        return false;
    }

    if (value.length < 3) {
        showError("name-error", "Ít nhất 3 ký tự");
        return false;
    }

    if (!regex.test(value)) {
        showError("name-error", "Chỉ chứa chữ cái");
        return false;
    }

    clearError("name-error");
    return true;
}

// 2. Kiem tra email
function validateEmail() {
    const value = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
        showError("email-error", "Không được để trống");
        return false;
    }

    if (!regex.test(value)) {
        showError("email-error", "Email không hợp lệ");
        return false;
    }

    clearError("email-error");
    return true;
}

// 3. Kiem tra so dien thoai
function validateTelephone() {
    const value = telephoneInput.value.trim();
    const regex = /^0[0-9]{9}$/;

    if (value === "") {
        showError("telephone-error", "Không được để trống ");
        return false;
    }

    if (!regex.test(value)) {
        showError("telephone-error", "SDT không hợp lệ");
        return false;
    }

    clearError("telephone-error")
    return true;

}

// 4. Kiem tra mat khau

function validatePassword() {
    const value = passwordInput.value.trim();
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (value === "") {
        showError("password-error", "Không được để trống");
        return false;
    }

    if (!regex.test(value)) {
        showError("password-error", "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số");
        return false;
    }

    clearError("password-error");
    return true;
}

// 5. Kiem tra xac nhan mat khau

function validateConfirmPassword() {
    const passwordValue = passwordInput.value.trim();
    const confirmPasswordValue = confirmPasswordInput.value.trim();

    if (confirmPasswordValue === "") {
        showError("confirm-password-error", "Không được để trống");
        return false;
    }

    if (passwordValue !== confirmPasswordValue) {
        showError("confirm-password-error", "Mật khẩu xác nhận không khớp");
        return false;
    }

    clearError("confirm-password-error");
    return true;
}

// 6. Kiem tra gioi tinh

function validateGender() {
    let checked = false;

    sexInputs.forEach(radio => {
        if (radio.checked) checked = true;
    });

    if (!checked) {
        showError("sex-error", "Chọn giới tính");
        return false;
    }

    clearError("sex-error");
    return true;
}

function validateTerms() {
    if (!dieukhoanInput.checked) {
        showError("dieukhoan-error", "Bạn phải đồng ý điều khoản");
        return false;
    }

    clearError("dieukhoan-error");
    return true;
}

// Xu ly su kien submit form

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const valid =
        validateFullName() &
        validateEmail() &
        validateTelephone() &
        validatePassword() &
        validateConfirmPassword() &
        validateGender() &
        validateTerms();

    if (valid) {
        alert("Đăng ký thành công 🎉 " + nameInput.value);
        form.reset();
    }

});

// validate real-time khi burlr ra khỏi input

nameInput.addEventListener("blur", validateFullName);
emailInput.addEventListener("blur", validateEmail);
telephoneInput.addEventListener("blur", validateTelephone);
passwordInput.addEventListener("blur", validatePassword);
confirmPasswordInput.addEventListener("blur", validateConfirmPassword);

// xoa loi khi nguoi dung nhap lai input

nameInput.addEventListener("input", () => clearError("name-error"));
emailInput.addEventListener("input", () => clearError("email-error"));
telephoneInput.addEventListener("input", () => clearError("telephone-error"));
passwordInput.addEventListener("input", () => clearError("password-error"));
confirmPasswordInput.addEventListener("input", () => clearError("confirm-password-error"));




