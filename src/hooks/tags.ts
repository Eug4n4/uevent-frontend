import { TagService } from "@/lib/services/TagService";
import type { TagDto } from "@/lib/services/types/tag.types";
import { useEffect, useState } from "react";

const useTags = () => {
  const [tags, setTags] = useState<TagDto[]>([]);
  useEffect(() => {
    const getTags = async () => {
      const tags = await TagService.getAll({ "page[limit]": 99, "page[offset]": 0 });
      setTags(
        tags.data.map((tag) => {
          return {
            id: tag.id,
            ...tag.attributes,
          };
        }),
      );
    };
    getTags();
  }, []);
  return {
    tags,
  };
};

export default useTags;
