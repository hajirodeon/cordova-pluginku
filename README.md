# cordova-pluginku
bundle proyek phonegap cordova, yang berisi banyak plugin - plugin penting yang sering digunakan


<p>
Untuk menggunakan plugin cordova, diperlukan jquery. Jadi pastikan jquery telah terpasang pada folder “/www”
</p>

<p>
berikut cara penulisan dalam file html dalam folder “/www”
</p>


<pre>
<script type="text/javascript" charset="utf-8" src="file-java-script-plugin.js"></script>

<script>
  
$(document).ready(function(){

document.addEventListener('deviceready', function () {

//isi dari syntax plugin cordova

//pedoman syntax bisa lihat pada detail plugin yang tercatat dari situs-nya

});

});

</script>
</pre>



<p>
“File-java-script-plugin.js” bisa kita ketahui dari folder “/plugins/nama-plugin-cordova/www/”
</p>


