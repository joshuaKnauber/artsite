import db from "@/db";
import Tag from "./Tag";

export default async function TagFilter() {
  const tags = await db.query.tags.findMany({ limit: 20 });

  return (
    <div className="flex flex-row gap-2">
      {tags.map((tag) => (
        <Tag key={tag.id} name={tag.name} />
      ))}
    </div>
  );
}
