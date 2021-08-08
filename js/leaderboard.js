const topTenTable = document.getElementById('leaderboardTableBody');

/*const refreshBtn = document.getElementById('refresh');
refreshBtn.addEventListener('click', getTopTen);*/

window.onload = async function getTopTen() {
    const topTenResponse = await fetch("http://localhost:3000/players?lim=10");
    const topTenPlayers = await topTenResponse.json();

    topTenTable.innerHTML = '';
    for (const player of topTenPlayers.msg) {
        console.log(player);
        appendPlayerToTable(player);
    }
    console.log(topTenPlayers);
};

function appendPlayerToTable(player) {
    const tr = document.createElement('tr');
    for(let key of ['username', 'score', 'computerScore', 'winRate']) {
        const td = document.createElement('td');
        td.textContent = player[key];
        tr.appendChild(td);
    }
    topTenTable.appendChild(tr);
}

