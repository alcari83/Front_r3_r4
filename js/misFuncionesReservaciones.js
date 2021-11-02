function traerInformacionReservaciones(){
    $.ajax({
    url:"http://155.248.215.163:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservaciones(respuesta);
        }
    });
}

function pintarRespuestaReservaciones(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado5").html(myTable);/* anteriormente estaba con append $("#resultado1").append(myTable); 
    con html...no permite duplicar la consulta en el front end.
    */
}

function guardarInformacionReservaciones(){
    let myData={
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        
    };
    
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:'JSON',
        data: JSON.stringify(myData),

        url:"http://155.248.215.163:8080/api/Reservation/save",

        success:function(response){
            console.log(response);
            console.log("Guardado exitoso de la reservación")
            alert("Guardado exitoso de la reservación");
            window.location.reload()
        },
        error: function(jqXHR, textStatus, errorThrown){
            window.location.reload()
            alert("No se guardo correctamente la reservación");


        }
    });

}