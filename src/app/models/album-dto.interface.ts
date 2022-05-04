import { User } from "./user.interface";

export interface AlbumDto {
    id: number;
    title: string;
    user: User;    
}