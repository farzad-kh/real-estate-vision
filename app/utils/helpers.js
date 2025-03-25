const ratesPer = (rate) => {
    
 if (rate?.night) {
    return `$${rate?.night.toLocaleString()}/night`
 }else if(rate?.week){
      return `$${rate?.week.toLocaleString()}/wk`
 }else if(rate?.month){
  return `$${rate?.month.toLocaleString()}/mo`
 }else{
    return `Contact`
 }
}
const getBase64 = (file) =>
   new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => resolve(reader.result);
     reader.onerror = (error) => reject(error);
   });


   const resizeImage = (file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = document.createElement("img");
          img.src = event.target.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
  
            canvas.width = 240;
            canvas.height = 240;
            ctx.drawImage(img, 0, 0, 240, 240);
  
            resolve(canvas.toDataURL(file.type));
          };
        };
      });

const getBase64Strings = (images)=>{
 return images.filter(item => 
    typeof item === "string" && item.startsWith("data:image")
  );
}

function extractCloudinaryId(url) {
  return url.split("/").pop().split(".")[0];
}
 const singelImageFilter=(message)=>{
  return message &&
   message.map((item) => ({  ...item,
     property: {
        ...item.property,
        images:
          item.property.images?.length > 0 ? [item.property.images[0]] : [],
      },
    }));
 }



 function disableScroll(open, winSize) {
  if (open && winSize) {
    document.body.classList.add("lock");
    document.addEventListener("touchmove", preventDefault, { passive: false });
  } else {
    document.body.classList.remove("lock");
    document.removeEventListener("touchmove", preventDefault);
  }
}
 function cleanUpScroll() {
  document.body.classList.remove("lock");
  document.removeEventListener("touchmove", preventDefault);
}

function preventDefault(e) {
  e.preventDefault();
}


export { ratesPer, getBase64,resizeImage,getBase64Strings ,extractCloudinaryId ,singelImageFilter,disableScroll,cleanUpScroll }