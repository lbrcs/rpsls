const topTenTable = document.getElementById('leaderboardTableBody');

const topTenBtn = document.getElementById('topTen');
topTenBtn.addEventListener('click', getTopTenPlayers);

const allBtn = document.getElementById('allPlayers');
allBtn.addEventListener('click', getAllPlayers);

async function getTopTenPlayers() {
    const topTenResponse = await fetch("http://localhost:3000/players?lim=10");
    const topTenPlayers = await topTenResponse.json();

    topTenTable.innerHTML = '';
    for (const player of topTenPlayers.msg) {
        console.log(player);
        appendPlayerToTable(player);
    }
    console.log(topTenPlayers);
};

async function getAllPlayers() {
    const topTenResponse = await fetch("http://localhost:3000/players?lim=0");
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

