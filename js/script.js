function simular() {

    var tempoSimulacao = document.getElementById('ipMinutos').value,
        tec = document.getElementById('ipTEC').value,
        ts = document.getElementById('ipTS').value,
        spanResultado = document.getElementById('spanResultado')
    
    var tableProb = document.getElementById('tbSimulacao')
    while (tableProb.rows.length > 1) {
        tableProb.deleteRow(1);
    }

    var tempoChegadaList = tec.split(";"),
        tempoServicoList = ts.split(";"),
        listaCarro = [],
        numCliente = -1,
        tempo = 0,
        tamChegadaList = 0,
        tamServicoList = 0

    for(let key in tempoChegadaList) {
        if(tempoChegadaList.hasOwnProperty(key)){
            tamChegadaList++;
        }
    }

    for(let key in tempoServicoList) {
        if(tempoServicoList.hasOwnProperty(key)){
            tamServicoList++;
        }
    }

    totalCarro = new Object()
    totalCarro.tempoServico = 0
    totalCarro.tempoEspera = 0
    totalCarro.tempoSistema = 0
    totalCarro.operadorLivre = 0
    while (tempo < tempoSimulacao) {
        let randChegada = Math.floor(Math.random() * (tamChegadaList)),
            randServico = Math.floor(Math.random() * (tamServicoList))

        let chegada = tempoChegadaList[randChegada],
            servico = tempoServicoList[randServico]
        
        carro = new Object()
        carro.numero = Number(++numCliente)+1
        carro.tempoUltimaChegada = Number(chegada)
        carro.tempoChegada = Number(chegada) + (numCliente > 0 ? Number(listaCarro[numCliente-1].tempoChegada) : 0)
        carro.tempoServico = Number(servico)
        if (numCliente > 0 && listaCarro[numCliente-1].finalServico >= carro.tempoChegada)
            carro.tempoEspera = Number(listaCarro[numCliente-1].finalServico) - Number(carro.tempoChegada)
        else
            carro.tempoEspera = 0
        carro.inicioServico = Number(carro.tempoChegada) + Number(carro.tempoEspera)
        carro.finalServico = Number(carro.tempoServico) + Number(carro.inicioServico)
        carro.tempoSistema = Number(carro.tempoServico) + Number(carro.tempoEspera)
        if (numCliente > 0 && listaCarro[numCliente-1].finalServico < carro.tempoChegada)
            carro.operadorLivre = Number(carro.tempoChegada) - Number(listaCarro[numCliente-1].finalServico)
        else
            carro.operadorLivre = 0
            
        insereLinhaTabela(numCliente, carro)

        totalCarro.tempoServico += Number(carro.tempoServico)
        totalCarro.tempoEspera += Number(carro.tempoEspera)
        totalCarro.tempoSistema += Number(carro.tempoSistema)
        totalCarro.operadorLivre += Number(carro.operadorLivre)
        totalCarro.finalServico = carro.finalServico

        listaCarro.push(carro)
        tempo = carro.finalServico
    }

    spanResultado.innerHTML = "<strong>"+
                                "Tempo médio de espera na fila: "+ (totalCarro.tempoEspera / numCliente).toFixed(2) + " minutos.<br/>" +
                                "Probabilidade de um cliente esperar na fila: " + ((totalCarro.tempoEspera / numCliente) * 100).toFixed(2) + "%.<br/>" +
                                "Probabilidade do operador livre: " + ((totalCarro.operadorLivre / totalCarro.finalServico) * 100).toFixed(2) + "%.<br/>" +
                                "Tempo médio de serviço: " + (totalCarro.tempoServico / numCliente).toFixed(2) + " minutos.<br/>" +
                                "Tempo médio despendido no sistema: " + (totalCarro.tempoSistema / numCliente).toFixed(2) + " minutos." +
                            "</strong>"
    
    totalCarro.numero = ""
    totalCarro.tempoUltimaChegada = ""
    totalCarro.tempoChegada = ""
    totalCarro.inicioServico = ""
    totalCarro.finalServico = ""
    insereLinhaTabela("", totalCarro)
};

function insereLinhaTabela(numCliente, carro) {
    var tableProb = document.getElementById('tbSimulacao')

    var tableRow = tableProb.insertRow(-1)
    tableRow.id = "tr"+numCliente;

    let tdCliente = tableRow.insertCell(-1)
    tdCliente.id = "td"+numCliente+1
    tdCliente.innerHTML = numCliente

    let tdTempoDesdeUltimaChegada = tableRow.insertCell(-1)
    tdTempoDesdeUltimaChegada.id = "td"+numCliente+2
    tdTempoDesdeUltimaChegada.innerHTML = carro.tempoUltimaChegada

    let tdTempoChegadaRelogio = tableRow.insertCell(-1)
    tdTempoChegadaRelogio.id = "td"+numCliente+3
    tdTempoChegadaRelogio.innerHTML = carro.tempoChegada

    let tdTempoServico = tableRow.insertCell(-1)
    tdTempoServico.id = "td"+numCliente+4
    tdTempoServico.innerHTML = carro.tempoServico

    let tdTempoInicioServico = tableRow.insertCell(-1)
    tdTempoInicioServico.id = "td"+numCliente+5
    tdTempoInicioServico.innerHTML = carro.inicioServico

    let tdClienteFila = tableRow.insertCell(-1)
    tdClienteFila.id = "td"+numCliente+6
    tdClienteFila.innerHTML = carro.tempoEspera

    let tdTempoFinalServico = tableRow.insertCell(-1)
    tdTempoFinalServico.id = "td"+numCliente+7
    tdTempoFinalServico.innerHTML = carro.finalServico

    let tdClienteSistema = tableRow.insertCell(-1)
    tdClienteSistema.id = "td"+numCliente+8
    tdClienteSistema.innerHTML = carro.tempoSistema

    let tdTempoLivreOperador = tableRow.insertCell(-1)
    tdTempoLivreOperador.id = "td"+numCliente+9
    tdTempoLivreOperador.innerHTML = carro.operadorLivre
};