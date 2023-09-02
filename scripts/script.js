
const videoContainer = document.getElementById('video-container');
const categoryContainer = document.getElementById('category-container');
const noContentContainer = document.getElementById('no-content-container');

let isSort = false;

const clearScreen = () => {
    videoContainer.innerText = '';
    noContentContainer.innerText = '';
}

const handleSort = () => {
    isSort = !isSort;
    clearScreen()
    loadCategories(isSort);
}

const toggleLoadingBars = (isLoading) => {
    const loadingBars = document.getElementById('loading-bars');
    isLoading && loadingBars.classList.remove('hidden');
    !isLoading && loadingBars.classList.add('hidden');
}

const loadCategories = async (isSort) => {
    toggleLoadingBars(true)
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json();
    const categories = data.data;

    categoryContainer.innerText = ''
    categories.forEach((category) => {
        const a = document.createElement('a');
        a.classList = 'btn tab  btn-sm';
        a.innerHTML = `
            ${category.category}
        `
        a.onclick = (e) => {
            e.target.parentElement.querySelector('.tab-active').classList.remove('tab-active', 'bg-primary-color', 'text-white', 'border-none', 'hover:bg-dark-primary-color')
            e.target.classList.add('tab-active', 'bg-primary-color', 'text-white', 'border-none', 'hover:bg-dark-primary-color');
            clearScreen();
            loadVideos(category.category_id, isSort)
        };
        categoryContainer.appendChild(a);
    })
    toggleLoadingBars(false)

    categoryContainer.firstElementChild.classList.add('tab-active', 'bg-primary-color', 'text-white', 'border-none', 'hover:bg-dark-primary-color');

    loadVideos('1000', isSort);
};


const loadVideos = async (categoryId, isSort) => {

    toggleLoadingBars(true)
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json();
    const videos = data.data;

    const noContentDiv = document.createElement('div');
    noContentDiv.innerHTML = `
        <img src='images/Icon.png'>
        <h2 class='font-bold text-3xl mt-5'>Oops!! Sorry, There is no content here.</h2> 
    `
    noContentDiv.classList = 'mt-52 flex flex-col items-center text-center';

    isSort && videos.sort((a, b) => b.others.views.slice(0, -1) - a.others.views.slice(0, -1))

    videos.length ?

        videos.forEach(({ thumbnail, title, authors, others, }) => {

            const div = document.createElement('div')
            div.classList = 'card';
            div.innerHTML = `
        <figure class="relative">
            <img src=${thumbnail} alt="" class="w-full h-48 rounded-xl">
             
            <p class="absolute p-[5px] bottom-2 right-2 text-white text-xs bg-dark-secondary-color rounded-md ${Number(others.posted_date) ? '' : 'hidden'} "> ${fixTime(others.posted_date)}
            </p>
        </figure >
    <div class="flex gap-3 mt-5">
        <div class="avatar">
            <div class="w-10 h-10 rounded-full">
                <img src="https://i.ibb.co/D9wWRM6/olivia.jpg" />
            </div>
        </div>
        <div>
            <h3 class="font-bold">${title}</h3>
            <div class="flex gap-2">
                <p class="text-sm text-gray-400">${authors[0].profile_name}</p>
                <img class="${authors[0]?.verified === true ? '' : 'hidden'}" src="./images/verified.png">
            </div>
            <p class="text-sm text-gray-400"><span>${others.views}</span> views</p>
        </div>
    </div>
`

            videoContainer.appendChild(div);

        })
        : noContentContainer.appendChild(noContentDiv)
    toggleLoadingBars(false)

};
loadCategories(isSort);


const fixTime = (sec) => {
    const hours = Math.trunc(sec / 3600);
    const mins = Math.trunc((sec % 3600) / 60);
    return `${hours}hrs ${mins} min ago`;
}
