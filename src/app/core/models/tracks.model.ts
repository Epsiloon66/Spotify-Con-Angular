import { ArtistModel } from "./artists.model";

export interface TrackModel {
    name:string;
    album:string;
    cover:string;
    artist?:ArtistModel;
    url:string;
    _id:string | number;
}