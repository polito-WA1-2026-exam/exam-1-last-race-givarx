function Station(name){
    this.name = name
    return this
}
function Link(from,to,color){
    this.from = from
    this.to = to
    this.color = color
    return this
}

function Dijkstra_finder(station_list,link_list,start,end){
    let cost = {}
    let parent = {}
    for (let station of station_list){
        cost[station.name] = Infinity
        parent[station.name] = null
    }
    cost[start.name] = 0
    parent[start.name] = start
    let visited = new Set()
    while (visited.size < station_list.length){
        let current = null
        for(let station of station_list){
            if(!visited.has(station.name) && (current === null || cost[station.name] < cost[current.name])){
                current = station
            }
        }
        if (current === null || cost[current.name] === Infinity) break;
        visited.add(current.name);
        for (let link of link_list) {
            if (link.from === current.name) {
            let newCost = cost[current.name] + 1;
                if (newCost < cost[link.to]) {
                    cost[link.to] = newCost;
                    parent[link.to] = current.name;
                }
            }
        }
    }
    if(cost[end.name] === undefined) return -1
    else return cost[end.name]
}

const DUMP_STATION_LIST = [
    new Station("Centrale"),
    new Station("Porta Velaria"),
    new Station("Crocevia del Falco"),
    new Station("Piazza delle Lanterne"),
    new Station("Fontana Oscura"),
    new Station("Borgo Sereno"),
    new Station("Viale dei Mosaici"),
    new Station("Torre Cinerea"),
    new Station("Campo dell'Eco")
]
const DUMP_LINK_LIST = [
    // Red Line
    new Link("Centrale", "Porta Velaria", "Red"),
    new Link("Porta Velaria", "Crocevia del Falco", "Red"),
    new Link("Crocevia del Falco", "Piazza delle Lanterne", "Red"),
    // Blue Line
    new Link("Centrale", "Fontana Oscura", "Blue"),
    new Link("Fontana Oscura", "Borgo Sereno", "Blue"),
    new Link("Borgo Sereno", "Viale dei Mosaici", "Blue"),
    // Green Line
    new Link("Porta Velaria", "Fontana Oscura", "Green"),
    new Link("Fontana Oscura", "Torre Cinerea", "Green"),
    new Link("Torre Cinerea", "Campo dell'Eco", "Green"),
    // Yellow Line
    new Link("Piazza delle Lanterne", "Torre Cinerea", "Yellow"),
    new Link("Torre Cinerea", "Viale dei Mosaici", "Yellow"),
    new Link("Viale dei Mosaici", "Campo dell'Eco", "Yellow"),
    // Link inversi (bidirezionali)
    // Red Line inverse
    new Link("Porta Velaria", "Centrale", "Red"),
    new Link("Crocevia del Falco", "Porta Velaria", "Red"),
    new Link("Piazza delle Lanterne", "Crocevia del Falco", "Red"),
    // Blue Line inverse
    new Link("Fontana Oscura", "Centrale", "Blue"),
    new Link("Borgo Sereno", "Fontana Oscura", "Blue"),
    new Link("Viale dei Mosaici", "Borgo Sereno", "Blue"),
    // Green Line inverse
    new Link("Fontana Oscura", "Porta Velaria", "Green"),
    new Link("Torre Cinerea", "Fontana Oscura", "Green"),
    new Link("Campo dell'Eco", "Torre Cinerea", "Green"),
    // Yellow Line inverse
    new Link("Torre Cinerea", "Piazza delle Lanterne", "Yellow"),
    new Link("Viale dei Mosaici", "Torre Cinerea", "Yellow"),
    new Link("Campo dell'Eco", "Viale dei Mosaici", "Yellow")
]
//console.log(Dijkstra_finder(DUMP_STATION_LIST,DUMP_LINK_LIST,new Station("Centrale"),new Station("Campo dell'Eco")))
export { Station, Link, Dijkstra_finder, DUMP_STATION_LIST, DUMP_LINK_LIST }