import { BaseItemKind, ItemSortBy, SortOrder } from "@jellyfin/sdk/lib/generated-client/models";
import { jellyfinApi } from "./api";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api"
import { getArtistsApi } from "@jellyfin/sdk/lib/utils/api/artists-api"
import { getUserLibraryApi } from '@jellyfin/sdk/lib/utils/api/user-library-api'

export function getSongs(offset, size) {
    return getItemsApi(jellyfinApi).getItems({
        sortBy: ItemSortBy.Artist,
        sortOrder: SortOrder.Ascending,
        includeItemTypes: [BaseItemKind.Audio],
        recursive: true,
        startIndex: offset,
        limit: size
    }).then((val) => val.data)
}

export function getSongInfo(id) {
    return getItemsApi(jellyfinApi).getItems({
        ids: [id]
    }).then((val) => val.data.Items[0])
}

export function getArtists(offset, size) {
    return getArtistsApi(jellyfinApi).getArtists({
        sortBy: ItemSortBy.Name,
        sortOrder: SortOrder.Ascending,
        recursive: true,
        startIndex: offset,
        limit: size
    }).then((val) => val.data)
}

export function getArtistInfo(id) {
    return getUserLibraryApi(jellyfinApi).getItem({
        itemId: id,
    }).then((val) => val.data)
}

export function getArtistAlbums(id) {
    return getItemsApi(jellyfinApi).getItems({
        sortBy: ItemSortBy.Name,
        sortOrder: SortOrder.Ascending,
        includeItemTypes: [BaseItemKind.MusicAlbum],
        recursive: true,
        artistIds: [id],
    }).then((val) => val.data.Items)
}

export function getArtistSongs(id) {
    return getItemsApi(jellyfinApi).getItems({
        sortBy: ItemSortBy.Album,
        sortOrder: SortOrder.Ascending,
        includeItemTypes: [BaseItemKind.Audio],
        recursive: true,
        artistIds: [id],
    }).then((val) => val.data.Items)
}

export function getAlbums(offset, size) {
    return getItemsApi(jellyfinApi).getItems({
        sortBy: ItemSortBy.Artist,
        sortOrder: SortOrder.Ascending,
        includeItemTypes: [BaseItemKind.MusicAlbum],
        recursive: true,
        startIndex: offset,
        limit: size
    }).then((val) => val.data)
}

export function getAlbumInfo(id) {
    return getUserLibraryApi(jellyfinApi).getItem({
        itemId: id,
    }).then((val) => val.data)
}

export function getAlbumSongs(id) {
    return getItemsApi(jellyfinApi).getItems({
        sortBy: ItemSortBy.Artist,
        sortOrder: SortOrder.Ascending,
        includeItemTypes: [BaseItemKind.Audio],
        recursive: true,
        albumIds: [id],
    }).then((val) => val.data.Items)
}