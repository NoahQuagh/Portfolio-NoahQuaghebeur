function initGrille() {
    const tarifs = [
        [1, 0, 10, 5],
        [2, 11, 20, 7],
        [3, 21, 30, 10],
        [4, 31, 40, 12],
        [5, 41, 50, 16],
        [6, 51, 60, 20],
        [7, 61, 80, 30],
        [8, 81, 100, 40],
        [9, 101, 140, 50],
        [10, 141, 160, 60],
        [11, 161, 200, 70],
        [12, 201, 300, 80],
        [13, 301, 500, 90]
    ];

    const tbody = document.getElementById('tarif-body');

    function render(highlightNum) {
        tbody.innerHTML = '';

        tarifs.forEach(([num, min, max, val]) => {
            const tr = document.createElement('tr');
            if (num === highlightNum) tr.classList.add('highlight');

            tr.innerHTML = `
        <td><span class="tranche-num">${num}</span></td>
        <td>${min} km</td>
        <td>${max} km</td>
        <td>${val} €</td>
      `;
            tbody.appendChild(tr);

            if (num === 12) {
                const gapTr = document.createElement('tr');
                gapTr.className = 'gap-warn-row';
                gapTr.id = 'gap-row';
                gapTr.innerHTML = `<td colspan="4">⚠ Aucune tranche définie pour 301 – 303 km</td>`;
                tbody.appendChild(gapTr);
            }
        });
    }

    render(null);

}