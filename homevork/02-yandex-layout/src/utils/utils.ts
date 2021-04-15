import {photo} from "../intefaces/interfaces";

export async function getPhotos(): Promise<photo[]>{

    const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=uv-Hf1ZysyUN1vnAVWnjC1jFnKeJwslviwghqNI7ySw&count=30`);
    const photos:photo[] = await response.json();

    console.log(photos)
    return photos
}