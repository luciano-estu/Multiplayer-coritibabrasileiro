// ============================================================
// 7A0 - SCRIPT.JS
// Solo + Amigos + 8 formações + bloqueio de posições
// ============================================================

const CLUBS = [
  "Athletico-PR","Atlético-MG","Bahia","Botafogo","Chapecoense",
  "Corinthians","Coritiba","Cruzeiro","Flamengo","Fluminense",
  "Grêmio","Internacional","Mirassol","Palmeiras",
  "Red Bull Bragantino","Remo","Santos","São Paulo","Vasco","Vitória"
];

const FORMATIONS = {
  "4-3-3":[["PE","CA","PD"],["MEI","MC","MC"],["LE","ZAG","ZAG","LD"],["GOL"]],
  "4-4-2":[["CA","CA"],["PE","MC","MC","PD"],["LE","ZAG","ZAG","LD"],["GOL"]],
  "4-2-3-1":[["CA"],["PE","MEI","PD"],["VOL","VOL"],["LE","ZAG","ZAG","LD"],["GOL"]],
  "4-3-1-2":[["CA","CA"],["MEI"],["MC","VOL","MC"],["LE","ZAG","ZAG","LD"],["GOL"]],
  "3-5-2":[["CA","CA"],["PE","MEI","MC","MEI","PD"],["ZAG","ZAG","ZAG"],["GOL"]],
  "3-4-3":[["PE","CA","PD"],["MEI","MC","MC","MEI"],["ZAG","ZAG","ZAG"],["GOL"]],
  "5-3-2":[["CA","CA"],["MC","VOL","MC"],["LE","ZAG","ZAG","ZAG","LD"],["GOL"]],
  "5-4-1":[["CA"],["PE","MEI","MC","PD"],["LE","ZAG","ZAG","ZAG","LD"],["GOL"]]
};

const POS = {
  GOL:"Goleiro", LE:"Lateral esquerdo", LD:"Lateral direito",
  ZAG:"Zagueiro", VOL:"Volante", MC:"Meia central",
  MEI:"Meia ofensivo", PE:"Ponta esquerda",
  PD:"Ponta direita", CA:"Centroavante"
};

