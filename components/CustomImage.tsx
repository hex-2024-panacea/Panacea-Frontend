'use client';

// import { useState } from 'react';
// import Image from 'next/image';

// const CustomImage = ({ data }) => {
//   const [failedImages, setFailedImages] = useState(new Set());

//   const handleImageError = (id) => {
//     setFailedImages(prev => new Set(prev).add(id));
//   };

//   return (
//     <ul>
//       {data.map(({ _id, name, description, coverImage, category, createdAt, isActive }) => (
//         <li key={_id}>
//           {coverImage && (
//             <Image
//               src={failedImages.has(_id) ? 'https://via.placeholder.com/306x400' : coverImage}
//               alt={`Cover image for ${name}`}
//               width={306}
//               height={400}
//               className="h-[400px] w-[306px] object-cover rounded-lg"
//               onError={() => handleImageError(_id)}
//               placeholder="blur"
//               blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAJzAN1wVXANwAAAABJRU5ErkJggg=="
//             />
//           )}
//           <h3>{name}</h3>
//           <p>{description}</p>
//           <p>{category}</p>
//           <p>{createdAt}</p>
//           <p>{isActive.toString()}</p>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default CustomImage;
