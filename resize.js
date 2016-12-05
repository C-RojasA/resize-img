function ResizeImage(files){

resizeAndUpload(files[0]);

function resizeAndUpload(file)
{
    //obtener la informacion de la imagen
    var reader = new FileReader();

    //al terminar de obtener la informacion de la imagen ejecutar la funcion
    reader.onload = function() {
        //creamos un nuevo objeto imagen
        var tempImg = new Image();

        tempImg.onload = function() {
            // Ancho y el alto que queremos de la de la imagen
            var MAX_WIDTH = 1200;
            var MAX_HEIGHT = 900;

            var tempW = tempImg.width;
            var tempH = tempImg.height;

            if (tempW > tempH) {
                if (tempW > MAX_WIDTH) {
                    tempH *= MAX_WIDTH / tempW;
                    tempW = MAX_WIDTH;
                }
            } else {
                if (tempH > MAX_HEIGHT) {
                    tempW *= MAX_HEIGHT / tempH;
                    tempH = MAX_HEIGHT;
                }
            }
            // Creamos un canvas para la imagen reducida y la dibujamos
            var resizedCanvas = document.getElementById('miniatura');
            resizedCanvas.width = tempW;
            resizedCanvas.height = tempH;

            var ctx = resizedCanvas.getContext("2d");
            ctx.drawImage(this, 0, 0, tempW, tempH);
            var dataURL = resizedCanvas.toDataURL("image/jpeg");
            document.getElementById('hidden_imagen').value = dataURL;

            //Recogemos el valor del input
            var fd = new FormData();
            fd.append("image", file);
        };
        tempImg.src = reader.result;
    }
    reader.readAsDataURL(file);
}



}