// Elencos principais. Cada item = [nome, posição, OVR].
const RAW = {
"Athletico-PR":[["Santos","GOL",84],["Mycael","GOL",78],["Esquivel","LE",82],["Fernando","LD",80],["Gamarra","ZAG",82],["Aguirre","ZAG",81],["Mastriani","CA",80],["Luiz Fernando","PE",82],["João Cruz","MEI",84],["Matheus Pereira","MC",82],["Portilla","VOL",81],["Jadson","MC",80],["Isaac","CA",79],["Rômulo","PE",78],["Cuello","PD",81],["Gonzalo Mastriani","CA",80],["Luiz Gustavo","VOL",79],["Leo Derik","PD",78],["Gastón Benavídez","LD",82],["Lucas Belezi","ZAG",76]],
"Atlético-MG":[["Everson","GOL",86],["Matheus Mendes","GOL",78],["Renan Lodi","LE",84],["Natanael","LD",82],["Lyanco","ZAG",83],["Júnior Alonso","ZAG",85],["Caua","ZAG",75],["Alan Franco","MC",84],["Reinier","MEI",85],["Dudu","PE",84],["Hulk","CA",90],["Bernard","PE",81],["Gustavo Scarpa","MEI",86],["Igor Gomes","MC",80],["Victor Hugo","MC",79],["Cuello","PD",82],["Rony","CA",84],["Vitor Hugo","ZAG",78],["Alexsander","VOL",80],["Angelo Preciado","LD",81]],
"Bahia":[["Guido Herrera","GOL",84],["Marcos Felipe","GOL",80],["Iago","LE",82],["Gilberto","LD",81],["Kanu","ZAG",82],["Ramos Mingo","ZAG",84],["David Duarte","ZAG",80],["Jean Lucas","MC",84],["Caio Alexandre","VOL",83],["Éverton Ribeiro","MEI",87],["Cauly","MEI",85],["Rodrigo Nestor","MC",84],["Ademir","PD",81],["Erick Pulga","PE",84],["Luciano Juba","PE",83],["Willian José","CA",84],["Everaldo","CA",79],["Acevedo","VOL",80],["Kike Olivera","PD",82],["Sanabria","MEI",80]],
"Botafogo":[["Batista","GOL",80],["Raul","GOL",77],["Marçal","LE",82],["Vitinho","LD",82],["Alexander Barboza","ZAG",84],["Ythallo","ZAG",76],["Kaio Pantaleão","ZAG",78],["Allan","MC",84],["Edenilson","MC",81],["Danilo Santos","VOL",80],["Paulinho","PE",84],["Artur","PD",84],["Arthur Cabral","CA",84],["Junior","PE",79],["Newton","VOL",79],["Miguel Caldas","MEI",77],["Gabriel Pereira","PE",80],["Cristhian Loor","LD",78],["Cleber","ZAG",77],["Leo Linck","GOL",78]],
"Chapecoense":[["Rafael Santos","GOL",78],["Mailson","GOL",77],["Leo Vieira","LE",78],["Marcinho","LD",78],["Bruno Leonardo","ZAG",81],["Edu Doma","ZAG",78],["Victor Caetano","ZAG",77],["Jean Carlos","MC",80],["Camilo","MEI",80],["Higor","VOL",77],["Bolasie","PE",82],["Italo","CA",78],["Garcez","CA",76],["Walter Clar","MC",78],["Rubens","VOL",76],["Everton","PD",77],["João Vitor","ZAG",75],["Rafael Carvalheira","MEI",76],["Pedro Henrique","PE",76],["Marcelo Santos","LD",77]],
"Corinthians":[["Hugo Souza","GOL",84],["Matheus Donelli","GOL",76],["Matheuzinho","LD",82],["Matheus Bidu","LE",80],["André Ramalho","ZAG",83],["Gustavo Henrique","ZAG",82],["Gabriel","ZAG",79],["Charles","VOL",80],["Alex Santana","VOL",81],["Breno Bidon","MC",82],["Rodrigo Garro","MEI",88],["André Carrillo","PD",84],["Vitinho","PE",82],["Memphis Depay","CA",89],["Yuri Alberto","CA",86],["Pedro Raul","CA",80],["Raniele","VOL",81],["Dieguinho","PE",77],["Kayke","PD",76],["Guilherme","MC",77]],
"Coritiba":[["Pedro Morisco","GOL",84],["Pedro Rangel","GOL",80],["Keiller","GOL",78],["Felipe","LE",82],["Felipe Jonatan","LE",82],["Tinga","LD",82],["JP Chermont","LD",80],["Maicon","ZAG",82],["Rodrigo Moledo","ZAG",84],["Bruno Melo","ZAG",78],["Tiago Coser","ZAG",79],["Jacy","VOL",83],["Vini Paulista","VOL",85],["Thiago Santos","VOL",82],["Sebastian Gomez","MC",86],["Josue","MEI",99],["Lucas Ronier","MEI",84],["Lavega","PD",85],["Breno Lopes","PE",87],["Pedro Rocha","PE",84],["Robson","CA",82],["Renato","CA",80]],
"Cruzeiro":[["Cássio","GOL",87],["Otávio","GOL",78],["William","LD",83],["Kaiki Bruno","LE",82],["Fabrício Bruno","ZAG",84],["João Marcelo","ZAG",82],["Villalba","ZAG",81],["Lucas Silva","VOL",82],["Lucas Romero","VOL",84],["Matheus Pereira","MEI",88],["Gerson","MC",87],["Christian","MC",80],["Matheus Henrique","MC",83],["Marquinhos","PD",82],["Wanderson","PE",81],["Sinisterra","PE",84],["Keny Arroyo","PD",82],["Kaio Jorge","CA",86],["Gabriel","GOL",77],["Rayan Lelis","ZAG",75]],
"Flamengo":[["Agustín Rossi","GOL",88],["Dyogo","GOL",76],["Ayrton Lucas","LE",84],["Varela","LD",82],["Léo Pereira","ZAG",86],["Léo Ortiz","ZAG",85],["Danilo","ZAG",86],["Wesley","LD",83],["Erick Pulgar","VOL",85],["Saúl","MC",85],["De Arrascaeta","MEI",92],["Lucas Paquetá","MEI",89],["Jorginho","MC",87],["Bruno Henrique","PE",86],["Everton","PE",84],["Luiz Araújo","PD",84],["Samuel Lino","PE",86],["Pedro","CA",91],["Wallace Yan","CA",79],["Everton Cebolinha","PE",82]],
"Fluminense":[["Fábio","GOL",86],["Vitor Eudes","GOL",77],["Guilherme Arana","LE",86],["Samuel Xavier","LD",81],["Thiago Silva","ZAG",87],["Freytes","ZAG",83],["Ignacio","ZAG",82],["Guga","LD",80],["Hércules","MC",84],["Nonato","VOL",80],["Martinelli","MC",83],["Ganso","MEI",86],["Luciano Acosta","MEI",87],["Soteldo","PE",85],["Canobbio","PD",83],["Savarino","PD",85],["Kevin Serna","PE",84],["John Kennedy","CA",81],["Germán Cano","CA",87],["Rodrigo Castillo","CA",79]],
"Grêmio":[["Marchesín","GOL",82],["Caio","GOL",76],["Arthur","LD",80],["Enamorado","PD",82],["Wagner","ZAG",82],["Vitor Ramon","ZAG",80],["Kannemann","ZAG",84],["Balbuena","ZAG",83],["Villasanti","MC",86],["Nardoni","VOL",82],["Cuéllar","VOL",82],["Cristaldo","MEI",86],["Gabriel Mec","MEI",79],["Leo Pérez","MC",78],["Aravena","PE",81],["Francis Amuzu","PD",82],["José Enamorado","PD",83],["Braithwaite","CA",84],["André Henrique","CA",79],["Riquelme","PE",76]],
"Internacional":[["Anthoni Souza","GOL",78],["Rochet","GOL",84],["Bernabei","LE",82],["Alan Benítez","LD",81],["Gabriel Mercado","ZAG",82],["Félix Torres","ZAG",83],["Luiz Felipe","ZAG",80],["Borré","CA",85],["Alerrandro","CA",81],["Rodrigo Villagra","VOL",83],["Alisson","MC",80],["Gabriel","MC",80],["Braian Aguirre","LD",81],["Kauã","PE",77],["João Gabriel Kempes","CA",75],["Alan Patrick","MEI",88],["Wesley","PE",83],["Bruno Tabata","PD",81],["Enner Valencia","CA",85],["Thiago Maia","VOL",83]],
"Mirassol":[["Walter","GOL",83],["Mota","GOL",76],["Reinaldo","LE",82],["Daniel Borges","LD",78],["João Victor","ZAG",80],["Jemmes","ZAG",79],["Alex Silva","ZAG",78],["Rani Oliveira","MC",80],["Neto Moura","VOL",80],["Danielzinho","MC",79],["Yago Felipe","MC",80],["Negueba","PD",80],["Alesson","PE",81],["Chico","PE",78],["Dellatorre","CA",82],["Clayson","PE",81],["Lucas Ramon","LD",77],["José Aldo","MEI",80],["Isaque","MEI",77],["Léo Gamalho","CA",78]],
"Palmeiras":[["Weverton","GOL",89],["Marcelo Lomba","GOL",80],["Piquerez","LE",86],["Khellven","LD",81],["Gustavo Gómez","ZAG",89],["Murilo","ZAG",86],["Bruno Fuchs","ZAG",81],["Marlon Freitas","VOL",84],["Andreas Pereira","MEI",88],["Maurício","MEI",84],["Evangelista","MC",82],["Richard Ríos","VOL",84],["Jhon Arias","PD",88],["Ramón Sosa","PE",84],["Riquelme","PE",78],["Vitor Roque","CA",88],["Flaco López","CA",84],["Paulinho","PE",86],["Gustavo Scarpa","MEI",86],["Martínez","MC",80]],
"Red Bull Bragantino":[["Cleiton","GOL",82],["Tiago Volpi","GOL",80],["Juninho Capixaba","LE",80],["Andrés Hurtado","LD",80],["Alix Vinicius","ZAG",82],["Pedro Henrique","ZAG",81],["Gustavo Marques","ZAG",79],["Matheus Fernandes","MC",80],["Sasha","MEI",83],["Nacho Sosa","MC",79],["Lucas Barbosa","PD",81],["Henry Mosquera","PE",81],["Vinicinho","PE",82],["Vinícius","CA",78],["Isidro Pitta","CA",83],["Eric Ramires","VOL",80],["Fernando","MC",78],["Rodriguinho","MEI",78],["Herrera","PD",78],["Luan Cândido","LE",78]],
"Remo":[["Marcelo Rangel","GOL",79],["João Ricardo","GOL",76],["Sander","LE",79],["Lucas Mendes","LD",78],["Rafael Castro","ZAG",79],["Reynaldo","ZAG",80],["Alan Empereur","ZAG",82],["Adrian","VOL",78],["Giovanni","MC",80],["Pedro Castro","VOL",79],["Elvis","MEI",82],["Matheus Frizzo","MEI",79],["Kelvin","PE",80],["Ytalo","CA",78],["Diego Tavares","PD",77],["Ribamar","CA",76],["Nicolas","LE",77],["Marcelinho","PD",79],["Luiz Fernando","PE",80],["Anderson Uchoa","VOL",78]],
"Santos":[["Gabriel Brazão","GOL",84],["João Paulo","GOL",81],["Escobar","LE",82],["JP Chermont","LD",81],["Luan Peres","ZAG",84],["Adonis Frías","ZAG",83],["Lucas Veríssimo","ZAG",84],["João Basso","ZAG",79],["Willian Arão","VOL",84],["João Schmidt","MC",83],["Thaciano","MEI",83],["Gabriel Menino","MC",83],["Neymar Jr","MEI",94],["Barreal","PE",83],["Rollheiser","PD",84],["Rony","PE",84],["Gabriel Barbosa","CA",88],["Lautaro Díaz","CA",83],["Miguelito","MEI",81],["Robinho Jr","PE",78]],
"São Paulo":[["Rafael","GOL",85],["Young","GOL",76],["Buta","LE",81],["Maik","LD",78],["Rafael Tolói","ZAG",83],["Arboleda","ZAG",85],["Alan Franco","ZAG",83],["Luan Silva","VOL",79],["Bobadilla","VOL",82],["Luiz Gustavo","VOL",82],["Lucas Moura","PD",88],["Oscar","MEI",87],["Marcos Antônio","MC",81],["Alisson","MC",83],["Teté","PE",82],["Hugo","PE",80],["Calleri","CA",86],["André Silva","CA",82],["Ryan Francisco","CA",79],["Pedro Ferreira","MC",76]],
"Vasco":[["Léo Jardim","GOL",85],["Daniel Fuzato","GOL",78],["Lucas Piton","LE",82],["Paulo Henrique","LD",80],["Mauricio Lemos","ZAG",82],["Lucas Freitas","ZAG",78],["João Victor","ZAG",82],["Cuiabano","LE",79],["Jair","VOL",82],["Hugo Moura","VOL",81],["Philippe Coutinho","MEI",85],["Adson","PE",82],["Nuno Moreira","PE",82],["Rayan","CA",82],["David","PE",81],["Andrés Gómez","PD",80],["Puma Rodríguez","LD",79],["Cauã Paixão","CA",76],["Tchê Tchê","MC",82],["Paulinho","MC",80]],
"Vitória":[["Lucas Arcanjo","GOL",82],["Gabriel Vasconcelos","GOL",76],["Jamerson","LE",78],["Raúl Cáceres","LD",80],["Lucas Halter","ZAG",81],["Edu","ZAG",79],["Wagner Leonardo","ZAG",82],["Ricardo Ryller","VOL",80],["Willian Oliveira","VOL",81],["Matheuzinho","MC",82],["Osvaldo","PE",80],["Aitor","PD",82],["Erick Castillo","PE",80],["Janderson","CA",78],["Renato Kayzer","CA",82],["Gustavo Silva","PD",80],["Lawan","MEI",76],["Claudinho","MC",78],["Zé Hugo","PE",79],["Breno Lopes","PE",82]]
};

