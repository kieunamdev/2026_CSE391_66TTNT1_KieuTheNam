let filteredStudents = [];
let sortAsc = true;


// SU KIEN MOI
$(document).ready(function () {

    $("#search").on("input", applyFilters);

    $("#filterRank").on("change", applyFilters);

    $("#sortScore").click(function () {

        sortAsc = !sortAsc;

        applyFilters();

    });

});


// LOC + TIM KIEM + SAP XEP
function applyFilters() {

    let keyword = $("#search").val().toLowerCase();
    let rankFilter = $("#filterRank").val();

    // luôn bắt đầu từ mảng gốc
    filteredStudents = [...students];

    // tìm kiếm
    if (keyword !== "") {
        filteredStudents = filteredStudents.filter(function (sv) {
            return sv.name.toLowerCase().includes(keyword);
        });
    }

    // lọc xếp loại
    if (rankFilter !== "all") {
        filteredStudents = filteredStudents.filter(function (sv) {
            return classify(sv.diem) === rankFilter;
        });
    }

    // sắp xếp
    filteredStudents.sort(function (a, b) {
        return sortAsc ? a.diem - b.diem : b.diem - a.diem;
    });

    renderTableAdvance();
}



// RENDER BANG
function renderTableAdvance() {

    let html = "";
    let total = 0;

    // nếu chưa lọc thì hiển thị students
    let list = filteredStudents.length ? filteredStudents : students;

    if (list.length === 0) {

        $("#table-body").html("<tr><td colspan='5'>Không có kết quả</td></tr>");
        return;

    }

    list.forEach(function (sv, index) {

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