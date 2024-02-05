export type Profile = {
    id: number;
    full_name: string;
    image_url: string;
    email: string;
}

export type AuthenticationResponse = {
    access_token: string;
    refresh_token: string;
    access_token_expired: number;
}
