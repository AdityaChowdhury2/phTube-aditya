const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json();
    const categories = data.data;

    const categoryContainer = document.getElementById('category-container');

    categories.forEach((category) => {
        const a = document.createElement('a');
        a.classList = 'btn tab  btn-sm';
        a.innerHTML = `
            ${category.category}
        `
        a.onclick = () => loadVideos(category.category_id);
        categoryContainer.appendChild(a);
    })

    categoryContainer.firstElementChild.classList.add('tab-active', 'bg-primary-color', 'text-white', 'border-none', 'hover:bg-dark-primary-color');


};


const loadVideos = async categoryId => {
    console.log('Clicked', categoryId);

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json();
    const videos = data.data;
    console.log(videos);

    const videoContainer = document.getElementById('video-container');
    videoContainer.innerText = '';

    const noContentContainer = document.getElementById('no-content-container');

    noContentContainer.innerText = '';
    const noContentDiv = document.createElement('div');
    noContentDiv.innerHTML = `
        <img src='images/Icon.png'>
        <h2 class='font-bold text-3xl'>Oops!! Sorry, There is no content here.</h2> 
    `
    noContentDiv.classList = 'mt-52 flex flex-col items-center text-center'


    videos.length ? videos.forEach((video) => {

        const div = document.createElement('div')
        div.innerHTML = `
        <div class="relative">
        <img src="https://i.ibb.co/L1b6xSq/shape.jpg" alt="" class="rounded-xl">
        <p
            class="absolute p-[5px] bottom-2 right-2 text-white text-xs bg-dark-secondary-color rounded-md">
            3 hrs
            56
            mins
            ago</p>
    </div>

    <div class="flex gap-3 mt-5">
        <div class="avatar">
            <div class="w-10 h-10 rounded-full">
                <img src="https://i.ibb.co/D9wWRM6/olivia.jpg" />
            </div>
        </div>
        <div>
            <h3 class="font-bold">Building a winning UX strategy Using the kano Model</h3>
            <div class="flex gap-2">
                <p class="text-sm text-gray-400">Awlad Hossain</p>
                <img src="images/verified.png">
            </div>
            <p class="text-sm text-gray-400"><span>91</span>k views</p>
        </div>
    </div>
        `

        videoContainer.appendChild(div);
    }) : noContentContainer.appendChild(noContentDiv)






};


loadCategories();
loadVideos('1000');
