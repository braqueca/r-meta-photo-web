import { AlbumDto } from "./album-dto.interface";

export interface PhotoDto {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    album: AlbumDto;
}