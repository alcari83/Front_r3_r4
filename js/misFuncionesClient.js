function traerInformacionClientes(){
    $.ajax({
    url:"http://155.248.215.163:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}

function pintarRespuestaClientes(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionClientes("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarClientes("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);/* anteriormente estaba con append $("#resultado1").append(myTable); 
    con html...no permite duplicar la consulta en el front end.
    */
}

function guardarInformacionClientes(){
    let myData={
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),
    };
    
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:'JSON',
        data: JSON.stringify(myData),

        url:"http://155.248.215.163:8080/api/Client/save",

        success:function(response){
            console.log(response);
            console.log("Guardado exitoso del cliente")
            alert("Guardado exitoso del cliente");
            window.location.reload()
        },
        error: function(jqXHR, textStatus, errorThrown){
            window.location.reload()
            alert("No se guardo correctamente el cliente");


        }
    });

}


function actualizarInformacionClientes(idElemento){
    let myData={
        id:idElemento,
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://155.248.215.163:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado3").empty();
            $("#id").val(""); // no se bien...si es necesario el id, lo digo porque como no esta en las tablas
            $("#Clemail").val("");
            $("#Clpassword").val("");
            $("#Clname").val("");
            $("#Clage").val("");
            traerInformacionClientes();
            alert("se ha Actualizado correctamente")
        }
    });

}

function borrarClientes(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://155.248.215.163:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado3").empty();
            traerInformacionClientes();
            alert("Se ha Eliminado.")
        }
    });

}
