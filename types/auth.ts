export type Profile = {
    id: number;
    full_name: string;
    image_url: string;
    email: string;
    first_name: string;
    last_name: string;
};

export type AuthenticationResponse = {
    access_token: string;
    refresh_token: string;
    access_token_expired: number;
};
