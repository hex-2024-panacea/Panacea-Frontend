// import Image from "next/image"
import { apiGetCoachCourseList } from '@/app/api/coach';

export default async function CourseMamagePage() {
  // const failedImages: string[] = [];
  const { data, meta } = await apiGetCoachCourseList();
  console.log(meta);
  // const handleImageError = (id: string) => {
  //   failedImages.push(id);
  // }

  return (
    <main>
      <div>
        <div>
          <h2 className="heading2">課程管理</h2>
          <button>新增課程</button>
        </div>
        <ul>
          {data.map(({ _id, name, description, coverImage, category, createdAt, isActive }) => (
            <li key={_id}>
              {coverImage}
              {/* { coverImage &&
                <Image
                src={failedImages.includes(_id) ? 'https://via.placeholder.com/306x400' : coverImage}
                alt={`Cover image for ${name}`}
                width={306}
                height={400}
                className="h-[400px] w-[306px] object-cover rounded-lg"
                onError={() => handleImageError(_id)}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAJzAN1wVXANwAAAABJRU5ErkJggg=="
              />
              } */}
              <h3>{name}</h3>
              <p>{description}</p>
              <p>{category}</p>
              <p>{createdAt}</p>
              <p>{isActive}</p>
            </li>
          ))}
          <li></li>
        </ul>
      </div>
    </main>
  );
}
