const templatePlayerRow = _.template(
    `
        <tr>
            <td class="playercell"><%- From %></td>
            <td><%- World %>-<%- Sublevel %></td>
            <td><%- HP %></td>
            <td><%- ThreatLevel %></td>
            <td><%- Kills %></td>
            <td><%- Assists %></td>
        </tr>
    `
);
const templateTable = _.template(
    `
        <table>
            <thead>
                <tr>
                    <th class="playercell">Player</th>
                    <th>Level</th>
                    <th>HP</th>
                    <th>Traps</th>
                    <th>Kills</th>
                    <th>Assists</th>
                </tr>
            <thead>
            <tbody>
                <%= Body %>
            </tbody>
        </table>
    `
)
function updateTable() {
    fetch("https://w5addyotsd.execute-api.us-west-2.amazonaws.com/prod4")
        .then(response => response.json())
        .then(data => {
            var currentPlayerCount = data.data.Messages.length
            _.forEach(data.data.Messages, m=> m.ThreatLevel = Math.round(m.ThreatLevel))
            var rows = _.map(data.data.Messages, m => templatePlayerRow(m))
            var table = templateTable({Body:rows.join('\n')})
            if (currentPlayerCount == 1) {
                document.getElementById("playercount").innerText = currentPlayerCount + " player online"
            }
            else {
                document.getElementById("playercount").innerText = currentPlayerCount + " players online"
            }
            
            document.getElementById("currentplayers").innerHTML = table
        })
}
updateTable()
window.setInterval(updateTable, 10 * 1000);



// wins table
const templatePlayerWinsRow = _.template(
    `
        <tr>
            <td class="playercell"><%- playerName.S %></td>
            <td><%- wins.N %></td>
        </tr>
    `
);
const templateWinsTable = _.template(
    `
        <table>
            <thead>
                <tr>
                    <th class="playercell">Player</th>
                    <th>Wins</th>
                </tr>
            <thead>
            <tbody>
                <%= Body %>
            </tbody>
        </table>
    `
)
function updateWinnersTable() {
    fetch("https://adziycx6i0.execute-api.us-west-2.amazonaws.com/v2")
    .then(response => response.json())
    .then(data => {
        const players = _(data.data.Items).map(p=>p)
            .sortBy(p=>parseInt(p.wins.N, 10))
            .reverse().valueOf();
        const rows = _.map(players, m => templatePlayerWinsRow(m))
        const table = templateWinsTable({Body:rows.join('\n')})
        document.getElementById("topplayers").innerHTML = table
    })

}
updateWinnersTable()