let state = {
  team:{}, usedClubs:[], skippedClubs:[], currentClub:null, pendingPlayer:null,
  formation:"4-3-3", league:null, peer:null, connection:null, remoteTeam:null,
  teamName:"Meu Time",
  room:{
    role:null,size:2,hostId:null,players:{},
    draftStarted:false,matches:[],table:{},round:0,totalRounds:0
  }
};

const $ = id => document.getElementById(id);

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.add("hidden"));
  const el=$(id); if(el) el.classList.remove("hidden");
}

function startSolo(){ resetBuilder(); showScreen("build"); }
function openFriends(){ showScreen("friends"); }

function countPositionSlots(position){
  return FORMATIONS[state.formation].flat().filter(p=>p===position).length;
}

function countPositionPlayers(position){
  return Object.values(state.team).filter(p=>p.pos===position).length;
}

function resetBuilder(){
  state.team={}; state.usedClubs=[]; state.skippedClubs=[]; state.currentClub=null; state.pendingPlayer=null;
  state.formation="4-3-3";
  state.teamName="Meu Time";
  if($("formation")) $("formation").value="4-3-3";
  if($("teamName")) $("teamName").value="Meu Time";
  if($("friendTeamName")) $("friendTeamName").value="Meu Time";
  updateSkipButton();
  if($("clubBox")) $("clubBox").textContent="Nenhum clube sorteado";
  if($("instruction")) $("instruction").textContent="Primeiro sorteie um clube.";
  if($("placementInfo")) $("placementInfo").textContent="Depois de escolher um jogador, toque na posição correta.";
  if($("players")) $("players").innerHTML="Sorteie um clube.";
  renderField(); updateStats(); updateSkipButton();
}

if($("formation")){
  $("formation").innerHTML=Object.keys(FORMATIONS).map(f=>`<option value="${f}">${f}</option>`).join("");
  $("formation").onchange=function(){
    state.formation=this.value; state.team={}; state.pendingPlayer=null;
    renderField(); updateStats();
  };
}

function renderField(){
  if(!$("field")) return;
  const counter={};
  $("field").innerHTML=FORMATIONS[state.formation].map(row=>`
    <div class="fieldRow">
      ${row.map(pos=>{
        counter[pos]=(counter[pos]||0)+1;
        const slotId=`${pos}-${counter[pos]}`;
        const p=state.team[slotId];
        let cls="slot";
        if(p) cls+=" filled";
        if(state.pendingPlayer && state.pendingPlayer.pos===pos && !p) cls+=" valid";
        if(state.pendingPlayer && state.pendingPlayer.pos!==pos) cls+=" invalid";
        return `<div class="${cls}" onclick="placePlayer('${slotId}')">
          ${p?`<b>${p.name}</b><small>⭐ ${p.ovr}</small>`:`<b>${pos}</b><small>${POS[pos]}</small>`}
        </div>`;
      }).join("")}
    </div>
  `).join("");
}


