import {
  createDefaultSocialImageResponse,
  socialImageAlt,
  socialImageContentType,
  socialImageSize,
} from "@/lib/seo/create-social-image";

export const alt = socialImageAlt;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function TwitterImage() {
  return createDefaultSocialImageResponse();
}
