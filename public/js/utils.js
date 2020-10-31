(() => {
    let filmSelect = document.getElementById('film-select');
    const changeSelectSize = () => {
        if(window.innerWidth >= 768){
            filmSelect.size = '2';
        }
        else{
            filmSelect.size = '1';
        }
    }
    
    window.addEventListener('resize', changeSelectSize);
    changeSelectSize();    
})();