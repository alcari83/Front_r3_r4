function traerInformacionCabin(){
    $.ajax({
    url:"http://155.248.215.163:8080/api/Cabin/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaCabin(respuesta);
        }
    });
}

function pintarRespuestaCabin(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].rooms+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionCabin("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCabin("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);/* anteriormente estaba con append $("#resultado1").append(myTable); 
    con html...no permite duplicar la consulta en el front end.
    */
}

function guardarInformacionCabin(){
    let myData={
        name:$("#Caname").val(),
        brand:$("#Cabrand").val(),
        rooms:$("#Carooms").val(),
        description:$("#Cadescription").val(),
    };
    
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:'JSON',
        data: JSON.stringify(myData),

        url:"http://155.248.215.163:8080/api/Cabin/save",

        success:function(response){
            console.log(response);
            console.log("Guardado exitoso de cabañas")
            alert("Guardado exitoso de cabañas");
            window.location.reload()
        },
        error: function(jqXHR, textStatus, errorThrown){
            window.location.reload()
            alert("No se guardo correctamente la cabaña");


        }
    });

}

function actualizarInformacionCabin(idElemento){
    let myData={
        id:idElemento,
        name:$("#Caname").val(),
        brand:$("#Cabrand").val(),
        rooms:$("#Carooms").val(),
        description:$("#Cadescription").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://155.248.215.163:8080/api/Cabin/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            $("#id").val("");
            $("#Caname").val("");
            $("#Cabrand").val("");
            $("#Cadescription").val("");
            traerInformacionCabin();
            alert("se ha Actualizado correctamente")
        }
    });

}

function borrarCabin(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://155.248.215.163:8080/api/Cabin/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            traerInformacionCabin();
            alert("Se ha Eliminado.")
        }
    });

}