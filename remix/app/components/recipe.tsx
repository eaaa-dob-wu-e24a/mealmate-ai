import { Link } from "react-router";

export default function Recipe({
  id,
  image,
  title,
  categories,
}: {
  id: string;
  image: string;
  title: string;
  categories: string[];
}) {
  return (
    <Link
      to={`/recipe/${id}`}
      className="rounded-lg w-full overflow-hidden shadow-md relative h-32 flex flex-col-reverse justify-between"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 className="font-semibold text-sm pl-2 text-white mb-2">{title}</h3>
      <div className="flex gap-2 justify-end pr-2 pt-2 flex-wrap">
        {categories.slice(0, 2).map((category, idx) => (
          <span
            key={idx}
            className="text-xs bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap"
          >
            {category}
          </span>
        ))}
      </div>
    </Link>
  );
}
