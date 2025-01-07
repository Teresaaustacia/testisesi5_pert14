var NIM = "2401010714"
var urlAPI = "https://apimhstiki.ptov.my.id/"
var urlLIST = urlAPI+"/testi-"+NIM+"/read"
var urlDEL = `${urlAPI}/testi`

$("infsukses").hide()
$("infgagal").hide()
$(function(){
    listdata()
})

function listdata(){
    $.ajax({
        url: urlLIST,
        method: 'GET',
        DataType: 'json',
        success: function(dta){
            let tbl = ""
            let idx = 0
            if(dta.error == 4){
                dta.TESTI.forEach(function(isi){
                    tbl += `<tr>
                    <td>${isi.NAMA}</td>
                    <td>${isi.EMAIL}</td>
                    <td>${isi.TESTI}</td>
                    <td>${isi.IPX}</td>
                    <td><a onclick="destroy('${idx}')" class="btn btn-danger btn-sm"> Hapus </a></td>
                  </tr>`
                })
                $("tbody").html(tbl)
            }
        },
        error:function(){
            console.log("Gagal mengambil Data Testimoni")
        }
    })
}
function destroy(idx){
    $.ajax({
        url:urlDEL,
        method:'POST',
        data:'ACT=destroy&NIM='+NIM+'&IDX='+idx,
        dataType:'json',
        succes: function(dta){
            console.log(dta)
            if(dta.error ==0){
                $("infsukses").show()
            }else{
                $("infgagal").show()
            }
        },
        error:function(){
            console.log("Terjadi Masalah saat Menghapus Data")
        }

    })

}