function getTeamName(){
  const input=$("teamName")||$("friendTeamName");
  const value=input?input.value.trim():state.teamName;
  state.teamName=value||"Meu Time";
  if($("teamName")) $("teamName").value=state.teamName;
  if($("friendTeamName")) $("friendTeamName").value=state.teamName;
  return state.teamName;
}

if($("teamName")){
  $("teamName").addEventListener("input",e=>{
    state.teamName=e.target.value.trim()||"Meu Time";
    if($("friendTeamName")) $("friendTeamName").value=e.target.value;
  });
}

if($("friendTeamName")){
  $("friendTeamName").addEventListener("input",e=>{
    state.teamName=e.target.value.trim()||"Meu Time";
    if($("teamName")) $("teamName").value=e.target.value;
  });
}

function updateSkipButton(){
  const btn=$("skipButton");
  if(!btn)return;
  const remaining=3-state.skippedClubs.length;
  btn.textContent=`⏭️ Pular clube (${remaining})`;
  btn.disabled=remaining<=0||!state.currentClub||!!state.pendingPlayer;
}

function skipClub(){
  if(state.pendingPlayer){
    alert("Primeiro coloque o jogador escolhido.");
    return;
  }
  if(!state.currentClub){
    alert("Primeiro sorteie um clube.");
    return;
  }
  if(state.skippedClubs.length>=3){
    alert("Você já usou os 3 pulos.");
    updateSkipButton();
    return;
  }
  state.skippedClubs.push(state.currentClub);
  state.currentClub=null;
  $("clubBox").textContent=`⏭️ Clube pulado — ${3-state.skippedClubs.length} pulos restantes`;
  $("instruction").textContent="Sorteie outro clube.";
  $("placementInfo").textContent="O clube pulado não poderá ser sorteado novamente nesta montagem.";
  $("players").innerHTML="Sorteie outro clube.";
  updateSkipButton();
}

function drawClub(){
  if(state.pendingPlayer){ alert("Primeiro coloque o jogador na posição correta."); return; }
  const available=CLUBS.filter(c=>
    !state.usedClubs.includes(c) &&
    !state.skippedClubs.includes(c)
  );
  if(!available.length){ alert("Todos os clubes já foram utilizados."); return; }
  state.currentClub=available[Math.floor(Math.random()*available.length)];
  $("clubBox").textContent=`🎲 ${state.currentClub}`;
  $("instruction").textContent="Escolha UM jogador deste clube.";
  updateSkipButton();
  renderPlayers();
}

function renderPlayers(){
  if(!state.currentClub){ $("players").innerHTML="Sorteie um clube."; return; }
  const players=RAW[state.currentClub]||[];
  $("players").innerHTML=players.map((p,i)=>{
    const free=countPositionPlayers(p[1])<countPositionSlots(p[1]);
    return `<div class="player ${free?"":"blocked"}">
      <button ${free?"":"disabled"} onclick="choosePlayer(${i})">${free?"Escolher":"🔒 Bloqueado"}</button>
      <b>${p[0]}</b><br>
      <small>${POS[p[1]]} • ⭐ ${p[2]}</small>
      ${free?"":"<br><small>🔒 Sem vaga</small>"}
    </div>`;
  }).join("");
}

function choosePlayer(index){
  if(!state.currentClub){ alert("Primeiro sorteie um clube."); return; }
  if(state.pendingPlayer){ alert("Você já escolheu um jogador."); return; }
  const p=RAW[state.currentClub][index];
  if(countPositionPlayers(p[1])>=countPositionSlots(p[1])){
    alert(`Não existe mais vaga para ${POS[p[1]]}.`); return;
  }
  state.pendingPlayer={name:p[0],pos:p[1],ovr:p[2],club:state.currentClub};
  $("instruction").textContent=`${p[0]} escolhido. Agora clique em ${POS[p[1]]}.`;
  $("placementInfo").textContent=`📍 ${p[0]} só pode jogar como ${POS[p[1]]}.`;
  renderField();
}

function placePlayer(slotId){
  if(!state.pendingPlayer){ alert("Primeiro sorteie um clube e escolha um jogador."); return; }
  const p=state.pendingPlayer;
  const pos=slotId.split("-")[0];
  if(p.pos!==pos){ alert(`${p.name} é ${POS[p.pos]} e só pode ser colocado em ${POS[p.pos]}.`); return; }
  if(state.team[slotId]){ alert("Essa vaga já está ocupada."); return; }

  state.team[slotId]={...p};
  if(!state.usedClubs.includes(state.currentClub)) state.usedClubs.push(state.currentClub);
  state.pendingPlayer=null;
  $("clubBox").textContent=`🔒 ${state.currentClub} utilizado`;
  $("instruction").textContent="Jogador colocado! Sorteie outro clube.";
  $("placementInfo").textContent="Escolha outro clube para continuar.";
  $("players").innerHTML="Sorteie outro clube.";
  updateSkipButton();
  renderField(); updateStats(); sendTeam();
}

function updateStats(){
  if(!$("playerCount")) return;
  const players=Object.values(state.team);
  $("playerCount").textContent=`${players.length}/11`;
  const ovr=players.length?Math.round(players.reduce((s,p)=>s+p.ovr,0)/players.length):0;
  $("teamOvr").textContent=ovr;
  if($("readyButton")) $("readyButton").disabled=players.length!==11;
}


function isTeamComplete(){
  return Object.keys(state.team).length === 11;
}

function randomGoals(){
  // Geração simples e equilibrada de gols: 0–4, com poucos placares altos.
  const r=Math.random();
  if(r<0.30) return 0;
  if(r<0.63) return 1;
  if(r<0.84) return 2;
  if(r<0.94) return 3;
  if(r<0.985) return 4;
  return 5;
}

function renderTable(){
  if(!state.league || !$("table")) return;

  const rows=Object.entries(state.league.table)
    .sort((a,b)=>{
      const A=a[1],B=b[1];
      return B.p-A.p ||
        ((B.gp-B.gc)-(A.gp-A.gc)) ||
        B.gp-A.gp;
    });

  $("table").innerHTML=`
    <table>
      <tr>
        <th>#</th><th>Time</th><th>PTS</th>
        <th>J</th><th>V</th><th>E</th><th>D</th>
        <th>GP</th><th>GC</th>
      </tr>
      ${rows.map((r,i)=>`
        <tr>
          <td>${i+1}</td>
          <td>${r[0]}</td>
          <td><b>${r[1].p}</b></td>
          <td>${r[1].j}</td>
          <td>${r[1].v}</td>
          <td>${r[1].e}</td>
          <td>${r[1].d}</td>
          <td>${r[1].gp}</td>
          <td>${r[1].gc}</td>
        </tr>
      `).join("")}
    </table>
  `;
}

