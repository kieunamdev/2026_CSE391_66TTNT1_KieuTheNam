// Khoi tao 

$(document).ready(function () {

    // Tao object gia san pham

    const prices = {
        ao: 150000,
        quan: 200000,
        giay: 300000
    };

    // Ham hien thi loi 

    function showError(id, message) {
        $("#" + id).text(message);
    }

    function clearError(id) {
        $("#" + id).text("");
    }

    // Validate ten san pham 

    function validateProduct() {

        const value = $("#product").val();

        if (value === "") {
            showError("#product-error", "Phải chọn sản phẩm ");
            return false;
        }

        clearError("product-error");
        return true;
    }

    // Validate So luong 

    function validateQuantity() {

        const value = Number($("#soluong").val());

        if (!value) {
            showError("quantity-error", "Không được để trống");
            return false;
        }

        if (value < 1 || value > 99) {
            showError("quantity-error", "Số lượng từ 1 đến 99");
            return false;
        }

        clearError("quantity-error");
        return true;
    }

    // Validate ngay giao hang 

    function validateDate() {

        const value = $("#order-date").val();

        if (!value) {
            showError("order-date-error", "Không được để trống");
            return false;
        }

        const today = new Date();
        const selected = new Date(value);

        const diff = (selected - today) / (1000 * 60 * 60 * 24);

        if (diff < 0) {
            showError("order-date-error", "Không được chọn ngày quá khứ");
            return false;
        }

        if (diff > 30) {
            showError("order-date-error", "Không quá 30 ngày");
            return false;
        }

        clearError("order-date-error");
        return true;
    }

    // Validate dia chi 

    function validateAddress() {

        const value = $("#order-address").val().trim();

        if (value === "") {
            showError("order-address-error", "Không được để trống");
            return false;
        }

        if (value.length < 10) {
            showError("order-address-error", "Địa chỉ giao phải lớn hơn 10 kí tự");
            return false;
        }

        clearError("order-address-error");
        return true;
    }

    // Validate Ghi Chu 

    function validateNote() {

        const value = $("#note").val();

        if (value.length > 200) {
            showError("note-error", "Tối đa 200 ký tự");
            return false;
        }

        clearError("note-error");
        return true;
    }

    // Validate PT Thanh Toan

    function validatePayMethod() {

        if ($("input[name='pay-method']:checked").length === 0) {
            showError("pay-method-error", "Chọn phương thức thanh toán");
            return false;
        }

        clearError("pay-method-error");
        return true;
    }

    // Đếm ký tự ghi chú realtime

    $("#note").on("input", function () {

        const length = $(this).val().length;

        $("#note-count").text(length + "/200");

        if (length > 200) {
            $("#note-count").css("color", "red");
        }
        else {
            $("#note-count").css("color", "black");
        }
    });

    // Tính tổng tiền tự động

    function updateTotal() {

        const product = $("#product").val();
        const quantity = Number($("#soluong").val());

        if (!product || !quantity) {
            $("#total-price").text("0 VND");
            return;
        }

        const total = prices[product] * quantity;

        $("#total-price").text(total.toLocaleString("vi-VN") + " VND");

    }

    $("#product").change(updateTotal);
    $("#soluong").on("input", updateTotal);

    // Submit form

    $(".order-form").submit(function (e) {

        e.preventDefault();

        const valid =
            validateProduct() &&
            validateQuantity() &&
            validateDate() &&
            validateAddress() &&
            validateNote() &&
            validatePayMethod();

        if (valid) {

            const summary = `
        Sản phẩm: ${$("#product option:selected").text()} <br>
        Số lượng: ${$("#soluong").val()} <br>
        Tổng tiền: ${$("#total-price").text()} <br>
        Ngày giao: ${$("#order-date").val()}
        `;

            $("#order-summary").html(summary);

            $("#confirm-box").show();
        }

    });

    // Nut xac nhan 

    $("#confirm-btn").click(function () {

        alert("Đặt hàng thành công 🎉");

        $(".order-form")[0].reset();

        $("#confirm-box").hide();

    });

    // Nut huy 

    $("#cancel-btn").click(function () {

        $("#confirm-box").hide();

    });

});

