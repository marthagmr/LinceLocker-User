var db = firebase.database();

var update = document.getElementById('update');
update.disabled = true;

function value(request){
    return  document.getElementById(request).value;
}
function asignation(request,response){
    return  document.getElementById(request).value=response;
}
function printHTML(request,response){
    return document.getElementById(request).innerHTML+=response;
}
function inHTML(request,response){
    return document.getElementById(request).innerHTML=response;
}
function dateActuality(){
    var fh = new Date();
    return fh.getFullYear()+"-"+(fh.getMonth()+1)+"-"+fh.getDate()+" "+fh.getHours()+":"+fh.getMinutes();
}
function insertTask(ID,carrera){
    db.ref('task/').push({
        ID:ID,
        carrera:carrera,
        date:dateActuality()
    });
}
function onClickInsert(){
    var ID = value("ID")
    var carrera = value("carr");
    if(ID.length==0 || carrera.length==0){ 
        alert("empty field"); 
    }else{ 
        inHTML("loadTable","");
        insertTask(ID,carrera); 
        asignation("ID","");
        asignation("carr","");
        alert("Saved successfully");
    }
}
function updateTask(ID,carrera,key){
    db.ref('task/'+key).update({
        ID:ID,
        carrera:carrera,
        date:dateActuality()
    });
}
function onClickUpdate(){
    var ID = value("IDEdit");
    var carrera = value("carrEdit");
    var key = value("key"); 
    if(ID.length==0 || carrera.length==0){ 
        alert("empty field"); 
    }else{ 
        inHTML("loadTable","");
        updateTask(ID,carrera,key); 
        inHTML("editData","");
        alert("Modify successfully");
        update.disabled = true;
    }
}
function removeTask(key){
    if(confirm("You want to delete task?")){
        inHTML("loadTable","");
        db.ref('task/'+key).remove();
    }
}
function table(ID,carrera,date,key){
    return '<tr><td>'+ID+'</td><td>'+carrera+'</td><td>'+date+'</td>'+
    '<td><a href="#" onclick="viewDataUpdate(\''+ID+'\',\''+carrera+'\',\''+key+'\')">'+
    '<td><a href="#" onclick="removeTask(\''+key+'\')">'+
     '<i class="fas fa-trash-alt red icon-lg"></i></a></td></tr>';
}
function viewDataUpdate(ID,carrera,key){
    var response = '<div class="form-group"><input type="hidden" value='+key+' id="key">' +
    '<input type="text" id="ID" class="form-control" placeholder="Id" value='+ID+'>'+
    '<div class="form-group">'+
    '<textarea placeholder="Especialidad" class="form-control" id="carrEdit">'+carrera+'</textarea>'+
    '</div>';
    inHTML('editData',response);
    update.disabled = false;
}
var reference = db.ref('task/');    
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.ID,value.carrera,value.date,nodo);
            printHTML('loadTable',sendData);
    });       
});