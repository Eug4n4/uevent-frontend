import { formEndpointQueryString } from "@/utils/query";
import { api } from "../api";
import type {
  CommentAttributes,
  CommentCreateAttributes,
  CommentDto,
  CommentQueryParams,
  CommentRelationships,
  CommentUpdateAttributes,
} from "./types/comment.types";
import type {
  CommentResource,
  ProfileResource,
  RequestPayload,
  ResponseArrayPayload,
  ResponsePayload,
} from "./types/types";
import type { ProfileAttributes } from "../types/profile.types";

export type CommentListResponse = {
  data: CommentDto[];
  links: ResponseArrayPayload<CommentAttributes, CommentRelationships>["links"];
};

const toProfile = (resource?: ProfileResource | null) => {
  if (!resource) {
    return null;
  }
  return { id: resource.id, ...(resource.attributes as ProfileAttributes) };
};

export class CommentService {
  static endpoint = "comments";

  static async list(eventId: string, query?: CommentQueryParams): Promise<CommentListResponse> {
    const response = await api.get<ResponseArrayPayload<CommentAttributes, CommentRelationships>>(
      formEndpointQueryString(`${CommentService.endpoint}/${eventId}`, query),
    );
    return CommentService.mapToDto(response.data);
  }

  static async create(eventId: string, attributes: CommentCreateAttributes) {
    const payload: RequestPayload<CommentCreateAttributes> = {
      data: {
        type: "comment",
        attributes,
      },
    };

    const response = await api.post<ResponsePayload<CommentAttributes, CommentRelationships>>(
      `${CommentService.endpoint}/${eventId}`,
      payload,
    );

    return response.data;
  }

  static async update(commentId: string, attributes: CommentUpdateAttributes) {
    const payload: RequestPayload<CommentUpdateAttributes> = {
      data: {
        type: "comment",
        attributes,
      },
    };

    const response = await api.patch<ResponsePayload<CommentAttributes, CommentRelationships>>(
      `${CommentService.endpoint}/${commentId}`,
      payload,
    );

    return response.data;
  }

  static async remove(commentId: string) {
    return api.delete(`${CommentService.endpoint}/${commentId}`);
  }

  private static mapToDto(response: ResponseArrayPayload<CommentAttributes, CommentRelationships>): CommentListResponse {
    const profileMap = new Map<string, ProfileResource>();
    const commentMap = new Map<string, CommentResource>();

    response.data.forEach((resource) => {
      commentMap.set(resource.id, resource as CommentResource);
    });

    response.included?.forEach((resource) => {
      if (!resource) {
        return;
      }

      if (resource.type === "profile") {
        profileMap.set(resource.id, resource as ProfileResource);
      }

      if (resource.type === "comment") {
        commentMap.set(resource.id, resource as CommentResource);
      }
    });

    const buildTree = (resource: CommentResource): CommentDto => {
      const children =
        resource.relationships?.children?.data
          ?.map((child) => {
            const childResource = commentMap.get(child.id);
            return childResource ? buildTree(childResource) : null;
          })
          .filter(Boolean) ?? [];

      const profileId = resource.relationships?.profile.data.id;
      const profile = profileId ? toProfile(profileMap.get(profileId) ?? null) : null;

      return {
        id: resource.id,
        ...resource.attributes,
        profile,
        children: children as CommentDto[],
      };
    };

    return {
      data: response.data.map((resource) => buildTree(resource as CommentResource)),
      links: response.links,
    };
  }
}
