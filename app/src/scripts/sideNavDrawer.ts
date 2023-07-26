const bagBtn: HTMLElement = document.querySelector('.nav-header-search-btn');
const sideNavDrawer: HTMLElement = document.querySelector('.side-nav');
const overlay: HTMLElement = document.querySelector('.overlay');
const keepBuyBtn: HTMLElement = document.querySelector('.side-nav-no-itens-content-btn');
const sideNavNoItens: HTMLElement = document.querySelector('.side-nav-no-itens');
const sideNavItens: HTMLElement = document.querySelector('.side-nav-itens');
const btnContinueCart: HTMLElement = document.querySelector('.side-nav-itens-info-finish-btn-continue');
const finishCartBtn: HTMLElement = document.querySelector('.side-nav-itens-info-finish-btn');

finishCartBtn.addEventListener('click', (): void => {
    alert('Sua compra foi finalizada')
})

let hasItens: string | boolean = localStorage.getItem('hasItens') || false;

export const dealWithItens = (hasItens: string | boolean): void => {

    if ( hasItens ) {
        sideNavNoItens.style.display = 'none';
        sideNavItens.style.display = 'block';
    } else {
        sideNavNoItens.style.display = 'block';
        sideNavItens.style.display = 'none';
    }
}

dealWithItens(hasItens)


const openDrawer = (): void => {
    bagBtn.addEventListener('click', (): void => {
        sideNavDrawer.style.transform = 'translateX(0)';
        overlay.classList.add('overlay-open');
    })
}

openDrawer();

const closeDrawer = (): void => {
    const closeBtn: HTMLElement = document.querySelector('.side-nav-top-close');
    closeBtn.addEventListener('click', (): void => {
        sideNavDrawer.style.transform = 'translateX(100%)';
        overlay.classList.remove('overlay-open');
    })

    overlay.addEventListener('click', (): void => {
        sideNavDrawer.style.transform = 'translateX(100%)';
        overlay.classList.remove('overlay-open');
    })

    keepBuyBtn.addEventListener('click', (): void => {
        sideNavDrawer.style.transform = 'translateX(100%)';
        overlay.classList.remove('overlay-open');
    })

    btnContinueCart.addEventListener('click', (): void => {
        sideNavDrawer.style.transform = 'translateX(100%)';
        overlay.classList.remove('overlay-open');
    })
};

closeDrawer();