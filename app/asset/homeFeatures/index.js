import bath from "@/public/svg-bathrooms-ruls.svg"
import sleeps from "@/public/svg-sleeps.svg"
import beds from "@/public/svg-bedrooms.svg"
export default {
    "Bedrooms":    <img src={beds.src} className="w-[18px]"/>,
  "Bathrooms":<img className="w-[18px]" src={bath.src}/>,
"m²":<svg 
xmlns="http://www.w3.org/2000/svg" 
width="18" 
height="18" 
viewBox="0 0 50 50" 
aria-hidden="true" 
role="img" 
className="icon-house fxsh0 w16 h16 f-gray-extra-dark"
>
<path 
  fillRule="evenodd" 
  clipRule="evenodd" 
  d="M27.485 1.018a4.647 4.647 0 0 0-5.806 0L1.744 16.966A4.647 4.647 0 0 0 0 20.595v24.647a4.647 4.647 0 0 0 4.647 4.647h39.87a4.647 4.647 0 0 0 4.647-4.647V20.595a4.647 4.647 0 0 0-1.744-3.629L27.485 1.018Zm-4.057 2.187a1.847 1.847 0 0 1 2.308 0L45.67 19.153c.439.35.694.88.694 1.442v24.647c0 1.02-.827 1.847-1.847 1.847h-10.08v-14.99a4.647 4.647 0 0 0-4.648-4.647H18.283a4.647 4.647 0 0 0-4.647 4.647v14.99H4.647A1.847 1.847 0 0 1 2.8 45.242V20.595c0-.561.255-1.092.693-1.442L23.428 3.205Zm-6.992 43.884h15.2v-14.99c0-1.02-.827-1.847-1.847-1.847H18.283c-1.02 0-1.847.827-1.847 1.847v14.99Z"
/>
</svg>,
"sleeps":<img className="w-[18px]" src={sleeps.src}/> 

}