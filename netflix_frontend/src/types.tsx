export interface Movie {
    id: number;
    title: string;
    thumbnail: string;
    video_url: string;
    description: string | null;
    rating: number
    year: number
    genre: string;
    created_at: string;
    updated_at: string;
}