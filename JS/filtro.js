const toggleSearchBtn = document.getElementById('boton-filtro');
const searchFilter = document.getElementById('search-filter');
const overlay = document.getElementById('overlay');

// Agregar evento click al boton de alternar busqueda
toggleSearchBtn.addEventListener('click', () => {
    // Alternar la visibilidad del filtro de busqueda
    searchFilter.style.display = searchFilter.style.display === 'block' ? 'none' : 'block';
});
/*---------------------------------------------------*/
/*--------Calcular edad en Mi perfil--------*/

document.getElementById('Fecha_nacimiento').addEventListener('change',function(){
    const Fecha_nacimiento=new Date(this.value);
    const fechaActual=new Date();
    let edad_calculada= fechaActual.getFullYear()-Fecha_nacimiento.getFullYear();
    const diferencia=fechaActual.getMonth()-Fecha_nacimiento.getMonth();

    if(diferencia<0||(diferencia===0&&fechaActual.getDate()<Fecha_nacimiento.getDate())){
        edad_calculada--;
    }


    
    document.getElementById('edad_calculada').value=edad_calculada + ' años';
    
    });
    
   


