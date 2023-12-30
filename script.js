const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalLoaded = 0;
let photosArray = [];

const count = 30;
const apiKey = 'T1IXWgdr2-TRKWluB9DBTyH5qLoyF4ftXiQbgXFthCE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded(){
    imageLoaded++;
    if(imagesLoaded === totalLoaded){
        ready = true;
        loader.hidden = true;
        console.log('ready=', ready)
    }
    
}

function setAttributes (element,attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

//Create Elements for links & Photos, Add to DOM
function displayPhotos(){
    imageLoaded = 0;
    totalLoaded=photosArray.length;
    console.log('total Images=',totalLoaded)
    photosArray.forEach((photo)=>{
        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank'
        })
        const image = document.createElement('img');
        setAttributes(image,{
            'src':photo.urls.regular,
            'alt':photo.alt_description,
            'title':photo.alt_description
        })
        img.addEventListener('load',imageLoaded);
        item.appendChild(image);
        imageContainer.appendChild(item)

    })
}

// Get Photos from API
async function getPhotos (){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()
    }catch (error) {

    }
}

window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})

getPhotos();