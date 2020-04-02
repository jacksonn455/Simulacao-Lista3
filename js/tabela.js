botao = $("#adicionar-paciente");
botao.on("click", function() {
    var tempo = $('#tempo').val();
    var chegadaA = $('#chegadaA').val();
    var chegadaB = $('#chegadaB').val();
    var chegadaC = $('#chegadaC').val();
    var servicoA = $('#servicoA').val(); 
    var servicoB = $('#servicoB').val(); 
    var servicoC = $('#servicoC').val(); 
    if(tempo > 180){
        alert("Valor deve ser menor ou igual a 180 minutos")
    }else {
        alert(tempo);
    }

});
