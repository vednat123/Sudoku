// add your code here

document.addEventListener('DOMContentLoaded', () => {
    const scores = [
        { date: "2025/05/05", duration: "10:10" },
        { date: "2025/05/05", duration: "10:10" },
        { date: "2025/05/05", duration: "10:10" }
    ];
    const tbody = document.getElementById('scores-body');
    scores.forEach(score => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${score.date}</td>
      <td>${score.duration}</td>
    `;
        tbody.appendChild(tr);
    });
});
