let isSort = false;

const handleSort = () => {
    isSort = !isSort;
    loadCategories(isSort);
}
const loadCategories = async (isSort) => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json();
    const categories = data.data;

    const categoryContainer = document.getElementById('category-container');
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
            loadVideos(category.category_id, isSort)
        };
        categoryContainer.appendChild(a);
    })

    categoryContainer.firstElementChild.classList.add('tab-active', 'bg-primary-color', 'text-white', 'border-none', 'hover:bg-dark-primary-color');

    loadVideos('1000', isSort);
};


const loadVideos = async (categoryId, isSort) => {
    // console.log('Clicked', categoryId);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json();
    const videos = data.data;

    const videoContainer = document.getElementById('video-container');
    videoContainer.innerText = '';

    const noContentContainer = document.getElementById('no-content-container');

    noContentContainer.innerText = '';
    const noContentDiv = document.createElement('div');
    noContentDiv.innerHTML = `
        <img src='images/Icon.png'>
        <h2 class='font-bold text-3xl'>Oops!! Sorry, There is no content here.</h2> 
    `
    noContentDiv.classList = 'mt-52 flex flex-col items-center text-center';
    console.log(isSort);
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
            // console.log(authors[0]?.verified === true, authors[0].profile_name);
            videoContainer.appendChild(div);
        })
        : noContentContainer.appendChild(noContentDiv)






};
loadCategories(isSort);


const fixTime = (sec) => {
    const hours = Math.trunc(sec / 3600);
    const mins = Math.trunc((sec % 3600) / 60);
    return `${hours}hrs ${mins}mins ago`;
    // console.log(`${ hours }hrs ${ mins }mins ago`);
}

