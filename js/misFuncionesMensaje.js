function traerInformacionMensajes(){
    $.ajax({
    url:"http://155.248.215.163:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMensajes(respuesta);
        }
    });
}

function pintarRespuestaMensajes(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageTex+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);/* anteriormente estaba con append $("#resultado1").append(myTable); 
    con html...no permite duplicar la consulta en el front end.
    */
}

function guardarInformacionMensajes(){
    let myData={
        messageTex:$("#MmessageTex").val(),
        
    };
    
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:'JSON',
        data: JSON.stringify(myData),

        url:"http://155.248.215.163:8080/api/Message/save",

        success:function(response){
            console.log(response);
            console.log("Guardado exitoso del mensaje")
            alert("Guardado exitoso del mensaje");
            window.location.reload()
        },
        error: function(jqXHR, textStatus, errorThrown){
            window.location.reload()
            alert("No se guardo correctamente el mensaje");


        }
    });

}