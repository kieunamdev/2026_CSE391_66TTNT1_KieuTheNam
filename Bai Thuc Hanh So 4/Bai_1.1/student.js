// Xac dinh cac phan tu can tac dong 

$(document).ready(function () {

    $("#addBtn").click(addStudent);

    $("#diem").keypress(function (e) {
        if (e.which == 13) { // Enter key pressed
            addStudent();
        }
    });

    $("#table-body").on("click", ".delete-btn", deleteStudent);

});

// Cac ham xu li 

let students = [];

// Ham them sinh vien vao danh sach

function addStudent() {

    let name = $("#name").val().trim();
    let diem = parseFloat($("#diem").val().trim());

    if (name === "" || isNaN(diem) || diem < 0 || diem > 10) {
        alert("Vui lòng nhập tên và điểm hợp lệ (0-10).");
        return;
    }

    students.push({
        name: name,
        diem: diem
    });

    renderTable();

    $("#name").val("");
    $("#diem").val("");
    $("#name").focus();

}

// Ham xep loai sinh vien

function classify(diem) {
    if (diem >= 8.5) return "Giỏi";
    if (diem >= 7) return "Khá";
    if (diem >= 5) return "Trung bình";
    return "Yếu";
}

// Ham render bang sinh vien

function renderTable() {

    let html = "";
    let total = 0;

    students.forEach(function (sv, index) {

        let rank = classify(sv.diem);

        let color = sv.diem < 5 ? "style='background:yellow'" : "";

        html += `
<tr ${color}>
<td>${index + 1}</td>
<td>${sv.name}</td>
<td>${sv.diem}</td>
<td>${rank}</td>
<td>
<button class="delete-btn" data-index="${index}">Xóa</button>
</td>
</tr>
`;

        total += sv.diem;

    });

    $("#table-body").html(html);

    updateStat(total);

}

// Ham xoa sinh vien 

function deleteStudent() {

    let index = $(this).data("index");

    students.splice(index, 1);

    renderTable();

}

// Ham cap nhat thong ke

function updateStat(diem) {

    let count = students.length;

    let avg = count ? (diem / count).toFixed(2) : 0;

    $("#stat").text("Tổng sinh viên: " + count + " | Điểm trung bình: " + avg);

}



