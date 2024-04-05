const EventTags = ({ tags }: { tags: Array<string> }) => {
  return (
    <ul className="mt-5 flex flex-wrap gap-4">
      {tags?.map((tag) => (
        <li className="rounded-lg bg-cyan-900 text-white p-2 w-fit font-semibold">
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default EventTags;
