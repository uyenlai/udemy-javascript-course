const panes = document.querySelectorAll('.tab-pane');
const tabs = document.querySelectorAll('.tab-item');
const line = document.querySelector('.tabs .line');
const tabActive = document.querySelector('.tab-item.active');


tabs.forEach((tab, index) => {
    const pane = panes[index];
    tab.onclick =  function() {
        document.querySelector('.tab-item.active').classList.remove('active') 
        tab.classList.add('active')
        
        line.style.left = tab.offsetLeft + 'px';
        line.style.width = tab.offsetWidth + 'px';

        document.querySelector('.tab-pane.active').classList.remove('active') 
        pane.classList.add('active')
    }
})