function confirmTeam(){
  if(!isTeamComplete()){
    alert("Complete os 11 jogadores antes de continuar.");
    return;
  }
  getTeamName();

  // Dentro de uma sala, o botão confirma o time da sala.
  if(state.room && state.room.role){
    submitRoomTeam();
    return;
  }

  // Modo solo.
  startLeague();
  showScreen("league");
}

function teamPower(){
  const p=Object.values(state.team);
  return p.length?p.reduce((sum,x)=>sum+x.ovr,0)/p.length:0;
}

function opponentPower(club){
  const p=RAW[club]||[];
  return p.length?p.reduce((sum,x)=>sum+x[2],0)/p.length:78;
}

function clamp(n,min,max){
  return Math.max(min,Math.min(max,n));
}

function poissonGoals(lambda){
  lambda=clamp(lambda,0.15,3.1);
  const L=Math.exp(-lambda);
  let k=0, probability=1;
  do{
    k++;
    probability*=Math.random();
  }while(probability>L && k<9);
  return Math.max(0,k-1);
}

function simulateMatch(powerA,powerB){
  // Sistema de equilíbrio:
  // O OVR ajuda, mas não decide a partida.
  // Quanto maior a diferença, menor é o efeito adicional
  // para evitar campeonatos dominados por um único time.

  const diff = powerA - powerB;

  // Reduz o impacto de diferenças muito grandes de OVR.
  const balancedDiff =
    Math.tanh(diff / 22) * 8;

  // Pequena vantagem de mando/aleatoriedade.
  const randomFactor =
    (Math.random() - 0.5) * 4;

  const effectiveDiff =
    balancedDiff + randomFactor;

  // Médias de gols mais próximas.
  // Mesmo um time muito superior pode perder ou empatar.
  const lambdaA =
    clamp(
      1.05 + effectiveDiff * 0.045,
      0.35,
      2.05
    );

  const lambdaB =
    clamp(
      1.05 - effectiveDiff * 0.045,
      0.35,
      2.05
    );

  let a = poissonGoals(lambdaA);
  let b = poissonGoals(lambdaB);

  // Pequena correção para evitar resultados absurdos.
  // Nunca força uma vitória baseada apenas no OVR.
  if(a > 5) a = 5;
  if(b > 5) b = 5;

  return {a,b};
}

function startLeague(){
  const opponents=CLUBS.slice();
  const table={};
  opponents.forEach(c=>table[c]={p:0,j:0,v:0,e:0,d:0,gp:0,gc:0});
  table[state.teamName]={p:0,j:0,v:0,e:0,d:0,gp:0,gc:0};
  const scorers={};
  Object.values(state.team).forEach(p=>scorers[p.name]=0);
  state.league={round:0,opponents,table,scorers,teamName:state.teamName};
  showScreen("league");
  if($("leagueTeamName")) $("leagueTeamName").textContent=state.teamName;
  $("round").textContent="0/38";
  renderTable();
  renderScorers();
}

function updateLeague(home,away,hg,ag){
  const A=state.league.table[home],B=state.league.table[away];
  A.j++;B.j++;A.gp+=hg;A.gc+=ag;B.gp+=ag;B.gc+=hg;
  if(hg>ag){A.v++;A.p+=3;B.d++;}
  else if(hg<ag){B.v++;B.p+=3;A.d++;}
  else{A.e++;B.e++;A.p++;B.p++;}
}

function playRound(){
  if(state.league.round>=38){alert("O campeonato já terminou.");return;}
  // Rotação dos adversários com embaralhamento por temporada.
  if(!state.league.schedule){
    const shuffled = state.league.opponents.slice();
    for(let i=shuffled.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
    }

    // 38 rodadas: completa a rotação e embaralha novamente.
    state.league.schedule=[];
    for(let r=0;r<38;r++){
      if(r>0 && r%shuffled.length===0){
        for(let i=shuffled.length-1;i>0;i--){
          const j=Math.floor(Math.random()*(i+1));
          [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
        }
      }
      state.league.schedule.push(
        shuffled[r%shuffled.length]
      );
    }
  }

  const opponent =
    state.league.schedule[state.league.round];
  let balance=(teamPower()-opponentPower(opponent))/15+(Math.random()-.5)*1.4;
  let myGoals=randomGoals(), oppGoals=randomGoals();
  if(balance>.5&&Math.random()<.7)myGoals=Math.max(myGoals,oppGoals+1);
  if(balance<-.5&&Math.random()<.7)oppGoals=Math.max(oppGoals,myGoals+1);
  if(Math.abs(balance)<.2&&Math.random()<.3)oppGoals=myGoals;
  updateLeague(state.league.teamName,opponent,myGoals,oppGoals);

  const events=[];
  for(let i=0;i<myGoals;i++){
    const ps=Object.values(state.team),sc=ps[Math.floor(Math.random()*ps.length)];
    state.league.scorers[sc.name]++; events.push(`⚽ ${sc.name}`);
  }
  for(let i=0;i<oppGoals;i++){
    const ps=RAW[opponent],sc=ps[Math.floor(Math.random()*ps.length)];
    events.push(`🔴 ${sc[0]}`);
  }
  state.league.round++;
  $("round").textContent=`${state.league.round}/38`;
  $("lastResult").innerHTML=`<div class="score">Meu Time ${myGoals} × ${oppGoals} ${opponent}</div>${events.map(e=>`<div class="goal">${e}</div>`).join("")}`;
  renderTable();renderScorers();
}

function simulateAll(){
  if(!state.league){
    alert("Primeiro monte e confirme seu time.");
    return;
  }

  if(state.league.round>=38){
    alert("O campeonato já terminou.");
    return;
  }

  const button=document.querySelector('button[onclick="simulateAll()"]');
  if(button) button.disabled=true;

  try{
    while(state.league.round<38){
      playRound();
    }

    renderTable();
    renderScorers();

    if($("round"))
      $("round").textContent=`${state.league.round}/38`;

    if($("lastResult")){
      $("lastResult").insertAdjacentHTML(
        "afterbegin",
        '<div style="text-align:center;font-weight:bold;margin-bottom:8px">🏁 Campeonato simulado até o fim!</div>'
      );
    }
  }catch(error){
    console.error("Erro ao simular campeonato:",error);
    alert("Ocorreu um erro ao simular. O código foi corrigido para evitar o problema.");
  }finally{
    if(button) button.disabled=false;
  }
}

function renderScorers(){
  const rows=Object.entries(state.league.scorers).sort((a,b)=>b[1]-a[1]);
  $("scorers").innerHTML=rows.map((r,i)=>`<div class="art"><span>${i+1}. ${r[0]}</span><b>${r[1]} ⚽</b></div>`).join("");
}

// ---------------- MODO AMIGOS ----------------


function createRoom(){
  if(!window.Peer){
    alert("PeerJS não carregou. Verifique sua internet.");
    return;
  }

  const size=roomSizeValue();
  const id="7A0-"+Math.random().toString(36).slice(2,7).toUpperCase();

  state.peer=new Peer(id);
  state.room={
    role:"host",size,hostId:id,players:{},
    draftStarted:false,matches:[],table:{},round:0,totalRounds:0
  };

  state.peer.on("open",()=>{
    state.room.players[id]=roomPlayer(id,roomName(),true);
    updateRoomPlayers();
    if($("roomStatus"))
      $("roomStatus").textContent=`🟢 Sala criada: ${id} — 1/${size} jogadores.`;
  });

  state.peer.on("connection",connection=>{
    if(state.room.role==="host"){
      setupRoomConnectionHost(connection);
    }else{
      setupRoomConnection(connection);
    }
  });

  state.peer.on("error",err=>{
    console.error(err);
    if($("roomStatus"))
      $("roomStatus").textContent="❌ Erro na sala: "+(err.message||err.type);
  });
}

function joinRoom(){
  const code=($("roomCode")?.value||"").trim().toUpperCase();
  if(!code){
    alert("Digite o código da sala.");
    return;
  }

  if(!window.Peer){
    alert("PeerJS não carregou. Verifique sua internet.");
    return;
  }

  state.peer=new Peer();

  state.room={
    role:"guest",size:2,hostId:null,players:{},
    draftStarted:false,matches:[],table:{},round:0,totalRounds:0
  };

  state.peer.on("open",()=>{
    const connection=state.peer.connect(code,{reliable:true});
    setupRoomConnection(connection);
  });

  state.peer.on("error",err=>{
    console.error(err);
    if($("roomStatus"))
      $("roomStatus").textContent="❌ Não foi possível entrar: "+(err.message||err.type);
  });
}

function setupRoomConnection(connection){
  state.connection=connection;

  connection.on("open",()=>{
    if(state.room.role==="guest"){
      connection.send({
        type:"JOIN_ROOM",
        name:roomName()
      });
      if($("roomStatus"))
        $("roomStatus").textContent="🟢 Conectado ao anfitrião. Aguardando confirmação...";
    }
  });

  connection.on("data",msg=>{
    if(!msg || !msg.type)return;

    if(msg.type==="ROOM_INFO"){
      state.room.size=msg.size||state.room.size;
      state.room.hostId=msg.hostId||state.room.hostId;
    }

    if(msg.type==="ROOM_STATE"){
      state.room.size=msg.size;
      state.room.hostId=msg.hostId;
      state.room.players=msg.players||{};
      updateRoomPlayers();
      if($("roomStatus"))
        $("roomStatus").textContent=`🟢 Sala: ${Object.keys(state.room.players).length}/${state.room.size} jogadores.`;
    }

    if(msg.type==="START_DRAFT"){
      state.room.draftStarted=true;
      state.room.size=msg.size;
      resetBuilder();
      showScreen("build");
      if($("roomStatus"))
        $("roomStatus").textContent="🎲 Monte seu time. Depois clique em Confirmar time.";
    }

    if(msg.type==="TEAM_READY"){
      if(state.room.role==="host"){
        const p=state.room.players[msg.id];
        if(p){
          p.name=msg.name||p.name;
          p.team=msg.team;
          p.ovr=msg.ovr||0;
          p.ready=true;
          updateRoomPlayers();

          if(allTeamsReady())
            hostCreateTournament();
          else
            roomBroadcast({type:"ROOM_STATE",...safeRoomState()});
        }
      }
    }

    if(msg.type==="TOURNAMENT"){
      applyTournamentState(msg);
    }

    if(msg.type==="TOURNAMENT_RESULT"){
      applyTournamentResult(msg);
    }

    if(msg.type==="RESULT" && $("friendResult")){
      $("friendResult").innerHTML=msg.html;
    }
  });

  connection.on("close",()=>{
    if($("friendStatus"))
      $("friendStatus").textContent="🔴 Um participante desconectou.";
  });
}

function sendTeam(){
  // Compatibilidade com o modo antigo de 2 pessoas.
  if(state.connection && state.connection.open){
    getTeamName();
    state.connection.send({
      type:"TEAM",
      team:state.team,
      ovr:Math.round(teamPower()),
      name:state.teamName
    });
  }
}

function checkFriend(){
  // No modo novo de sala, a própria sala controla os times.
  if(state.room && state.room.role)return;

  if(!state.remoteTeam)return;

  if($("myOvr"))
    $("myOvr").textContent=Math.round(teamPower());

  if($("friendOvr"))
    $("friendOvr").textContent=state.remoteTeam.ovr;

  const ready=
    Object.keys(state.team).length===11 &&
    Object.keys(state.remoteTeam.team||{}).length===11;

  if($("friendStatus"))
    $("friendStatus").textContent=
      ready?"✅ Os dois times estão prontos!":"Aguardando os dois times completarem.";

  if($("friendPlay"))
    $("friendPlay").disabled=!ready;
}


function roomSizeValue(){
  const n=parseInt(($("roomSize")&&$("roomSize").value)||"2",10);
  return [2,4,6,8,10].includes(n)?n:2;
}

function roomName(){
  return (state.teamName||"Meu Time").slice(0,24);
}

function roomPlayer(id,name,isHost){
  return {
    id,
    name:name||"Jogador",
    isHost:!!isHost,
    connected:true,
    ready:false,
    team:null,
    ovr:0,
    connection:null
  };
}

function safeRoomState(){
  const players={};
  Object.values(state.room.players||{}).forEach(p=>{
    players[p.id]={
      id:p.id,
      name:p.name,
      isHost:p.isHost,
      connected:p.connected,
      ready:p.ready,
      ovr:p.ovr
    };
  });
  return {
    size:state.room.size,
    hostId:state.room.hostId,
    players
  };
}

function updateRoomPlayers(){
  const box=$("roomPlayers");
  if(box){
    const players=Object.values(state.room.players||{});
    box.innerHTML=players.length
      ? players.map((p,i)=>
          `<div class="friend-player">${i+1}. <b>${p.name}</b> ${p.isHost?"👑":""} ${p.ready?"✅":"⏳"}</div>`
        ).join("")
      : "Nenhum jogador conectado.";
  }

  const start=$("startRoomButton");
  if(start){
    const count=Object.values(state.room.players||{}).filter(p=>p.connected).length;
    start.disabled=state.room.role!=="host" ||
      count!==state.room.size ||
      state.room.draftStarted;
  }
}

function roomBroadcast(msg){
  if(state.room.role!=="host")return;
  Object.values(state.room.players).forEach(p=>{
    if(p.id!==state.peer.id && p.connection && p.connection.open){
      p.connection.send(msg);
    }
  });
}

function setupRoomConnectionHost(connection){
  connection.on("open",()=>{
    const guestId=connection.peer;
    const player=roomPlayer(guestId,"Jogador",false);
    player.connection=connection;
    state.room.players[guestId]=player;

    connection.send({
      type:"ROOM_INFO",
      size:state.room.size,
      hostId:state.room.hostId
    });

    roomBroadcast({
      type:"ROOM_STATE",
      ...safeRoomState()
    });

    updateRoomPlayers();
  });

  connection.on("data",msg=>{
    if(!msg || !msg.type)return;

    if(msg.type==="JOIN_ROOM"){
      const p=state.room.players[connection.peer];
      if(p){
        p.name=(msg.name||"Jogador").slice(0,24);
        p.connected=true;
        updateRoomPlayers();
        roomBroadcast({
          type:"ROOM_STATE",
          ...safeRoomState()
        });
      }
    }

    if(msg.type==="TEAM_READY"){
      const p=state.room.players[connection.peer];
      if(p){
        p.name=(msg.name||p.name).slice(0,24);
        p.team=msg.team;
        p.ovr=Number(msg.ovr)||0;
        p.ready=true;

        updateRoomPlayers();

        if(allTeamsReady()){
          hostCreateTournament();
        }else{
          roomBroadcast({
            type:"ROOM_STATE",
            ...safeRoomState()
          });
        }
      }
    }
  });

  connection.on("close",()=>{
    const p=state.room.players[connection.peer];
    if(p){
      p.connected=false;
      p.ready=false;
    }
    updateRoomPlayers();
    roomBroadcast({
      type:"ROOM_STATE",
      ...safeRoomState()
    });
  });
}

function allTeamsReady(){
  const players=Object.values(state.room.players||{})
    .filter(p=>p.connected);
  return players.length===state.room.size &&
    players.every(p=>p.ready && p.team);
}


function hostStartDraft(){
  if(state.room.role!=="host")return;

  const players=Object.values(state.room.players)
    .filter(p=>p.connected);

  if(players.length!==state.room.size){
    alert(`A sala precisa ter ${state.room.size} pessoas. Atualmente há ${players.length}.`);
    return;
  }

  state.room.draftStarted=true;

  roomBroadcast({
    type:"START_DRAFT",
    size:state.room.size
  });

  resetBuilder();
  showScreen("build");

  if($("roomStatus"))
    $("roomStatus").textContent="🎲 Monte seu time e clique em Confirmar time.";

  updateRoomPlayers();
}

function submitRoomTeam(){
  if(!isTeamComplete()){
    alert("Complete os 11 jogadores.");
    return;
  }

  getTeamName();

  if(state.room.role==="host"){
    const me=state.room.players[state.peer.id];

    me.name=roomName();
    me.ready=true;
    me.team=JSON.parse(JSON.stringify(state.team));
    me.ovr=Math.round(teamPower());

    updateRoomPlayers();

    roomBroadcast({
      type:"ROOM_STATE",
      ...safeRoomState()
    });

    if(allTeamsReady()){
      hostCreateTournament();
    }else if($("roomStatus")){
      const ready=Object.values(state.room.players)
        .filter(p=>p.connected&&p.ready).length;
      $("roomStatus").textContent=
        `✅ Time pronto. ${ready}/${state.room.size} prontos.`;
    }

  }else if(state.connection && state.connection.open){

    state.connection.send({
      type:"TEAM_READY",
      id:state.peer.id,
      name:roomName(),
      team:JSON.parse(JSON.stringify(state.team)),
      ovr:Math.round(teamPower())
    });

    if($("roomStatus"))
      $("roomStatus").textContent=
        "✅ Time enviado. Aguardando os outros jogadores...";
  }
}

function hostCreateTournament(){
  if(state.room.role!=="host")return;
  if(!allTeamsReady())return;
  if(state.room.matches.length)return;

  const players=Object.values(state.room.players)
    .filter(p=>p.connected);

  const table={};

  players.forEach(p=>{
    table[p.id]={
      id:p.id,
      name:p.name,
      p:0,j:0,v:0,e:0,d:0,
      gp:0,gc:0,
      ovr:p.ovr
    };
  });

  // Todos contra todos.
  const ids=players.map(p=>p.id);
  const rounds=[];

  for(let i=0;i<ids.length;i++){
    for(let j=i+1;j<ids.length;j++){
      const roundIndex=(i+j)%Math.max(1,ids.length-1);
      if(!rounds[roundIndex])rounds[roundIndex]=[];
      rounds[roundIndex].push({
        a:ids[i],
        b:ids[j]
      });
    }
  }

  state.room.matches=rounds.filter(Boolean);
  state.room.table=table;
  state.room.round=0;
  state.room.totalRounds=state.room.matches.length;

  const payload=serializeRoomTournament();

  roomBroadcast({
    type:"TOURNAMENT",
    ...payload
  });

  applyTournamentState({
    type:"TOURNAMENT",
    ...payload
  });
}

function serializeRoomTournament(){
  return {
    matches:state.room.matches,
    table:state.room.table,
    round:state.room.round,
    totalRounds:state.room.totalRounds,
    players:Object.values(state.room.players)
      .filter(p=>p.connected)
      .map(p=>({
        id:p.id,
        name:p.name,
        ovr:p.ovr
      }))
  };
}

function applyTournamentState(msg){
  state.room.matches=msg.matches||[];
  state.room.table=msg.table||{};
  state.room.round=msg.round||0;
  state.room.totalRounds=msg.totalRounds||state.room.matches.length;

  showScreen("match");

  renderRoomTournament();

  if($("friendStatus"))
    $("friendStatus").textContent=
      `🏆 Campeonato iniciado — rodada ${state.room.round}/${state.room.totalRounds}`;
}

function roomTeamById(id){
  const p=state.room.players[id];
  return p ? p.team : null;
}

function simulateRoomGame(a,b){
  const pa=state.room.players[a];
  const pb=state.room.players[b];

  const result=simulateMatch(
    pa ? pa.ovr : 78,
    pb ? pb.ovr : 78
  );

  return {
    a:result.a,
    b:result.b
  };
}

function hostPlayRoomRound(){
  if(state.room.role!=="host")return;

  if(state.room.round>=state.room.totalRounds){
    alert("O campeonato da sala terminou.");
    return;
  }

  const games=state.room.matches[state.room.round]||[];
  const results=[];

  games.forEach(game=>{
    const result=simulateRoomGame(game.a,game.b);
    const A=state.room.table[game.a];
    const B=state.room.table[game.b];

    if(!A||!B)return;

    A.j++;B.j++;
    A.gp+=result.a;A.gc+=result.b;
    B.gp+=result.b;B.gc+=result.a;

    if(result.a>result.b){
      A.v++;A.p+=3;B.d++;
    }else if(result.a<result.b){
      B.v++;B.p+=3;A.d++;
    }else{
      A.e++;B.e++;A.p++;B.p++;
    }

    results.push({
      a:game.a,
      b:game.b,
      ag:result.a,
      bg:result.b
    });
  });

  state.room.round++;

  const payload={
    table:state.room.table,
    round:state.room.round,
    totalRounds:state.room.totalRounds,
    results
  };

  roomBroadcast({
    type:"TOURNAMENT_RESULT",
    ...payload
  });

  applyTournamentResult({
    type:"TOURNAMENT_RESULT",
    ...payload
  });
}

function applyTournamentResult(msg){
  state.room.table=msg.table||state.room.table;
  state.room.round=msg.round||state.room.round;

  renderRoomTournament(msg.results||[]);

  if($("friendStatus"))
    $("friendStatus").textContent=
      state.room.round>=state.room.totalRounds
      ? "🏁 Campeonato encerrado!"
      : `Rodada ${state.room.round}/${state.room.totalRounds}`;
}

function renderRoomTournament(results=[]){
  showScreen("match");

  const resultBox=$("friendResult");

  if(resultBox && results.length){
    resultBox.innerHTML=results.map(r=>{
      const A=state.room.table[r.a];
      const B=state.room.table[r.b];
      return `<div class="score">${A?A.name:"Time"} ${r.ag} × ${r.bg} ${B?B.name:"Time"}</div>`;
    }).join("");
  }

  const box=$("friendTable");
  if(!box)return;

  const rows=Object.values(state.room.table)
    .sort((a,b)=>{
      if(b.p!==a.p)return b.p-a.p;
      return (b.gp-b.gc)-(a.gp-a.gc);
    });

  box.innerHTML=`
    <table>
      <tr>
        <th>#</th><th>Time</th><th>PTS</th>
        <th>J</th><th>V</th><th>E</th><th>D</th>
        <th>GP</th><th>GC</th>
      </tr>
      ${rows.map((r,i)=>`
        <tr>
          <td>${i+1}</td>
          <td>${r.name}</td>
          <td><b>${r.p}</b></td>
          <td>${r.j}</td>
          <td>${r.v}</td>
          <td>${r.e}</td>
          <td>${r.d}</td>
          <td>${r.gp}</td>
          <td>${r.gc}</td>
        </tr>
      `).join("")}
    </table>
  `;

  const play=$("friendPlay");
  if(play){
    play.disabled=state.room.role==="guest" || state.room.round>=state.room.totalRounds;
    play.onclick=hostPlayRoomRound;
    play.textContent=
      state.room.round>=state.room.totalRounds
      ? "🏁 Campeonato encerrado"
      : "⚽ Jogar próxima rodada";
  }
}

function playFriendMatch(){
  if(!state.room.draftStarted){alert('Primeiro monte seu time.');return;}
  if(state.room.role==='host')hostPlayRoomRound();
  else if(state.connection&&state.connection.open)state.connection.send({type:'PLAY_ROOM_ROUND'});
}

function renderFriendTournament(lastResult){
  const players=Object.values(state.room.players||{});
  if($('friendStatus'))$('friendStatus').textContent=state.room.finished?'🏆 Campeonato encerrado!':`Rodada ${state.room.round}/${state.room.totalRounds} — ${players.length} participantes.`;
  if($('friendPlayers'))$('friendPlayers').innerHTML=players.map(p=>`<div class="friend-player"><b>${p.name}</b> — OVR ${p.ovr||'?'} ${p.ready?'✅':'⏳'}</div>`).join('');
  if($('friendResult'))$('friendResult').innerHTML=lastResult||'Aguardando a próxima rodada...';
  if($('friendPlay')){
    $('friendPlay').disabled=state.room.finished||!state.room.matches.length;
    $('friendPlay').textContent=state.room.role==='host'?'⚽ Jogar próxima rodada':'⏳ Aguardando o anfitrião';
  }
  const rows=Object.values(state.room.table||{}).sort((a,b)=>b.p-a.p||((b.gp-b.gc)-(a.gp-a.gc))||b.gp-a.gp);
  if($('friendTable'))$('friendTable').innerHTML=`<table><tr><th>#</th><th>Time</th><th>PTS</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th></tr>${rows.map((r,i)=>`<tr class="${state.peer&&r.id===state.peer.id?'mine':''}"><td>${i+1}</td><td>${r.name}</td><td><b>${r.p}</b></td><td>${r.j}</td><td>${r.v}</td><td>${r.e}</td><td>${r.d}</td><td>${r.gp-r.gc}</td></tr>`).join('')}</table>`;
}

// Confirmação: sala multijogador usa o protocolo da sala.
const _confirmTeamSolo=confirmTeam;
confirmTeam=function(){
  if(state.room&&state.room.draftStarted){submitRoomTeam();return;}
  _confirmTeamSolo();
};

// Inicialização extra para a nova interface.
updateRoomPlayers();

